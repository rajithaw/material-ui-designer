import 'whatwg-fetch';
import { getResponseJson } from '../tools';

class ProjectService {
    getProjects() {
        const url = '/api/projects';
        return fetch(url).then(getResponseJson);
    }

    getProject(projectId) {
        const url = `/api/projects/${projectId}`;
        return fetch(url).then(getResponseJson);
    }

    createProject(project) {
        const url = '/api/projects';
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(getResponseJson);
    }

    deleteProject(projectId) {
        const url = `/api/projects/${projectId}`;
        return fetch(url, {
            method: 'delete'
        }).then(getResponseJson);
    }

    addContent(projectId, content) {
        const url = `/api/projects/${projectId}/contents`;
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(content),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(getResponseJson);
    }

    deleteContent(projectId, contentId) {
        const url = `/api/projects/${projectId}/contents/${contentId}`;
        return fetch(url, {
            method: 'delete'
        }).then(getResponseJson);
    }

    updateContent(projectId, content) {
        const url = `/api/projects/${projectId}/contents/${content.name}`;
        return fetch(url, {
            method: 'put',
            body: JSON.stringify(content),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(getResponseJson);
    }

    getProjectAndPage(projectName, pageName) {
        const url = `/api/projects/${projectName}/${pageName}`;
        return fetch(url).then(getResponseJson);
    }
}

const projectService = new ProjectService();

export default projectService;
