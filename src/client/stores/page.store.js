import { observable, action, runInAction } from 'mobx';

import pageService  from '../services/page-service';

export default class PageStore {
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
    }
    
    @observable pages = [];
    @observable selectedPage = {};
    @observable currentPage = {};
    @observable pagesDialogOpen = false;

    @action
    getPages(projectId) {
        pageService.getPages(projectId).then((response) => {
            runInAction(() => {
                this.pages = response;
            });
        });
    }

    @action
    getPage(projectId, pageId) {
        pageService.getPage(projectId, pageId).then((response) => {
            this.setSelectedPage(response);
        });
    }

    @action
    addPage(projectId, page) {
        const { rootStore } = this.sessionStore;

        pageService.addPage(projectId, page)
            .then((response) => {
                runInAction(() => {
                    this.pages.push(response);
                });
            })
            .catch(error => {
                rootStore.setInfoBarMessage(error);
                rootStore.setInfoBarOpen(true);
            });
    }

    @action
    deletePage(projectId, pageId) {
        pageService.deletePage(projectId, pageId).then((response) => {
            runInAction(() => {
                const index = this.pages.findIndex(p => p.id === response.id);

                if(index >= 0) {
                    this.pages.splice(index, 1);
                }
            });
        });
    }

    @action
    updatePage(projectId, page) {
        pageService.updatePage(projectId, page).then(() => {
            const { rootStore, designerStore } = this.sessionStore;

            designerStore.resetDirty();
            rootStore.setInfoBarMessage('Successfully saved.');
            rootStore.setInfoBarOpen(true);
        });
    }

    @action
    setSelectedPage(page) {
        const { designerStore } = this.sessionStore;

        this.selectedPage = page;
        designerStore.setComponentDefinition(page.definition);
        designerStore.resetDirty();
        designerStore.resetUndoStack();
        designerStore.setSelectedComponentId('');
    }

    @action
    setCurrentPage(page) {
        this.currentPage = page;
    }

    @action
    setPagesDialogOpen(open) {
        this.pagesDialogOpen = open;
    }
}
