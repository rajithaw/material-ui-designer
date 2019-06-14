import { observable, action, set, has } from 'mobx';

export default class RootStore {
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
    }
    
    @observable isBusy = false;
    @observable show = {};
    @observable transitions = {};

    @action
    setBusy(busy) {
        this.isBusy = busy;
    }

    @action
    gotoPage(event, id, history) {
        history.push('/' + this.generateComponentName(id));
    }

    @action
    showComponent(event, id, show) {
        set(this.show, 'show_' + id, show);
    }

    @action
    triggerTransition(event, id, trigger) {
        set(this.transitions, 'transition_' + id, trigger);
    }

    getShowValue(id, initialValue) {
        let result = initialValue;
        const showKey = 'show_' + id;
        const showValue = this.show[showKey];
        
        if (has(this.show, showKey)) {
            result = showValue;
        }

        return result;
    }

    getTransitionValue(id, initialValue) {
        let result = initialValue;
        const transitionKey = 'transition_' + id;
        const transitionValue = this.transitions[transitionKey];
        
        if (has(this.transitions, transitionKey)) {
            result = transitionValue;
        }

        return result;
    }

    generateComponentName(pageName) {
        //eslint-disable-next-line
        return pageName.replace(/[\s&\/\\#,+\-()$~%.'"`:*?<>{}]/g,'_');
    }
}