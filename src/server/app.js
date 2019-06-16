var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var readOnlyRouter = require('./routes/readonly');
var projectsRouter = require('./routes/projects');
var componentsRouter = require('./routes/components');
var exportRouter = require('./routes/export');

var app = express();

app.use(logger('dev'));
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));
app.use('/', readOnlyRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/components', componentsRouter);
app.use('/api/export', exportRouter);

// next parameter is required eventhough it is not used
// eslint-disable-next-line
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json(error && error.message);
});

module.exports = app;
