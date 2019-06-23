import 'whatwg-fetch'
import { getResponseJson } from '../tools';

class ComponentService {
    getSharedComponents(projectId) {
        const url = `/api/components/shared/${projectId}`;
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