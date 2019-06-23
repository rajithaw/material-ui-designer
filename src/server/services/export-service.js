const { createWriteStream, writeFileSync, appendFileSync, readdirSync, statSync, chmodSync } = require('fs');
const { copy, remove } = require('fs-extra');
const { join } = require('path');
const { format } = require('util');
const archiver = require('archiver');
const ObjectId = require('mongodb').ObjectID;
const { transform } = require('@babel/core');
const jsxTransform = require('babel-plugin-jsx-to-object');

const logger = require('./log-service')('services:export-service');
const projectService = require('./project-service');
const pageTemplate = require('../templates/page/page-template');
const componentMap = require('../constants/component-map');
const { ContentType } = require('../constants/enums');

const templatesPath = `./templates/`;
const projectTemplatePath = `${templatesPath}/project/`;

class ExportService {
    constructor() {
        this.projectContents = {};
        this.sharedComponents = {};
    }

    async exportProject(projectId) {

        try {
            const newTemplateName = await this.copyTemplate();
            const jsonParam = {
                '_id': ObjectId(projectId)
            };
            const project = await projectService.getProject(jsonParam, {});     // Copy successfull. Get the project details to generate the pages

            this.projectContents = this.transformContents(project.contents);
            // Get shared components
            this.sharedComponents = await this.getSharedComponents(project);
            // Generate pages
            this.generatePages(project, newTemplateName);

            // Archive generated project
            const archiveFilePath = await this.archiveProject(newTemplateName);

            try {
                // Delete temp project
                await this.deleteProject(newTemplateName);
                logger.logInfo(`copyTemplate : Delete temp project successfull`);
            }
            catch(err) {
                // Error in deleting temp files should not cause the export to fail
                logger.logError(err);
            }

            return archiveFilePath;
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
    }

    async getSharedComponents(project) {
        const result = {};

        if(project.pages) {
            project.pages.forEach(p => {
                if(p.isShared) {
                    result[p.id.toString()] = p;
                }
            });
        }
        
        return result;
    }

    generatePages(project, templateName) {
        const pagesDir = join(__dirname, '..', templatesPath, templateName, 'src/components/pages');
        const pageIndex = [];

        // Clear read-only before writing to the pages directory
        this.clearReadonly(pagesDir);

        project.pages.forEach(page => {
            const generatedPage = this.generatePage(page);
            pageIndex.push(generatedPage.name);

            // Copy page to the template pages folder
            this.createPageFile(generatedPage, pagesDir);
        });

        // Update index.js of template
        this.updatePageIndex(pageIndex, pagesDir)
    }

    createPageFile(page, pagesDir) {
        writeFileSync(join(pagesDir, `${page.name}.jsx`), page.text);
    }

    updatePageIndex(pageIndex, pagesDir) {
        const pageExports = pageIndex.map(i => {
            return `export * as ${i} from './${i}';`;
        })
        .join('\n');

        appendFileSync(join(pagesDir, 'index.js'), pageExports);
    }

    generatePage(page) {
        const className = page.componentName;
        const componentSet = new Set();
        const sharedComponentSet = new Set();
        const jsxTags = this.generateTags(page.definition, componentSet, sharedComponentSet);
        const imports = this.generateImports(componentSet, sharedComponentSet);

        const pageText = format(pageTemplate, imports, className, jsxTags, className, className);

        return {
            name: className,
            text: pageText
        };
    }

    generateTags(definition, componentSet, sharedComponentSet) {
        let result = '<div></div>';

        if(definition) {
            const { sharedComponentId } = definition;
            let component = '';
            let properties = '';
            let childTags = '';

            if(sharedComponentId) {
                // Only top level tag and import is generated for shared components. No child tags are generated.
                const sharedComponent = this.sharedComponents[sharedComponentId];

                component = sharedComponent.componentName;
                // Add to the set of unique components
                sharedComponentSet.add(component);
            }
            else {
                const { children, ...other } = definition.props;
                
                component = definition.component;
                properties = this.generateProperties(other, componentSet);
                childTags = this.generateChildTags(children, componentSet, sharedComponentSet);

                // Add to the set of unique components
                componentSet.add(component);
            }
    
            result = `<${component} ${properties}>${childTags}</${component}>`;
        }
        
        return result;
    }

    generateChildTags(children, componentSet, sharedComponentSet) {
        let result = '';

        if(children) {
            if(Array.isArray(children)) {
                result = children.map(c => this.generateTags(c, componentSet, sharedComponentSet)).join('');
            }
            else {
                if (typeof(children) === 'string') {
                    if(children.startsWith('@@')) {
                        children = this.getDynamicPropertyValue(children);
                    }
                    else {
                        children = this.escapeSingleQuotes(children);
                    }
                }

                result = `{'${children}'}`;
            }
        }

        return result;
    }

    generateProperties(props, componentSet) {
        return Object.keys(props).reduce((propsString, prop)=>{
            let propValue = props[prop];
            let generatedPropValue = '';

            if (propValue && typeof(propValue) === 'string' && propValue.startsWith('@@')) {
                propValue = this.getDynamicPropertyValue(propValue);
            }

            if(prop === 'style') {
                generatedPropValue = this.generateStyles(propValue);
            }
            else if(prop === 'open') {
                const id = props['id'];
                generatedPropValue = this.generateOpenPropertyValue(id, propValue);
            }
            else if(prop === 'in') {
                const id = props['id'];
                generatedPropValue = this.generateTransitionPropertyValue(id, propValue);
            }
            else if (prop.startsWith('on')) {
                generatedPropValue = this.generateFunction(propValue);
            }
            else if (typeof(propValue) === 'object') {
                generatedPropValue = this.generateObjectString(propValue);
            }
            else if (propValue && typeof(propValue) === 'string' && 
                (propValue.startsWith('<') || propValue.startsWith('render#'))) {
                generatedPropValue = this.generateComponentProperty(propValue, componentSet);
            }
            else {
                generatedPropValue = this.generatePropertyValue(propValue);
            }

            return `${propsString}${prop}=${generatedPropValue} `;
        }, '');
    }

    generateComponentProperty(propValue, componentSet) {
        let result = '';

        if(propValue.startsWith('<')) {
            const definition = this.convertJsxStringToComponentDefinition(propValue);
            // Add components in property values to the component set to generate imports later.
            this.addPropertyComponents(definition, componentSet);
            result = `{${propValue}}`;
        }

        if(propValue.startsWith('render#')) {
            const renderValue = propValue.split('#')[1];
            const definition = this.convertJsxStringToComponentDefinition(renderValue);
            this.addPropertyComponents(definition, componentSet);

            result = `{()=>${renderValue}}`;
        }

        return result;
    }

    convertJsxStringToComponentDefinition(jsx) {
        let result = null;

        if(jsx) {
            const code = transform(jsx, { plugins: [ [jsxTransform] ] }).code;
            const jsonCode = code.substr(1, code.length - 3);
            result = JSON.parse(jsonCode);
        }

        return result;
    }

    addPropertyComponents(definition, componentSet) {
        if(definition) {
            const { children } = definition;

            // Add to the set of unique component ids
            componentSet.add(definition.type);

            if(Array.isArray(children)) {
                children.forEach(c => {
                    this.addPropertyComponents(c, componentSet);
                });
            }
        }
    }

    getDynamicPropertyValue(propValue) {
        let result = '';
        const content = this.projectContents[propValue.substring(2)];

        if (content && content.type === ContentType.Image) {
            // For image types construct the url to get the image data from
            result = `/api/contents/${content.id}`;
        } else {
            result = (content && this.escapeSingleQuotes(content.content)) || propValue;
        }

        return result;
    }

    generatePropertyValue(value) {
        let result = `{''}`;

        if (typeof(value) === 'string') {
            const number = parseFloat(value);

            if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false' || !isNaN(number)) {
                result = `{${value}}`;
            }
            else {
                result = `{'${this.escapeSingleQuotes(value)}'}`;    // replace single quotes for just strings
            }
        }

        if (typeof(value) === 'boolean' || typeof(value) === 'number') {
            result = `{${value}}`;
        }        

        return result;
    }

