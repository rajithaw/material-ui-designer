const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const ObjectId = require('mongodb').ObjectID;

const projectService = require('../services/project-service');

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://material-ui-designer.au.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://material-ui-designer-api',
    issuer: 'https://material-ui-designer.au.auth0.com/',
    algorithms: ['RS256']
});

const projectAccessCheck = (projectIdParamName) => async (req, res, next) => {
    const projectFilter = {
        _id: ObjectId(req.params[projectIdParamName])
    }

    const project = await projectService.getProject(projectFilter, null, null);

    if(!project) {
        next(new Error('Could not find project'));
    }
    else if(project.createdByUser !== req.user.sub) {
        next(new Error('Permission denied'));
    }
    else {
        next();
    }
};

// POST create project
router.post('/projects', jwtCheck);

// DELETE delete project
router.delete('/projects/:id', jwtCheck, projectAccessCheck('id'));

// POST Add page
router.post('/projects/:projectId/pages', jwtCheck, projectAccessCheck('projectId'));

// POST Delete page
router.delete('/projects/:projectId/pages/:id', jwtCheck, projectAccessCheck('projectId'));

// PUT Update page
router.put('/projects/:projectId/pages/:id', jwtCheck, projectAccessCheck('projectId'));

// POST Create content
router.post('/projects/:projectId/contents', jwtCheck, projectAccessCheck('projectId'));

// DELETE Delete content
router.delete('/projects/:projectId/contents/:id', jwtCheck, projectAccessCheck('projectId'));

// PUT Update content
router.put('/projects/:projectId/contents/:id', jwtCheck, projectAccessCheck('projectId'));

// POST create project
router.post('/projects/:projectId/copy', jwtCheck);

module.exports = router;
