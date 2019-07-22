import { observable, action, computed, runInAction } from 'mobx';

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

    @computed get userProjects() {
        const { authStore } = this.sessionStore;
        let result = [];

        if (authStore.isAuthenticated) {
            result = this.projects.filter(p => p.createdByUser === authStore.user.sub);
        }

        return result;
    }

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
                    const deletedProjectId = response.id;
                    const index = this.projects.findIndex(p => p.id === deletedProjectId);

                    if (index >= 0) {
                        this.projects.splice(index, 1);
                    }

                    if(this.selectedProject.id === deletedProjectId) {
                        this.setSelectedProject({});
                    }
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
    setSelectedProject(project) {
        const { pageStore, componentStore } = this.sessionStore;

        this.selectedProject = project;
        this.setProjectContent(project.contents);

        // reset the pages
        pageStore.setSelectedPage({});
        // Once the project is selected set the shared components
        componentStore.setSharedComponents(project.pages);
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
        const { rootStore } = this.sessionStore;

        rootStore.setBusy(true);
        projectService.addContent(projectId, content)
            .then(response => {
                runInAction(() => {
                    this.projectContent[response.name] = response;
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
    updateProjectContent(projectId, content) {
        const { rootStore } = this.sessionStore;

        rootStore.setBusy(true);
        projectService.updateContent(projectId, content)
            .then(response => {
                this.projectContent[response.name] = response;
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
    deleteProjectContent(projectId, contentId) {
        const { rootStore } = this.sessionStore;

        rootStore.setBusy(true);
        projectService.deleteContent(projectId, contentId)
            .then(response => {
                runInAction(() => {
                    delete this.projectContent[response.name];
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

    @action
    copyProject(projectId, targetName) {
        const { rootStore } = this.sessionStore;

        if(projectId && targetName) {
            rootStore.setBusy(true);
            projectService.copyProject(projectId, targetName)
                .then(response => {
                    const { pageStore } = this.sessionStore;
                    const { selectedPage } = pageStore;
                    const { pages } = response;

                    runInAction(() => {
                        // Set the current project, pages and content to the copied project, pages and content
                        this.selectedProject = response;
                        this.setProjectContent(response.contents);
                        pageStore.setPages(response.pages);

                        if(pages && selectedPage.id) {
                            // If a page is selected, update the id to point to the copied page id.
                            // This way the user can save any unsaved changes after the project is copied.
                            const pageIndex = pages.findIndex(p => p.name === selectedPage.name);
                            if(pageIndex >= 0) {
                                selectedPage.id = pages[pageIndex].id;
                            }
                        }
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
    }
}
