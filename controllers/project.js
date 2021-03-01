'use strict';
let Project = require('../models/project');
let fs = require('fs');
let path = require('path');

let controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'I Home'
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: 'I Test'
        });
    },
    saveProject: function (req, res) {
        let params = req.body;

        let project = new Project();
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.lang = params.lang;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(409).send({ message: err });
            if (!projectStored) return res.status(404).send({ message: 'Bad request' });

            return res.status(200).send({ project: projectStored });
        })
    },
    getProject: function (req, res) {
        let projectId = req.params.id;
        if (projectId == null) {
            return res.status(404).send({ message: 'Bad request' });
        }

        Project.findById(projectId, (err, project) => {
            console.log(err, project);

            if (err) return res.status(409).send({ message: 'error' });
            if (!project) return res.status(404).send({ message: 'Bad request' });

            return res.status(200).send({ project });
        })

    },
    getProjects: function (req, res) {
        Project.find({}).sort('-year').exec((err, projects) => {
            if (err) return res.status(409).send({ message: 'error in query' });
            if (!projects) return res.status(404).send({ message: 'empty' });

            return res.status(200).send({ projects });
        })

    },
    updateProjects: function (req, res) {
        let projectId = req.params.id;
        let update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdate) => {
            if (err) return res.status(409).send({ message: 'Imposible edit' });
            if (!projectUpdate) return res.status(404).send({ message: 'project not found' });

            return res.status(200).send({ project: projectUpdate });
        })
    },
    deleteProjects: function (req, res) {
        let projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemove) => {
            if (err) return res.status(409).send({ message: 'Imposible delete' });
            if (!projectRemove) return res.status(404).send({ message: 'project not found' });

            return res.status(200).send({ project: projectRemove });
        })
    },
    uploadImage: function (req, res) {
        let projectId = req.params.id;
        let fileName = 'Image not upload';

        if (req.files) {
            let filePath = req.files.image.path;
            let fileSplit = filePath.split('/');
            let filename = fileSplit[1];
            let extSplit = filename.split('.');
            let fileExt = extSplit[1];

            if (fileExt == 'jpeg' || fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif') {
                Project.findByIdAndUpdate(projectId, {image: filename}, {new: true}, (err, projectUpdate) => {
                    if (err) return res.status(409).send({ message: 'Imposible upload image' });
                    if (!projectUpdate) return res.status(404).send({ message: 'image not found' });
    
                    return res.status(200).send({ project: projectUpdate });
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: 'ext invalid' });
                });
            }

        } else {
            return res.status(200).send({ 
                files: fileName
            });
        }
    },
    getImageFile: function(req, res) {
        let file = req.params.image;
        let pathFile = './uploads/' + file;

        fs.exists(pathFile, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(200).send({
                    message: 'image not found'
                });
            }
        });
    }
}
module.exports = controller