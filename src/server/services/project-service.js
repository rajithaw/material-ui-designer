const MongoClient = require('mongodb').MongoClient;
const logger = require('./log-service')('services:project-service');

class ProjectService {
    constructor() {
        this.projects = [];
        this.ObjectId = require('mongodb').ObjectID;
        this.muiDesignerMongoUrl = process.env.MONGO_DB_URL || 'mongodb://username:password@ds135207.mlab.com:35207/mui-designer';
    }

    // Connect to DB
    connectToDb(callBack) {
        MongoClient.connect(
            this.muiDesignerMongoUrl,
            { useNewUrlParser: true },
            function(err, client) {
                const db = client.db('mui-designer');
                callBack(db);
                client.close();
            }
        );
    }

    // Get database client
    async getDbClient() {
        const client = new MongoClient(this.muiDesignerMongoUrl, { useNewUrlParser: true });

        try {
            await client.connect();
            return client;
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
    }

    // CREATE Project
    async createProject(jsonData) {
        const client = await this.getDbClient();

        try {
            const db = client.db('mui-designer');

            // Validate project name
            const count = await db
                .collection('Projects')
                .find({name: jsonData.name})
                .limit(1)
                .count(true);

            if(count === 0) {
                const result = await db.collection('Projects').insertOne(jsonData);
                return this.replace_Id(result.ops[0]);
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

    // DELETE Project
    deleteProject(jsonParam, callback) {
        // Delete pages
        this.deletePages({ projectId: jsonParam._id.toString() }, () => {});

        this.connectToDb(db => {
            // Query first to get the name
            const cursor = db
                .collection('Projects')
                .find(jsonParam)
                .project({ name: true });

            cursor.toArray((err, project) => {
                if (project.length > 0) {
                    jsonParam.name = project[0].name;
                } else {
                    jsonParam.name = project.name;
                }

                this.connectToDb(db => {
                    db.collection('Projects').deleteOne(jsonParam, err => {
                        callback(err, { id: jsonParam._id });
                    });
                });
            });
        });
    }

    // GET Projects
    getProjects(callback) {
        this.connectToDb(db => {
            const cursor = db
                .collection('Projects')
                .find()
                .sort({ name: 1 })
                .project({ name: true });

            cursor.toArray((err, docs) => {
                callback(null, this.replace_Id(docs));
            });
        });
    }

    // GET a Project
    async getProject(jsonParam, pageFields) {
        const client = await this.getDbClient();

        try {
            const db = client.db('mui-designer');

            const cursor = db
                .collection('Projects')
                .find(jsonParam)
                .project({ _id: true, name: true });

            const project = await cursor.toArray();

            if(project.length === 0) {
                throw { message: 'Project not found'};
            }
            else {
                if (project.length > 0) {
                    const param = {
                        projectId: project[0]._id.toString()
                    };

                    project[0].pages = await this.getPages(param, pageFields);
                    project[0].contents = await this.getContents(param, {});
                }

                return this.replace_Id(project[0]);
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

    // GET Pages
    async getPages(jsonParam, returnFields) {
        const client = await this.getDbClient();

        try {
            const db = client.db('mui-designer');

            const cursor = db
                .collection('Pages')
                .find(jsonParam)
                .sort({ name: 1 })
                .project(returnFields);

            const pages = await cursor.toArray();
            return this.replace_Id(pages);
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
    async addPage(jsonData) {
        const client = await this.getDbClient();
        
        // Set the component name to be used. Has to be unique globally for shared pages.
        //Has to be unique within project for regular pages.
        jsonData.componentName = this.generateComponentName(jsonData.name);

        try {
            const db = client.db('mui-designer');

            if(jsonData.isShared) {
                const cursor = await db
                        .collection('Pages')
                        .find({componentName: jsonData.componentName})
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
                        .find({projectId: jsonData.projectId, componentName: jsonData.componentName})
                        .limit(1)
                        .count(true);

                if(count !== 0) {
                    throw { message: "Page already exists"};
                }
            }

            const result = await db.collection('Pages').insertOne(jsonData);
            return this.replace_Id(result.ops[0]);
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
    deletePage(jsonParam, callback) {
        this.connectToDb(db => {
            db.collection('Pages').deleteOne(jsonParam, err => {
                callback(err, { id: jsonParam._id.toString() });
            });
        });
    }

    // DELETE Delete Pages
    deletePages(jsonParam, callback) {
        this.connectToDb(db => {
            db.collection('Pages').deleteMany(jsonParam, (err, result) => {
                callback(err, result);
            });
        });
    }

    // UPDATE update a page
    updatePage(jsonData, callback) {
        this.connectToDb(db => {
            db.collection('Pages').updateOne(
                jsonData.filter,
                { $set: jsonData.data },
                (err, result) => {
                    callback(err, result);
                }
            );
        });
    }

    // GET Contents
    async getContents(jsonParam, returnFields) {
        const client = await this.getDbClient();

        try {
            const db = client.db('mui-designer');

            const cursor = db
                .collection('Contents')
                .find(jsonParam)
                .project(returnFields);

            const contents = await cursor.toArray();
            const result = this.replace_Id(contents).map(c => {
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
        this.connectToDb(db => {
            const cursor = db
                .collection('Contents')
                .find(jsonParam)
                .project(returnFields);
            cursor.toArray((err, contents) => {
                const result = this.replace_Id(contents);
                callback(err, result[0]);
                return result;
            });
        });
    }

    // ADD a Content
    addContent(jsonData, callback) {
        // Check first if the project exists
        this.connectToDb(db => {
            const cursor = db
                .collection('Projects')
                .find({ _id: this.ObjectId(jsonData.projectId) })
                .project({ name: true });

            cursor.toArray((err, project) => {
                if (project.length > 0) {
                    // Insert the content
                    this.connectToDb(db => {
                        db.collection('Contents').insertOne(
                            jsonData,
                            (err, result) => {
                                callback(err, this.replace_Id(result.ops[0]));
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
        this.connectToDb(db => {
            const cursor = db
                .collection('Projects')
                .find({ _id: this.ObjectId(jsonData.filter.projectId) })
                .project({ name: true });

            cursor.toArray((err, project) => {
                if (project.length > 0) {
                    // Insert the content
                    this.connectToDb(db => {
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
        this.connectToDb(db => {
            db.collection('Contents').deleteOne(jsonParam, err => {
                callback(err, { name: jsonParam.name });
            });
        });
    }

    // DELETE Delete Contents
    deleteContents(jsonParam, callback) {
        this.connectToDb(db => {
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

    replace_Id(object) {
        if (object.constructor === Array) {
            object.forEach(element => {
                if (element._id) {
                    element.id = element._id;
                    delete element['_id'];
                }
            });
        } else {
            if (object._id) {
                object.id = object._id;
                delete object['_id'];
            }
        }
        return object;
    }

    generateComponentName(pageName) {
        // eslint-disable-next-line
        return pageName.replace(/[\s&\/\\#,+\-()$~%.'"`:*?<>{}]/g,'_');
    }
}

module.exports = new ProjectService();
