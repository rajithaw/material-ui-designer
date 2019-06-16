const express = require('express');
const router = express.Router();
const projectService = require('../services/project-service');

const checkReadOnly = async (projectId, next) => {
    const readOnly = await projectService.isReadOnlyProject(projectId);
    
    if(readOnly) {
        next(new Error('Project is read only'));
    }
    else {
        next();
    }
}

router.delete('/api/projects/:id', async (req, res, next) => {
    const projectId = req.params.id;

    await checkReadOnly(projectId, next);
});

router.post('/api/projects/:projectId/pages', async (req, res, next) => {
    const projectId = req.params.projectId;

    await checkReadOnly(projectId, next);
});

router.delete('/api/projects/:projectId/pages/:id', async (req, res, next) => {
    const projectId = req.params.projectId;

    await checkReadOnly(projectId, next);
});

router.put('/api/projects/:projectId/pages/:id', async (req, res, next) => {
    const projectId = req.params.projectId;

    await checkReadOnly(projectId, next);
});

router.post('/api/projects/:projectId/contents', async (req, res, next) => {
    const projectId = req.params.projectId;

    await checkReadOnly(projectId, next);
});

router.delete('/api/projects/:projectId/contents/:id', async (req, res, next) => {
    const projectId = req.params.projectId;

    await checkReadOnly(projectId, next);
});

router.put('/api/projects/:projectId/contents/:id', async (req, res, next) => {
    const projectId = req.params.projectId;

    await checkReadOnly(projectId, next);
});

module.exports = router;