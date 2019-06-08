const express = require('express');
const router = express.Router();
const exportService = require('../services/export-service');

/* GET Export project. */
router.get('/:projectId', async (req, res, next) => {
    const projectId = req.params.projectId;

    try {
        const result = await exportService.exportProject(projectId);
        res.download(result);

        // Delete temp archive file
        await exportService.deleteFileOrDirectory(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
