const logger = require('./log-service')('services:project-service');
const dataService = require('./data-service');
const ObjectId = require('mongodb').ObjectID;
const { ContentType } = require('../constants/enums');

const { replaceId, generateComponentName } = require('../helpers');

class ProjectService {

    // Create Project
    async createProject(user, projectData) {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');

            // Validate project name
            const count = await db
                .collection('Projects')
                .find({name: projectData.name})
                .limit(1)
                .count(true);

            if(count === 0) {
                const result = await db.collection('Projects').insertOne({
                    ...projectData,
                    createdByUser: user.sub,
                    createdDate: new Date()
                });
                return replaceId(result.ops[0]);
            }
            else {
                throw { message: "Project already exists"};
            }
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }

    // Delete Project
    async deleteProject(filter) {
        const client = await dataService.getDbClient();

        try {
            const childFilter = { 
                projectId: filter._id.toString() 
            };
            // Delete pages
            await this.deletePages(childFilter);
            // Delete contents
            await this.deleteContents(childFilter);

            const db = client.db('mui-designer');

            // Query first to get the name
            const project = await db.collection('Projects')
                .findOne(filter, { name: true });

            if(project) {
                const deleteFilter = {
                    ...filter,
                    name: project.name
                };
                await db.collection('Projects').deleteOne(deleteFilter);
            }

            return { 
                id: filter._id 
            };
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }

    // GET Projects
    async getProjects() {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');

            const cursor = await db
                .collection('Projects')
                .find()
                .sort({ name: 1 })
                .project();

            const projects = await cursor.toArray();
            return replaceId(projects);
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }   
    }

    // GET a Project
    async getProject(projectFilter, pageFields, contentFields) {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');

            const project = await db
                .collection('Projects')
                .findOne(projectFilter);

            if(!project) {
                throw { message: 'Project not found'};
            }

            const filter = {
                projectId: project._id.toString()
            };

            if(pageFields !== null) {
                pageFields = pageFields || {};
                project.pages = await this.getPages(filter, pageFields);
            }

            if(contentFields !== null) {
                contentFields = contentFields || {};
                project.contents = await this.getContents(filter, contentFields);
            }

            return replaceId(project);
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }

    // GET Pages
    async getPages(filter, fields) {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');

            const pages = await db
                .collection('Pages')
                .find(filter)
                .sort({ name: 1 })
                .project(fields)
                .toArray();

            return replaceId(pages);
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }

