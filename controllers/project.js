'use strict';
let Project = require('../models/project');
let fs = require('fs');
let path = require('path');
const {
  success,
  forbidden,
  notFound,
  conflict,
  badRequest
} = require('../lib/util/response');

const { validateExtensions } = require('../lib/util/extensions');
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
    const {
      name,
      description,
      category,
      year,
      lang
    } = req.body;

    const project = new Project();
    project.name = name;
    project.description = description;
    project.category = category;
    project.year = year;
    project.lang = lang;
    project.image = null;

    project.save((error, projectStored) => {
      if (error) return res.status(conflict.code).send(conflict);
      if (!projectStored) return res.status(badRequest.code).send(badRequest);

      return res.status(success.code).send({ project: projectStored });
    });
  },
  getProject: function (req, res) {
    const projectId = req.params.id;
    if (projectId == null) {
      return res.status(badRequest.code).send(badRequest);
    }

    Project.findById(projectId, (error, project) => {
      if (error) return res.status(conflict.code).send(conflict);
      if (!project) return res.status(forbidden.code).send(forbidden);

      return res.status(success.code).send({ project });
    })
  },
  getProjects: function (req, res) {
    Project.find({}).sort('-year').exec((err, projects) => {
      if (err) return res.status(conflict.code).send(conflict);
      if (!projects) return res.status(forbidden.code).send(forbidden);

      return res.status(success.code).send({ projects });
    });
  },
  updateProjects: function (req, res) {
    const projectId = req.params.id;

    const update = req.body;
    Project.findByIdAndUpdate(projectId, update, { new: true }, (error, projectUpdate) => {
      if (error) return res.status(conflict.code).send(conflict);
      if (!projectUpdate) return res.status(forbidden.code).send(forbidden);

      return res.status(success.code).send({ project: projectUpdate });
    });
  },
  deleteProjects: function (req, res) {
    const projectId = req.params.id;

    Project.findByIdAndRemove(projectId, (error, projectRemove) => {
      if (error) return res.status(conflict.code).send(conflict);
      if (!projectRemove) return res.status(forbidden.code).send(forbidden);

      return res.status(success.code).send({ project: projectRemove });
    });
  },
  uploadImage: function (req, res) {
    const projectId = req.params.id;
    let fileName = 'Image not upload';

    if (req.files) {
      let filePath = req.files.image.path;
      let fileSplit = filePath.split('/');
      let filename = fileSplit[1];
      let extSplit = filename.split('.');
      let fileExt = extSplit[1];

      if (validateExtensions(fileExt)) {
        Project.findByIdAndUpdate(projectId, {image: filename}, {new: true}, (error, projectUpdate) => {
          if (error) return res.status(conflict.code).send(conflict);
          if (!projectUpdate) return res.status(forbidden.code).send(forbidden);

          return res.status(success.code).send({ project: projectUpdate });
        });
      } else {
        fs.unlink(filePath, (error) => {
          return res.status(success.code).send({ message: 'ext invalid' });
        });
      }
    } else {
      return res.status(success.code).send({ 
        files: fileName
      });
    }
  },
  getImageFile: function(req, res) {
    const file = req.params.image;
    const pathFile = './uploads/' + file;

    fs.exists(pathFile, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(pathFile));
      } else {
        return res.status(forbidden.code).send(forbidden);
      }
    });
  }
}

module.exports = controller