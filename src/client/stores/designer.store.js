import React from 'react';
import { observable, action, computed } from 'mobx';
import jsonQ from 'jsonq';
import { transform } from '@babel/core';
import jsxTransform from 'babel-plugin-jsx-to-object';

import { ComponentPosition, ContentType } from '../enums';
import { componentMap } from '../constants/component-map';

export default class DesignerStore {
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
    }

    undoStack = [];

    @observable componentDefinition = {};
    @observable previewDefinition = {};
    @observable selectedComponentId = '';
    @observable copyComponentDetails = {
        id: '',
        isCut: false
    };
    @observable addSharedComponentCopy = true;
    @observable isDesignerDirty = false;

    @action
    setSelectedComponentId(id) {
        this.selectedComponentId = id;
    }

    @action
    setComponentDefinition(definition) {
        this.componentDefinition = definition || {};
        this.isDesignerDirty = true;
    }

    @action
    resetDirty() {
        this.isDesignerDirty = false;
    }

    resetUndoStack() {
        this.undoStack = [];
    }

    getComponentDefinition(id) {
        let result = null;

        if (id) {
            const comp = jsonQ(this.componentDefinition)
                .find('props', function () {
                    return this.id === id;
                })
                .parent();

            if (comp && comp.length > 0) {
                result = comp.firstElm();
            }
        }

        return result;
    }

    @action
    setComponentProperty(id, propertyName, value) {
        const components = jsonQ(this.componentDefinition);
        const properties = components.find('props', function() {
            return this.id === id;
        });

        this.setProperty(properties, propertyName, value);
        this.setComponentDefinition(components.firstElm());
    }

    setProperty(properties, propertyName, value) {
        const propertiesElm = properties.firstElm();
        const componentElm = properties.parent().firstElm();

        if (!this.isEmptyPropertyValue(value)) {
            if (propertyName === 'text') {
                if (typeof (componentElm.children) === 'string' || componentElm.children.length === 0) {
                    // Set the text value if children is a string or an empty array
                    componentElm.children = value;
                }
            } else {
                propertiesElm[propertyName] = this.parsePropertyValue(componentElm.component, propertyName, value);
            }
        } else {
            if (propertyName === 'text') {
                if (typeof (componentElm.children) === 'string') {
                    // Set empty array value if children is an empty string
                    componentElm.children = [];
                }
            } else {
                delete propertiesElm[propertyName];
            }
        }
    }

    getComponentProperty(componentDefinitioin, propertyName) {
        let result = '';

        if (propertyName === 'text') {
            const children = componentDefinitioin.children;
            result = typeof children === 'string' ? children : '';
        } else {
            result = this.stringifyPropertyValue(componentDefinitioin.props[propertyName]);
        }

        return result;
    }

    getPropertiesForPreview(properties) {
        const result = jsonQ.clone(properties);

        Object.keys(result).forEach(prop => {
            const propValue = result[prop];

            if (propValue && typeof propValue === 'string') {

                if (propValue.startsWith('@@')) {
                    result[prop] = this.getDynamicPropertyValue(propValue);
                }

                if (propValue.startsWith('<')) {
                    result[prop] = this.createComponentsFromJsxString(propValue);
                }

                if (propValue.startsWith('render#')) {
                    result[prop] = () => this.createComponentsFromJsxString(propValue.split('#')[1]);
                }
            }

            if (prop.startsWith('on')) {
                result[prop] = this.transformFunction(result[prop]);
            }

            if (prop === 'anchorEl' && propValue) {
                // Anchor element needs to be set to a dom reference
                result[prop] = window.document.getElementById(propValue);
            }
        });

        return result;
    }

    getDynamicPropertyValue(propValue) {
        let result = '';
        const { projectStore } = this.sessionStore;
        const { projectContent, selectedProject } = projectStore;

        // If the property value is dynamic, read it form the project content
        const content = projectContent[propValue.substring(2)];

        if (content && content.type === ContentType.Image) {
            // For image types construct the url to get the image data from
            result = `/api/projects/${selectedProject.id}/contents/${content.name}`;
        } else {
            result = (content && content.content) || propValue;
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

    createComponentsFromJsxString(jsx) {
        let result = null;

        if(jsx) {
            const definition = this.convertJsxStringToComponentDefinition(jsx);
            result = this.createComponents(definition);
        }
        
        return result;
    }

    createComponents(definition) {
        return React.createElement(
            componentMap[definition.type] || definition.type,
            definition.attributes,
            this.createChildren(definition.children)
        );
    }

    createChildren(children) {
        let result = children;

        if(Array.isArray(children)) {
            const childComponents = children.map(c => { 
                if(typeof(c) === 'string') {
                    return c;
                }
                else {
                    return this.createComponents(c); 
                }
            });
            result = childComponents.length > 1 ? childComponents : childComponents[0];
        }

        return result;
    }

    @action
    addComponentDefinition(relativeComponentId, insertedDefinition, position) {
        if (position) {
            const isBefore = position === ComponentPosition.Before;
            this.addSiblingDefinition(
                relativeComponentId,
                insertedDefinition,
                isBefore
            );
        } else {
            this.addChildDefinition(relativeComponentId, insertedDefinition);
        }
    }

    @action
    addChildDefinition(parentId, childDefinition) {
        const { rootStore } = this.sessionStore;
        // Store for undo
        this.storeComponentDefinition();

        if (!parentId) {
            // If component definition is empty set as root component
            if (!this.componentDefinition.component) {
                this.setComponentDefinition(childDefinition);
            }
            else {
                rootStore.setInfoBarMessage('Select a component first');
                rootStore.setInfoBarOpen(true);
            }

            return;
        }

        const components = jsonQ(this.componentDefinition);
        const parent = components
            .find('props', function() {
                return this.id === parentId;
            })
            .parent();
        const parentElm = parent.firstElm();

        parentElm.children.push(childDefinition);

        parent.value(parentElm);
        this.setComponentDefinition(components.firstElm());
    }

    @action
    addSiblingDefinition(componentId, siblingDefinition, isBefore) {
        const { rootStore } = this.sessionStore;
        // Store for undo
        this.storeComponentDefinition();

        // If component definition is empty set as root component
        if (!componentId) {
            if (!this.componentDefinition.component) {
                this.setComponentDefinition(siblingDefinition);
            }
            else {
                rootStore.setInfoBarMessage('Select a component first');
                rootStore.setInfoBarOpen(true);
            }

            return;
        }

        const components = jsonQ(this.componentDefinition);
        const component = components
            .find('props', function() {
                return this.id === componentId;
            })
            .parent();
        const componentElm = component.firstElm();
        const parent = component
            .parent()
            .parent();

        if (parent.length > 0) {
            const parentElm = parent.firstElm();

            // Find the index of the selected component within it's parent's children array
            let index = jsonQ.index(parentElm.children, componentElm);
            if (!isBefore) index++;
            parentElm.children.splice(index, 0, siblingDefinition);

            parent.value(parentElm);
            this.setComponentDefinition(components.firstElm());
        }
    }

    @action
    removeComponentDefinition(componentId) {
        if (!componentId && !this.componentDefinition.component) {
            return;
        }

        // Store for undo
        this.storeComponentDefinition();

        const components = jsonQ(this.componentDefinition);
        const component = components
            .find('props', function() {
                return this.id === componentId;
            })
            .parent();
        const componentElm = component.firstElm();
        const parent = component
            .parent()
            .parent();

        if (parent.length > 0) {
            const parentElm = parent.firstElm();

            // Find the index of the selected component within it's parent's children array
            let index = jsonQ.index(parentElm.children, componentElm);
            parentElm.children.splice(index, 1);

            parent.value(parentElm);
            this.setComponentDefinition(components.firstElm());
        } else {
            // Removing top most component
            this.setComponentDefinition({});
        }
    }

    @action
    pasteComponentDefinition(pasteComponentId, copyComponentDetails, position) {
        if (copyComponentDetails.id) {
            const componentDefToCopy = this.getComponentDefinition(
                copyComponentDetails.id
            );
            const componentClone = jsonQ(jsonQ.clone(componentDefToCopy));

            if (copyComponentDetails.isCut) {
                // Check whether pasting as a child of the same component
                const childExists =
                    componentClone.find('id', function() {
                        return this === pasteComponentId;
                    }).length > 0;

                if (!childExists) {
                    this.removeComponentDefinition(copyComponentDetails.id);
                    this.addComponentDefinition(
                        pasteComponentId,
                        componentClone.firstElm(),
                        position
                    );
                }
            } else {
                // Update ids
                this.resetComponentIds(componentClone);
                this.addComponentDefinition(
                    pasteComponentId,
                    componentClone.firstElm(),
                    position
                );
            }
        }
    }

    @action
    storeComponentDefinition() {
        const maxUndo = 5;

        if (this.undoStack.length === maxUndo) {
            this.undoStack.splice(0, 1);
        }

        this.undoStack.push(jsonQ.clone(this.componentDefinition));
    }

    @action
    restoreComponentDefinition() {
        if (this.undoStack.length > 0) {
            this.setComponentDefinition(this.undoStack.pop());
        }
    }

    @action
    setAddSharedComponentCopy(isCopy) {
        this.addSharedComponentCopy = isCopy;
    }

    @action
    selectComponent(componentId) {
        const definitionQuery = jsonQ(this.componentDefinition);

        const component = definitionQuery
            .find('id', function() {
                return this == componentId;
            })
            .parent()
            .parent();

        // Check whether the component is part of a shared component
        const sharedComponent = this.findSharedComponent(component);

        if (sharedComponent && sharedComponent.length > 0) {
            // If part of a shared component select the sheared component
            componentId = sharedComponent.firstElm().props.id;
        }

        this.setSelectedComponentId(componentId);
    }

    @action
    showComponent(event, id, show) {
        this.setPreviewDefinitionProperty(id, 'open', show);
    }

    @action
    triggerTransition(event, id, trigger) {
        this.setPreviewDefinitionProperty(id, 'in', trigger);
    }

    @action
    gotoPage(event, pageName) {
        const { projectStore, pageStore } = this.sessionStore;

        const projectId = projectStore.selectedProject && projectStore.selectedProject.id;
        const page = pageStore.pages.filter(p => p.name === pageName)[0];
        const pageId = page && page.id;

        pageStore.getPage(projectId, pageId);
    }

    @action
    setPreviewDefinition(definition) {
        this.previewDefinition = definition || {};
    }

    @action
    clonePreviewDefinition() {
        this.previewDefinition = jsonQ.clone(this.componentDefinition);
    }

    @action
    getPreviewDefinitionProperty(id, propertyName) {
        let result = '';
        const components = jsonQ(this.previewDefinition);
        const properties = components.find('props', function () {
            return this.id === id;
        });

        if(properties.length > 0) {
            result = properties.firstElm()[propertyName];
        }
        
        return result;
    }

    @action
    setPreviewDefinitionProperty(id, propertyName, value) {
        const components = jsonQ(this.previewDefinition);
        const properties = components.find('props', function () {
            return this.id === id;
        });

        this.setProperty(properties, propertyName, value);
        this.setPreviewDefinition(components.firstElm());
    }

    @computed
    get isSharedComponentSelected() {
        return !!this.getSharedComponentId(this.selectedComponentId);
    }

    getSharedComponentId(componentId) {
        let result = null;
        const definitionQuery = jsonQ(this.componentDefinition);

        const component = definitionQuery
            .find('id', function() {
                return this == componentId;
            })
            .parent()
            .parent();

        if (component.length > 0) {
            result = component.firstElm().sharedComponentId;
        }

        return result;
    }

    findSharedComponent(component) {
        if (component.length > 0) {
            if (component.firstElm().sharedComponentId) {
                return component;
            } else {
                return this.findSharedComponent(component.parent().parent().parent());
            }
        } else {
            return null;
        }
    }

    generateUniqueId(prefix) {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return `${prefix}_${Math.random()
            .toString(36)
            .substr(2, 9)}`;
    }

    resetComponentIds(componentQuery) {
        componentQuery.find('id').each((index, path) => {
            componentQuery.setPathValue(
                path,
                this.generateUniqueId('component_id')
            );
        }),
            componentQuery.find('key').each((index, path) => {
                componentQuery.setPathValue(
                    path,
                    this.generateUniqueId('component_key')
                );
            });
    }

    isEmptyPropertyValue(value) {
        let result = false;

        if (value === null || value === undefined || value === '') {
            result = true;
        }

        return result;
    }

    parsePropertyValue(componentName, propertyName, value) {
        const { componentStore } = this.sessionStore;

        value = value.trim();
        let result = value;

        if (value.toLowerCase() === 'true') {
            result = true;
        }

        if (value.toLowerCase() === 'false') {
            result = false;
        }

        const number = parseFloat(value);
        if (!isNaN(number)) {
            result = number;
        }

        if (value.startsWith('{') || value.startsWith('[')) {
            result = JSON.parse(value);
        }

        // Use meta data if available to parse property value more accurately
        const metaData = componentStore.getPropertyMetaData(componentName, propertyName);

        if (metaData) {
            if (metaData.type === 'boolean') {
                result = value.toLowerCase() !== 'false';
            }
        }

        return result;
    }

    stringifyPropertyValue(value) {
        let result = '';

        if (typeof (value) === 'object') {
            result = JSON.stringify(value);
        }
        else if(!this.isEmptyPropertyValue(value)){
            
            result = value.toString();
        }

        return result;
    }

    transformStyles(styles) {
        return JSON.parse(styles);
    }

    transformFunction(fnString) {
        let result = null;

        if (fnString.indexOf('#') > 0) {
            const action = fnString.split('#');
            const name = action[0].trim().toLowerCase();
            const id = action[1].trim();

            if (name === 'show' || name === 'hide') {
                const show = name === 'show' ? 'true' : 'false';
                result = (event) => this.showComponent(event, id, show);
            }

            if (name === 'toggle') {
                result = (event) => this.toggleShow(event, id);
            }

            if (name === 'goto') {
                result = (event) => this.gotoPage(event, id);
            }

            if (name === 'in' || name === 'out') {
                const trigger = name === 'in' ? 'true' : 'false';
                result = (event) => this.triggerTransition(event, id, trigger);
            }

            if (name === 'trigger') {
                result = (event) => this.toggleTransition(event, id);
            }
        }
        else {
            result = eval(fnString);
        }

        return result;
    }

    @action
    toggleShow(event, id) {
        const show = this.getPreviewDefinitionProperty(id, 'open');
        this.setPreviewDefinitionProperty(id, 'open', (!show).toString().toLowerCase());
    }

    @action
    toggleTransition(event, id) {
        const trigger = this.getPreviewDefinitionProperty(id, 'in');
        this.setPreviewDefinitionProperty(id, 'in', (!trigger).toString().toLowerCase());
        
    }
}
