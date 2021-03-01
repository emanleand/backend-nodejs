'use strict';
let express = require('express');
let bodyParser = require('body-parser');

let projectRoutes = require('./routes/project');

// middleware 
var app = express();

//Each request is converted to a json before executing the controller
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//This concatenate the string api to each route
app.use('/api', projectRoutes);

//export
module.exports = app;