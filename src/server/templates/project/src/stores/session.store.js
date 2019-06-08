import RootStore from './root.store';

export default class SessionStore {
    constructor() {
        this.rootStore = new RootStore(this);
    }
}
