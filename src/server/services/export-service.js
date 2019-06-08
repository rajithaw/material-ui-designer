const { createWriteStream, writeFileSync, appendFileSync, readdirSync, statSync, chmodSync } = require('fs');
const { copy, remove } = require('fs-extra');
const { join } = require('path');
const { format } = require('util');
const archiver = require('archiver');
const ObjectId = require('mongodb').ObjectID;

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
            // Generate shared component pages
            this.generateSharedComponents(this.sharedComponents, newTemplateName);
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
        const sharedComponentSet = new Set();

        try {
            project.pages.forEach(page => {
                this.getSharedComponentIds(page.definition, sharedComponentSet);
            });
    
            const sharedComponentIds = Array.from(sharedComponentSet).map(id => ObjectId(id));
            const jsonParam = {
                '_id': {$in:sharedComponentIds}
            };
            const returnFields = {
                'id': true,
                'name': true,
                'definition': true,
                'isShared': true
            };
            const pages = await projectService.getPages(jsonParam, returnFields);

            pages.forEach(p => {
                result[p.id.toString()] = p;
            });

            return result;
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
    }

    getSharedComponentIds(definition, sharedComponentSet) {
        if(definition) {
            const { children } = definition.props;

            if(definition.sharedComponentId) {
                // Add to the set of unique shared component ids
                sharedComponentSet.add(definition.sharedComponentId);
            }

            if(Array.isArray(children)) {
                children.forEach(c => {
                    this.getSharedComponentIds(c, sharedComponentSet);
                });
            }
        }
    }

    generateSharedComponents(sharedComponents, templateName) {
        const pagesDir = join(__dirname, '..', templatesPath, templateName, 'src/components/pages');

        Object.keys(sharedComponents).forEach(key => {
            const generatedPage = this.generatePage(sharedComponents[key]);

            // Copy page to the template pages folder
            this.createPageFile(generatedPage, pagesDir);
        });
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
        writeFileSync(join(pagesDir, `${page.componentName || projectService.generateComponentName(page.name)}.jsx`), page.text);
    }

    updatePageIndex(pageIndex, pagesDir) {
        const pageExports = pageIndex.map(i => {
            return `export * as ${i} from './${i}';`;
        })
        .join('\n');

        appendFileSync(join(pagesDir, 'index.js'), pageExports);
    }

    generatePage(page) {
        const className = page.componentName || projectService.generateComponentName(page.name);
        const componentSet = new Set();
        const sharedComponentSet = new Set();
        const jsxTags = this.generateTags(page.definition, componentSet, sharedComponentSet);
        const imports = this.generateImports(componentSet, sharedComponentSet);

        const pageText = format(pageTemplate, imports, className, jsxTags, className);

        return {
            name: className,
            text: pageText
        };
    }

    getComponentList(definition, componentSet) {
        if(definition) {
            const component = definition.component;
            const { children } = definition.props;

            if(definition.sharedComponentId) {
                // Do not add the components if its a shared component
                return;
            }

            // Add to the set of unique components
            componentSet.add(component);

            if(Array.isArray(children)) {
                children.forEach(c => {
                    this.getComponentList(c, componentSet);
                })
            }
        }
    }

    generateTags(definition, componentSet, sharedComponentSet) {
        let result = '<div></div>';

        if(definition) {
            const { sharedComponentId } = definition;
            let component = null;
            let properties = null;
            let children = definition.props.children;

            if(sharedComponentId) {
                const sharedComponent = this.sharedComponents[definition.sharedComponentId];

                component = sharedComponent.componentName || projectService.generateComponentName(sharedComponent.name);
                properties = '';
                children = null;

                // Add to the set of unique components
                sharedComponentSet.add(component);
            }
            else {
                const { children, ...other } = definition.props;

                component = definition.component;
                properties = this.generateProperties(other);

                // Add to the set of unique components
                componentSet.add(component);
            }
    
            result = `<${component} ${properties}>${this.generateChildTags(children, componentSet, sharedComponentSet)}</${component}>`;
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

    generateProperties(props) {
        return Object.keys(props).reduce((propsString, prop)=>{
            let propValue = props[prop];
            let generatedPropValue = '';

            if (propValue && typeof(propValue) === 'string' && propValue.startsWith('@@')) {
                propValue = this.getDynamicPropertyValue(propValue);
            }

            if(prop === 'style') {
                generatedPropValue = this.generateStyles(propValue);
            }
            else if (prop.startsWith('on')) {
                generatedPropValue = this.generateFunction(propValue);
            }
            else {
                generatedPropValue = this.generatePropertyValue(propValue);
            }

            return `${propsString}${prop}=${generatedPropValue} `;
        }, '');
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

    generateFunction(fnString) {
        return `{${fnString}}`;
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
