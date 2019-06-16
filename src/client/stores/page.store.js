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
        const { rootStore } = this.sessionStore;

        rootStore.setBusy(true);
        pageService.getPages(projectId)
            .then((response) => {
                runInAction(() => {
                    this.pages = response;
                });
            })
            .finally(() => {
                rootStore.setBusy(false);
            });
    }

    @action
    getPage(projectId, pageId) {
        const { rootStore } = this.sessionStore;

        rootStore.setBusy(true);
        pageService.getPage(projectId, pageId)
            .then((response) => {
                this.setSelectedPage(response);
            })
            .finally(() => {
                rootStore.setBusy(false);
            });
    }

    @action
    addPage(projectId, page) {
        const { rootStore } = this.sessionStore;

        rootStore.setBusy(true);
        pageService.addPage(projectId, page)
            .then((response) => {
                runInAction(() => {
                    this.pages.push(response);
                });
            })
            .catch(error => {
                rootStore.setInfoBarMessage(error);
                rootStore.setInfoBarOpen(true);
            })
            .finally(() => {
                rootStore.setBusy(false);
            });
    }

    @action
    deletePage(projectId, pageId) {
        const { rootStore } = this.sessionStore;

        rootStore.setBusy(true);
        pageService.deletePage(projectId, pageId)
            .then((response) => {
                runInAction(() => {
                    const index = this.pages.findIndex(p => p.id === response.id);

                    if(index >= 0) {
                        this.pages.splice(index, 1);
                    }
                });
            })
            .catch(error => {
                rootStore.setInfoBarMessage(error);
                rootStore.setInfoBarOpen(true);
            })
            .finally(() => {
                rootStore.setBusy(false);
            });
    }

    @action
    updatePage(projectId, page, silent) {
        const { rootStore, designerStore } = this.sessionStore;

        pageService.updatePage(projectId, page)
            .then(() => {
                designerStore.resetDirty();

                if (!silent) {
                    rootStore.setInfoBarMessage('Successfully saved.');
                    rootStore.setInfoBarOpen(true);
                }
            })
            .catch(error => {
                rootStore.setInfoBarMessage(error);
                rootStore.setInfoBarOpen(true);
            });
    }

    @action
    setSelectedPage(page) {
        const { designerStore } = this.sessionStore;

        this.selectedPage = page;
        designerStore.setComponentDefinition(page.definition);
        designerStore.clonePreviewDefinition();
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

    @action
    setPages(pages) {
        this.pages = pages;
    }
}
