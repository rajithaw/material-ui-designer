import { observable, action, computed } from 'mobx';

export default class RootStore {
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
    }
    
    @observable busyCount = 0;
    @observable isPreviewMode = false;
    @observable isInfoBarOpen = false;
    @observable infoBarMessage = '';
    @observable leftDrawerVisible = true;
    @observable rightDrawerVisible = true;

    @computed get isBusy() {
        return this.busyCount > 0;
    }

    @action
    setBusy(busy) {
        if (busy) {
            this.busyCount++;
        }
        else if (this.busyCount > 0) {
            this.busyCount--;
        }
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

    @action
    setLeftDrawerVisible(visible) {
        this.leftDrawerVisible = visible;
    }

    @action
    setRightDrawerVisible(visible) {
        this.rightDrawerVisible = visible;
    }
}
