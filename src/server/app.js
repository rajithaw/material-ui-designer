const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require("helmet");

const authoriseRouter = require('./routes/authorise');
const projectsRouter = require('./routes/projects');
const exportRouter = require('./routes/export');

const app = express();

app.use(logger('dev'));
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

app.use(express.static('public'));
app.use('/api', authoriseRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/export', exportRouter);

// next parameter is required eventhough it is not used
// eslint-disable-next-line
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json(error && error.message);
});

module.exports = app;