    generateStyles(styles) {
        return `{${JSON.stringify(styles)}}`;
    }

    generateObjectString(obj) {
        return `{${JSON.stringify(obj)}}`;
    }

    generateFunction(fnString) {
        let result = `{${fnString}}`;

        if (fnString.indexOf('#') > 0) {
            const action = fnString.split('#');
            const name = action[0].trim().toLowerCase();
            const id = action[1].trim();

            if (name === 'show' || name === 'hide') {
                const show = name === 'show' ? 'true' : 'false';
                result = `{(event) => this.props.rootStore.showComponent(event, '${id}', ${show})}`;
            }

            if (name === 'goto') {
                result = `{(event) => this.props.rootStore.gotoPage(event, '${id}', this.props.history)}`;
            }

            if (name === 'in' || name === 'out') {
                const trigger = name === 'in' ? 'true' : 'false';
                result = `{(event) => this.props.rootStore.triggerTransition(event, '${id}', ${trigger})}`;
            }
        }

        return result;
    }

    generateOpenPropertyValue(componentId, propValue) {
        return `{this.props.rootStore.getShowValue('${componentId}', ${propValue})}`;
    }

    generateTransitionPropertyValue(componentId, propValue) {
        return `{this.props.rootStore.getTransitionValue('${componentId}', ${propValue})}`;
    }

