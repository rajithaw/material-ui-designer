import { observable, action, computed, runInAction } from 'mobx';

import { materialComponents } from '../constants/material-components';
import { materialIcons } from '../constants/material-icons';
import componentService from '../services/component-service';

export default class ComponentStore {
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
        this.materialComponents = materialComponents;
        this.materialIcons = materialIcons;

        this.materialComponentList = Object.keys(materialComponents).map(key => materialComponents[key]);
        this.materialIconList = Object.keys(materialIcons).map(key => materialIcons[key]);
    }
    
    materialComponents = {};
    materialComponentList = [];
    materialIcons = {};
    materialIconList = [];
    @observable sharedComponents = [];
    @observable componentSearchQuery = '';

    @computed get filteredMaterialComponents() {
        return this.searchComponents(this.materialComponentList, this.componentSearchQuery);
    }

    @computed get filteredMaterialIcons() {
        return this.searchComponents(this.materialIconList, this.componentSearchQuery);
    }

    @computed get filteredSharedComponents() {
        return this.searchComponents(this.sharedComponents, this.componentSearchQuery);
    }

    @action
    getSharedComponents() {
        componentService.getSharedComponents().then((response) => {
            runInAction(() => {
                this.sharedComponents = response;
            });
        });
    }

    @action
    setComponentSearchQuery(query) {
        this.componentSearchQuery = query;
    }

    findByName(name) {
        let result = null;

        if(name) {
            // find in material components
            result = this.materialComponents[name];

            if(!result) {
                // find in material icons
                result = this.materialIcons[name];
            }
        }

        return result;
    }

    searchComponents(componentsList, query){
        const regex = new RegExp(`\\b${RegExp.escape(query)}`, 'gi');
        const result = componentsList.filter(c => {
            let matches = [];

            if(c.category) {
                matches = c.category.match(regex) || [];   // Use regex matches instead of test because regex.test does not return correct results    
            }

            if(c.displayName && matches.length === 0) {
                matches = c.displayName.match(regex) || [];
            }

            if(c.name && matches.length === 0) {
                matches = c.name.match(regex) || [];
            }
            
            return matches.length > 0 ? true : false;
        });

        return result;
    }

    getPropertyMetaData(componentName, propertyName) {
        const component = this.findByName(componentName);
        const propertyMetaData = component && component.propertyMetaData;
        let result = null;

        if (propertyMetaData) {
            result = propertyMetaData[propertyName];
        }

        return result;
    }
}
