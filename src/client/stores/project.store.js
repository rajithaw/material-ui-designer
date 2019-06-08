import { observable, action, runInAction } from 'mobx';

import projectService from '../services/project-service';

export default class ProjectStore {
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
    }

    @observable projects = [];
    @observable selectedProject = {};
    @observable currentProject = {};
    @observable projectsDialogOpen = false;
    @observable addContentDialogOpen = false;
    @observable contentDialogEditMode = false;
    @observable projectContent = {};
    @observable editedProjectContent = {};

    @action
    getProjects() {
        projectService.getProjects().then(response => {
            runInAction(() => {
                this.projects = response;
            });
        });
    }

    @action
    getProject(projectId) {
        projectService.getProject(projectId).then(response => {
            this.setSelectedProject(response);
            // reset the pages
            this.sessionStore.pageStore.setSelectedPage({});
        });
    }

    @action
    createProject(project) {
        const { rootStore } = this.sessionStore;

        projectService.createProject(project)
            .then(response => {
                runInAction(() => {
                    this.projects.push(response);
                });
            })
            .catch(error => {
                rootStore.setInfoBarMessage(error);
                rootStore.setInfoBarOpen(true);
            });
    }

    @action
    deleteProject(projectId) {
        projectService.deleteProject(projectId).then(response => {
            runInAction(() => {
                const index = this.projects.findIndex(
                    p => p.id === response.id
                );

                if (index >= 0) {
                    this.projects.splice(index, 1);
                }
            });
        });
    }

    @action
    setSelectedProject(project) {
        this.selectedProject = project;
        this.setProjectContent(project.contents);
    }

    @action
    setCurrentProject(project) {
        this.currentProject = project;
    }

    @action
    setProjectsDialogOpen(open) {
        this.projectsDialogOpen = open;
    }

    @action
    setAddContentDialogOpen(open, isEdit) {
        this.addContentDialogOpen = open;
        this.contentDialogEditMode = !!isEdit;
    }

    @action
    setEditedProjectContent(content) {
        this.editedProjectContent.name = content.name;
        this.editedProjectContent.type = content.type;
        this.editedProjectContent.content = content.content;
    }

    @action
    setProjectContent(content) {
        this.projectContent = {};

        if (content) {
            content.forEach(c => {
                this.projectContent[c.name] = c;
            });
        }
    }

    @action
    addProjectContent(projectId, content) {
        projectService.addContent(projectId, content).then(response => {
            runInAction(() => {
                this.projectContent[response.name] = response;
            });
        });
    }

    @action
    updateProjectContent(projectId, content) {
        projectService.updateContent(projectId, content).then(response => {
            this.projectContent[response.name] = response;
        });
    }

    @action
    deleteProjectContent(projectId, contentId) {
        projectService.deleteContent(projectId, contentId).then(response => {
            runInAction(() => {
                delete this.projectContent[response.name];
            });
        });
    }
}