    // ADD a Page
    async addPage(pageData) {
        const client = await dataService.getDbClient();
        
        // Set the component name to be used.
        // Has to be unique within project.
        pageData.componentName = generateComponentName(pageData.name);

        try {
            const db = client.db('mui-designer');
            const pageFilter = {
                projectId: pageData.projectId,
                componentName: pageData.componentName
            };

            const count = await db
                    .collection('Pages')
                    .find(pageFilter)
                    .limit(1)
                    .count(true);

            if(count !== 0) {
                throw { message: "Page already exists"};
            }

            const result = await db.collection('Pages').insertOne(pageData);
            return replaceId(result.ops[0]);
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }

    // DELETE Delete a page
    async deletePage(filter) {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');

            await db.collection('Pages').deleteOne(filter);

            return { 
                id: filter._id.toString() 
            };
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }

    // DELETE Delete Pages
    async deletePages(filter) {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');

            const result = await db.collection('Pages').deleteMany(filter);
            return result;
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }

    // UPDATE update a page
    async updatePage(filter, pageData) {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');

            const result = await db.collection('Pages').updateOne(
                filter,
                { 
                    $set: pageData 
                });
            return result;
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }

    // GET Contents
    async getContents(filter, fields, includeImages) {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');

            const contents = await db
                .collection('Contents')
                .find(filter)
                .project(fields)
                .toArray();

            const result = replaceId(contents).map(c => {
                if (!includeImages && c.type === ContentType.Image) {
                    c.content = '';
                }

                return c;
            });

            return result;
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }

    // Get a specific content
    async getContent(filter, returnFields) {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');

            const contents = await db.collection('Contents')
                .findOne(filter, returnFields);
            
            return replaceId(contents);
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }

    // ADD a Content
    addContent(contentData, callback) {
        // Check first if the project exists
        dataService.connectToDb(db => {
            const cursor = db
                .collection('Projects')
                .find({ _id: ObjectId(contentData.projectId) })
                .project({ name: true });

            cursor.toArray((err, project) => {
                if (project.length > 0) {
                    // Insert the content
                    dataService.connectToDb(db => {
                        db.collection('Contents').insertOne(
                            contentData,
                            (err, result) => {
                                callback(err, replaceId(result.ops[0]));
                            }
                        );
                    });
                } else {
                    callback(new Error('Project not found'), null);
                }
            });
        });
    }

    // PUT Content
    updateContent(jsonData, callback) {
        // Check first if the project exists
        dataService.connectToDb(db => {
            const cursor = db
                .collection('Projects')
                .find({ _id: ObjectId(jsonData.filter.projectId) })
                .project({ name: true });

            cursor.toArray((err, project) => {
                if (project.length > 0) {
                    // Insert the content
                    dataService.connectToDb(db => {
                        db.collection('Contents').updateOne(
                            jsonData.filter,
                            {
                                $set: {
                                    content: jsonData.data.content,
                                    type: jsonData.data.type
                                }
                            },
                            (err) => {
                                callback(err, jsonData.data);
                            }
                        );
                    });
                } else {
                    callback(new Error('Project not found'), null);
                }
            });
        });
    }

    // DELETE Delete a content
    async deleteContent(filter) {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');

            await db.collection('Contents').deleteOne(filter);
            return { name: filter.name };
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }

    // DELETE Delete Contents
    async deleteContents(filter) {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');

            const result = await db.collection('Contents').deleteMany(filter);
            return result;
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }

    // GET a Project details by name
    async getProjectByName(projectName, pageName) {
        const projectFilter = {
            name: projectName
        };

        const pagesFields = {
            _id: true,
            name: true,
            isShared: true
        };

        const project = await this.getProject(projectFilter, pagesFields);

        // Populate the definition of the page with the provided name
        if(project && project.pages && pageName) {
            const page = project.pages.filter(p => p.name === pageName)[0];

            if(page) {
                const pageFilter = {
                    _id: page.id
                };
            
                const pageFields = {
                    _id: true,
                    name: true,
                    isShared: true,
                    definition: true
                };
    
                const pages = await this.getPages(pageFilter, pageFields);
                const pageDetails = pages[0];

                if(pageDetails) {
                    page.definition = pageDetails.definition;
                }
            }
        }

        return project;
    }

    // Copy Project
    async copyProject(user, projectId, targetName) {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');
            const projectFilter = {
                _id: ObjectId(projectId)
            };

            const project = await this.getProject(projectFilter, null, null);
            delete project.id;  // New id will be generated on cerate
            project.name = targetName;

            const targetProject = await this.createProject(user, project);

            const filter = {
                projectId: projectId
            };

            // Copy pages
            const pages = await this.getPages(filter, {});
            if(pages && pages.length > 0) {
                await db.collection('Pages').insertMany(pages.map(p => ({
                    name: p.name,
                    projectId: targetProject.id.toString(),
                    componentName: p.componentName,
                    isShared: p.isShared,
                    definition: p.definition
                })));
            }

            // Copy contents
            const contents = await this.getContents(filter, {}, true);
            if(contents && contents.length > 0) {
                await db.collection('Contents').insertMany(contents.map(c => ({
                    name: c.name,
                    projectId: targetProject.id.toString(),
                    type: c.type,
                    content: c.content
                })));
            }

            projectFilter._id = targetProject.id
            const pageFields = {
                _id: true,
                name: true,
                isShared: true
            };

            return await this.getProject(projectFilter, pageFields);
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
        finally {
            client.close();
        }
    }
}

module.exports = new ProjectService();
