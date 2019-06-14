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
        const { rootStore } = this.sessionStore;

        rootStore.setBusy(true);
        projectService.getProjects()
            .then(response => {
                runInAction(() => {
                    this.projects = response;
                });
            })
            .finally(() => {
                rootStore.setBusy(false);
            });
    }

    @action
    getProject(projectId) {
        const { rootStore } = this.sessionStore;

        rootStore.setBusy(true);
        projectService.getProject(projectId)
            .then(response => {
                this.setSelectedProject(response);
                // reset the pages
                this.sessionStore.pageStore.setSelectedPage({});
            })
            .finally(() => {
                rootStore.setBusy(false);
            });
    }

    @action
    createProject(project) {
        const { rootStore } = this.sessionStore;

        rootStore.setBusy(true);
        projectService.createProject(project)
            .then(response => {
                runInAction(() => {
                    this.projects.push(response);
                });
            })
            .catch(error => {
                rootStore.setInfoBarMessage(error);
                rootStore.setInfoBarOpen(true);
            })
            .finally(() => {
                rootStore.setBusy(false);
            });
    }

    @action
    deleteProject(projectId) {
        const { rootStore } = this.sessionStore;

        rootStore.setBusy(true);
        projectService.deleteProject(projectId)
            .then(response => {
                runInAction(() => {
                    const index = this.projects.findIndex(
                        p => p.id === response.id
                    );

                    if (index >= 0) {
                        this.projects.splice(index, 1);
                    }
                });
            })
            .finally(() => {
                rootStore.setBusy(false);
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

    @action
    loadProjectAndPage(projectName, pageName) {
        const { rootStore, pageStore } = this.sessionStore;

        if (projectName) {
            rootStore.setBusy(true);
            projectService.getProjectAndPage(projectName, pageName)
                .then(response => {
                    if (response) {
                        this.setSelectedProject(response);

                        if (response.pages) {
                            pageStore.setPages(response.pages);
                            const page = response.pages.filter(p => p.name === pageName)[0];

                            if (page) {
                                pageStore.setSelectedPage(page);
                            }
                        }
                    }
                })
                .finally(() => {
                    rootStore.setBusy(false);
                });
        }
    }
}