    generateImports(componentSet, sharedComponentSet) {
        const componentImports = Array.from(componentSet).map(c => {
            const comp = componentMap[c];
            return comp ? comp.import : '';
        });

        // All components are created in the same pages folder. Therefore import from the current folder.
        const sharedComponentImports = Array.from(sharedComponentSet).map(c => {
            return `import ${c} from './${c}';`;
        });

        return componentImports.concat(sharedComponentImports).join('\n');
    }

    transformContents(contents) {
        const result = {};

        if (contents) {
            contents.forEach(c => {
                result[c.name] = c;
            });
        }

        return result;
    }

    async copyTemplate() {
        const destProjName = this.generateUniqueId('project');
        const sourceDir = join(__dirname, '..', projectTemplatePath);
        const destDir = join(__dirname, '..', templatesPath, destProjName);

        logger.logDebug(`copyTemplate : Copying template from ${sourceDir} to ${destDir}`);

        try {
            await copy(sourceDir, destDir);

            logger.logDebug(`copyTemplate : Copying template completed`);
            return destProjName;
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
    }

    async archiveProject(projectName) {
        return new Promise((resolve, reject) => {
            const exportFile = join(__dirname, '..', templatesPath, `${projectName}.zip`);
            const projectDir = join(__dirname, '..', templatesPath, projectName);

            // create a file to stream archive data to.
            const output = createWriteStream(exportFile);
            const archive = archiver('zip');

            output.on('close', () => {
                logger.logInfo(archive.pointer() + ' total bytes');
                logger.logInfo('archiver has been finalized and the output file descriptor has closed.');
                resolve(exportFile);
            });
            
            archive.on('error', err => {
                reject(err);
            });
            
            archive.pipe(output);

            // Archive everything in the project directory except node modules
            archive.glob('**', {
                cwd: projectDir,
                dot: true,
                ignore: ['node_modules/**']
            });

            archive.finalize();
        });
    }

    async deleteProject(projectName) {
        const projectDir = join(__dirname, '..', templatesPath, projectName);

        await this.deleteFileOrDirectory(projectDir);
    }

    async deleteFileOrDirectory(path) {
        try {
            await remove(path);
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
    }

    clearReadonly(dir) {
        const files = readdirSync(dir);
        const fileList = files.filter(file => !this.isDirectory(join(dir, file)));

        fileList.forEach(file => {
            const filePath = join(dir, file);
            chmodSync(filePath, '777');
        });
    }

    isDirectory(path) {
        const stats = statSync(path);
        return stats.isDirectory();
    }

    generateUniqueId(prefix) {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
    }

    escapeSingleQuotes(str) {
        return str && str.replace(/[']/g,"\\'");
    }
}

module.exports = new ExportService();
