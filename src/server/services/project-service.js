const logger = require('./log-service')('services:project-service');
const dataService = require('./data-service');
const ObjectId = require('mongodb').ObjectID;

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
            const pagesFilter = { 
                projectId: filter._id.toString() 
            };
            // Delete pages
            await this.deletePages(pagesFilter);

            const db = client.db('mui-designer');

            // Query first to get the name
            const project = await db.collection('Projects')
                .findOne(filter, { name: true });

            if(project) {
                filter.name = project.name;
                await db.collection('Projects').deleteOne(filter);
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

            const cursor = db
                .collection('Pages')
                .find(filter)
                .sort({ name: 1 })
                .project(fields);

            const pages = await cursor.toArray();
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
        
        // Set the component name to be used. Has to be unique globally for shared pages.
        //Has to be unique within project for regular pages.
        pageData.componentName = generateComponentName(pageData.name);

        try {
            const db = client.db('mui-designer');

            if(pageData.isShared) {
                const cursor = await db
                        .collection('Pages')
                        .find({componentName: pageData.componentName})
                        .limit(1)
                        .toArray();
                const count = cursor.length;    // Workaround for cosmos db not supporting count query on non shard key

                if(count !== 0) {
                    throw { message: "Page already exists"};
                }
            }
            else {
                const count = await db
                        .collection('Pages')
                        .find({projectId: pageData.projectId, componentName: pageData.componentName})
                        .limit(1)
                        .count(true);

                if(count !== 0) {
                    throw { message: "Page already exists"};
                }
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

            const result = db.collection('Pages').deleteMany(filter);
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
    async getContents(filter, fields) {
        const client = await dataService.getDbClient();

        try {
            const db = client.db('mui-designer');

            const cursor = db
                .collection('Contents')
                .find(filter)
                .project(fields);

            const contents = await cursor.toArray();
            const result = replaceId(contents).map(c => {
                if (c.type === 1) {
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

    getContent(jsonParam, returnFields, callback) {
        dataService.connectToDb(db => {
            const cursor = db
                .collection('Contents')
                .find(jsonParam)
                .project(returnFields);
            cursor.toArray((err, contents) => {
                const result = replaceId(contents);
                callback(err, result[0]);
                return result;
            });
        });
    }

    // ADD a Content
    addContent(jsonData, callback) {
        // Check first if the project exists
        dataService.connectToDb(db => {
            const cursor = db
                .collection('Projects')
                .find({ _id: ObjectId(jsonData.projectId) })
                .project({ name: true });

            cursor.toArray((err, project) => {
                if (project.length > 0) {
                    // Insert the content
                    dataService.connectToDb(db => {
                        db.collection('Contents').insertOne(
                            jsonData,
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
    deleteContent(jsonParam, callback) {
        dataService.connectToDb(db => {
            db.collection('Contents').deleteOne(jsonParam, err => {
                callback(err, { name: jsonParam.name });
            });
        });
    }

    // DELETE Delete Contents
    deleteContents(jsonParam, callback) {
        dataService.connectToDb(db => {
            db.collection('Contents').deleteMany(jsonParam, (err, result) => {
                callback(err, result);
            });
        });
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
}

module.exports = new ProjectService();
