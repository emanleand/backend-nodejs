'use strict';
let express = require ('express');
let projectController = require('../controllers/project');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({uploadDir: './uploads'});

let router = express.Router();//get diferent methodos
router.get('/home', projectController.home);
router.get('/test', projectController.test);
router.post('/save-project', projectController.saveProject);
router.get('/project/:id?', projectController.getProject);
router.get('/projects', projectController.getProjects);
router.put('/project/:id', projectController.updateProjects);
router.delete('/project/:id', projectController.deleteProjects);
router.post('/upload-image/:id', multipartMiddleware, projectController.uploadImage);
router.get('/get-image/:image', projectController.getImageFile);

module.exports = router;
