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


//This concatenate the string api to each route
app.use('/api', projectRoutes);

//export
module.exports = app;