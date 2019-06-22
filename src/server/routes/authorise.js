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

/* POST create project. */
router.post('/projects', jwtCheck);

router.delete('/projects/:id', jwtCheck, async (req, res, next) => {
    const projectFilter = {
        _id: ObjectId(req.params.id)
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
});

module.exports = router;
