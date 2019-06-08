import RootStore from './root.store';
import ProjectStore from './project.store';
import DesignerStore from './designer.store';
import PageStore from './page.store';
import ComponentStore from './component.store';

export default class SessionStore {
    constructor() {
        this.rootStore = new RootStore(this);
        this.projectStore = new ProjectStore(this);
        this.designerStore = new DesignerStore(this);
        this.pageStore = new PageStore(this);
        this.componentStore = new ComponentStore(this);
    }
}
