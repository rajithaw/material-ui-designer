const express = require('express');
const router = express.Router();
const projectService = require('../services/project-service');
const ObjectId = require('mongodb').ObjectID;

/* POST create project. */
router.post('/', async (req, res, next) => {
    const jsonData = {
        name: req.body.name
    };

    try {
        const result = await projectService.createProject(jsonData);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

/* DELETE Delete a project. */
router.delete('/:id', (req, res, next) => {
    const jsonParam = {
        _id: ObjectId(req.params.id)
    };

    projectService.deleteProject(jsonParam, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
});

/* GET Get projects list. */
router.get('/', (req, res, next) => {
    projectService.getProjects((err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
});

/* GET Get a specific project */
router.get('/:id', async (req, res, next) => {
    const jsonParam = {
        _id: ObjectId(req.params.id)
    };
    const pageFields = {
        _id: true,
        name: true,
        isShared: true
    };

    try {
        const result = await projectService.getProject(jsonParam, pageFields);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

/* POST Create a page */
router.post('/:projectId/pages', async (req, res, next) => {
    const jsonData = req.body;

    //Add projectId
    jsonData.projectId = req.params.projectId;

    try {
        const result = await projectService.addPage(jsonData);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

/* DELETE Delete a page */
router.delete('/:projectId/pages/:id', (req, res, next) => {
    const jsonParam = {
        _id: ObjectId(req.params.id),
        projectId: req.params.projectId
    };

    projectService.deletePage(jsonParam, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
});

/* GET Get pages */
router.get('/:projectId/pages', async (req, res, next) => {
    const jsonParam = {
        projectId: req.params.projectId
    };

    const returnFields = {
        _id: true,
        name: true,
        isShared: true
    };

    try {
        const result = await projectService.getPages(jsonParam, returnFields);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

/* GET Get a page */
router.get('/:projectId/pages/:id', async (req, res, next) => {
    const jsonParam = {
        projectId: req.params.projectId,
        _id: ObjectId(req.params.id)
    };

    const returnFields = {
        _id: true,
        name: true,
        isShared: true,
        definition: true
    };

    try {
        const result = await projectService.getPages(jsonParam, returnFields);
        res.json(result[0]);
    } catch (err) {
        next(err);
    }
});

/* PUT Update a page */
router.put('/:projectId/pages/:id', (req, res, next) => {
    const jsonData = {
        filter: {
            _id: ObjectId(req.params.id),
            projectId: req.params.projectId
        },
        data: { definition: req.body.definition }
    };

    projectService.updatePage(jsonData, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
});

/* POST Create a content */
router.post('/:projectId/contents', (req, res, next) => {
    const jsonData = req.body;

    //Add pageId
    jsonData.projectId = req.params.projectId;

    projectService.addContent(jsonData, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
});

/* DELETE Delete a content */
router.delete('/:projectId/contents/:id', (req, res, next) => {
    const jsonParam = {
        name: req.params.id,
        projectId: req.params.projectId
    };

    projectService.deleteContent(jsonParam, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
});

/* GET Get contents of a project*/
router.get('/:projectId/contents', async (req, res, next) => {
    const jsonParam = {
        projectId: req.params.projectId
    };

    const returnFields = {
        _id: true,
        name: true
    };

    try {
        const result = await projectService.getContents(jsonParam, returnFields);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

/* GET Get a specific content */
router.get('/:projectId/contents/:id', (req, res, next) => {
    const jsonParam = {
        projectId: req.params.projectId,
        name: req.params.id
    };

    const returnFields = {
        _id: true,
        name: true,
        type: true,
        content: true
    };

    projectService.getContent(jsonParam, returnFields, (err, result) => {
        if (err) {
            next(err);
        } else {
            if (result.type === 1) {
                // If type is image return as image result
                const contentParts = result.content.split(",");
                const contentType = contentParts[0].split(';')[0].substring(5);
                const base64 = contentParts[1];
                const buffer = new Buffer(base64, 'base64');

                res.writeHead(200, {
                    'Content-Type': contentType,
                    'Content-Length': buffer.length
                });

                res.end(buffer);
            }
            else{
                res.json(result.content);
            }
        }
    });
});

/* PUT Update a content */
router.put('/:projectId/contents/:id', (req, res, next) => {
    const jsonData = {
        filter: {
            name: req.params.id,
            projectId: req.params.projectId
        },
        data: req.body
    };

    projectService.updateContent(jsonData, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
