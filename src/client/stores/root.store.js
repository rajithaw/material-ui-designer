import { observable, action } from 'mobx';

export default class RootStore {
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
    }
    
    @observable isBusy = false;
    @observable isPreviewMode = false;
    @observable isInfoBarOpen = false;
    @observable infoBarMessage = '';

    @action
    setBusy(busy) {
        this.isBusy = busy;
    }

    @action
    togglePreviewMode() {
        this.isPreviewMode = !this.isPreviewMode;
    }

    @action
    resetPreviewMode() {
        this.isPreviewMode = false;
    }

    @action
    setInfoBarOpen(open) {
        this.isInfoBarOpen = open;
    }

    @action
    setInfoBarMessage(message) {
        this.infoBarMessage = message;
    }
}
