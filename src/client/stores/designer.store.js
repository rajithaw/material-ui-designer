import { observable, action, computed } from 'mobx';
import jsonQ from 'jsonq';

import { ComponentPosition, ContentType } from '../enums';

export default class DesignerStore {
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
    }

    undoStack = [];

    @observable componentDefinition = {};
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
            result = jsonQ(this.componentDefinition)
                .find('props', function() {
                    return this.id === id;
                })
                .parent()
                .firstElm();
        }

        return result;
    }

    @action
    setComponentProperty(id, propertyName, value) {
        const components = jsonQ(this.componentDefinition);
        const properties = components.find('props', function() {
            return this.id === id;
        });
        const propertiesElm = properties.firstElm();
        const componentElm = properties.parent().firstElm();

        if (value) {
            if (propertyName === 'text') {
                if (typeof (propertiesElm.children) === 'string' || propertiesElm.children.length === 0) {
                    // Set the text value if children is a string or an empty array
                    propertiesElm.children = value;
                }
            } else {
                propertiesElm[propertyName] = this.parsePropertyValue(componentElm.component, propertyName, value);
            }
        } else {
            if (propertyName === 'text') {
                if (typeof (propertiesElm.children) === 'string') {
                    // Set empty array value if children is an empty string
                    propertiesElm.children = [];
                }
            } else {
                delete propertiesElm[propertyName];
            }
        }

        this.setComponentDefinition(components.firstElm());
    }

    getComponentProperty(componentDefinitioin, propertyName) {
        let result = '';

        if (propertyName === 'text') {
            const children = componentDefinitioin.props.children;
            result = typeof children === 'string' ? children : '';
        } else {
            result = this.stringifyPropertyValue(componentDefinitioin.props[propertyName]);
        }

        return result;
    }

    getPropertiesForPreview(properties) {
        const result = jsonQ.clone(properties);
        const { projectStore } = this.sessionStore;
        const { projectContent, selectedProject } = projectStore;

        Object.keys(result).forEach(prop => {
            const propValue = result[prop];

            if (propValue && typeof propValue === 'string' && propValue.startsWith('@@')) {

                // If the property value is dynamic, read it form the project content
                const projContent = projectContent[propValue.substring(2)];

                if (projContent && projContent.type === ContentType.Image) {
                    // For image types construct the url to get the image data from
                    result[prop] = `/api/projects/${selectedProject.id}/contents/${projContent.name}`;
                } else {
                    result[prop] = (projContent && projContent.content) || propValue;
                }
            }

            if (prop.startsWith('on')) {
                result[prop] = this.transformFunction(result[prop]);
            }
        });

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
        // Store for undo
        this.storeComponentDefinition();

        if (!parentId) {
            // If component definition is empty set as root component
            if (!this.componentDefinition.component) {
                this.setComponentDefinition(childDefinition);
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

        parentElm.props.children.push(childDefinition);

        parent.value(parentElm);
        this.setComponentDefinition(components.firstElm());
    }

    @action
    addSiblingDefinition(componentId, siblingDefinition, isBefore) {
        // Store for undo
        this.storeComponentDefinition();

        // If component definition is empty set as root component
        if (!componentId) {
            if (!this.componentDefinition.component) {
                this.setComponentDefinition(siblingDefinition);
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
            .parent()
            .parent();

        if (parent.length > 0) {
            const parentElm = parent.firstElm();

            // Find the index of the selected component within it's parent's children array
            let index = jsonQ.index(parentElm.props.children, componentElm);
            if (!isBefore) index++;
            parentElm.props.children.splice(index, 0, siblingDefinition);

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
            .parent()
            .parent();

        if (parent.length > 0) {
            const parentElm = parent.firstElm();

            // Find the index of the selected component within it's parent's children array
            let index = jsonQ.index(parentElm.props.children, componentElm);
            parentElm.props.children.splice(index, 1);

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

    parsePropertyValue(componentName, propertyName, value) {
        const { componentStore } = this.sessionStore;
        const component = componentStore.findByName(componentName);
        const propertyMetaData = component && component.propertyMetaData;

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
        if (propertyMetaData) {
            const metaData = propertyMetaData[propertyName];

            if (metaData && metaData.type === 'boolean') {
                result = value.toLowerCase() !== 'false';
            }
        }

        return result;
    }

    stringifyPropertyValue(value) {
        let result = value;

        if (typeof(value) === 'object') {
            result = JSON.stringify(value);
        }

        return result;
    }

    transformStyles(styles) {
        return JSON.parse(styles);
    }

    transformFunction(fnString) {
        return eval(fnString);
    }
}
