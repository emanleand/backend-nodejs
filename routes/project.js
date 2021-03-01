'use strict';
let express = require ('express');
let ProjectController = require('../controllers/project');
let multipart = require('connect-multiparty');
let  multipartMiddleware = multipart({uploadDir: './uploads'});

let router = express.Router();//get diferent methodos
router.get('/home', ProjectController.home);
router.get('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProjects);
router.delete('/project/:id', ProjectController.deleteProjects);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;
