const express = require('express');
const router = express.Router();

const projectService = require('../services/project-service');

const ObjectId = require('mongodb').ObjectID;

/* GET Get shared components */
router.get('/shared/:projectId', async (req, res, next) => {
    const pagesFilter = {
        projectId: req.params.projectId,
        isShared: true
    };

    const returnFields = {
        id: true,
        name: true,
        isShared: true
    };

    try {
        const result = await projectService.getPages(pagesFilter, returnFields);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

/* GET a component */
router.get('/:componentId', async (req, res, next) => {

    const jsonParam = {
        _id: ObjectId(req.params.componentId)
    };

    const returnFields = {
        id: true,
        name: true,
        definition: true
    };

    try {
        const result = await projectService.getPages(jsonParam, returnFields);
        res.json(result[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;