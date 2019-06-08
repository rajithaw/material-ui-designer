import 'whatwg-fetch'
import { getResponseJson } from '../tools';

class PageService {
    getPages(projectId) {
        const url = `/api/projects/${projectId}/pages`;
        return fetch(url).then(getResponseJson);
    }

    getPage(projectId, pageId) {
        const url = `/api/projects/${projectId}/pages/${pageId}`;
        return fetch(url).then(getResponseJson);
    }

    addPage(projectId, page) {
        const url = `/api/projects/${projectId}/pages`;
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(page),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(getResponseJson);
    }

    deletePage(projectId, pageId) {
        const url = `/api/projects/${projectId}/pages/${pageId}`;
        return fetch(url, {
            method: 'delete'
        }).then(getResponseJson);
    }

    updatePage(projectId, page) {
        const url = `/api/projects/${projectId}/pages/${page.id}`;
        return fetch(url, {
            method: 'put',
            body: JSON.stringify(page),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(getResponseJson);
    }
}

const pageService = new PageService();

export default pageService;
