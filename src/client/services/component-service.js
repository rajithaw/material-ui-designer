import 'whatwg-fetch'
import { getResponseJson } from '../tools';

class ComponentService {
    getSharedComponents() {
        const url = `/api/components?shared=true`;
        return fetch(url).then(getResponseJson);
    }

    getComponent(componentId) {
        const url = `/api/components/${componentId}`;
        return fetch(url).then(getResponseJson);
    }

    getSharedComponent(componentId) {
        const url = `/api/components/${componentId}`;
        return fetch(url).then(getResponseJson);
    }
}

const componentService = new ComponentService();

export default componentService;