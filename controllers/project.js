'use strict';
let Project = require('../models/project');
let path = require('path');
const { success } = require('../lib/util/response');

const { getFilename } = require('../lib/util/extensions');
const {
  getAllProyectsService,
  getProjectByIdService,
  deleteProjectService,
  saveProjectService,
  updateProjectService,
  getImageProjectService,
  uploadImageProjectService,
  deleteImageProjectService
} = require('../services/projectServices');

const projectController = {
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
  saveProject: async function (req, res) {
    try {
      const newProject = await saveProjectService(req.body);
      return res.status(success.code).send(newProject)

    } catch (error) {
      return res.status(error.code).send(error)
    }
  },
  getProject: async function (req, res) {
    try {
      const project = await getProjectByIdService(req.params.id);
      return res.status(success.code).send(project);

    } catch (error) {
      return res.status(error.code).send(error)
    }
  },
  getProjects: async function (req, res) {
    try {
      const projects = await getAllProyectsService();
      return res.status(success.code).send(projects);

    } catch (error) {
      return res.status(error.code).send(error)
    }
  },
  updateProjects: async function (req, res) {
    try {
      const updatedProject = await updateProjectService(req.params.id, req.body);
      return res.status(success.code).send(updatedProject);

    } catch (error) {
      return res.status(error.code).send(error)
    }
  },
  deleteProjects: async function (req, res) {
    try {
      // TODO delete associated image
      const projectRemove = await deleteProjectService(req.params.id);
      return res.status(success.code).send(projectRemove);

    } catch (error) {
      return res.status(error.code).send(error);
    }
  },
  uploadImage: async function (req, res) {
    try {
      const projectFound = await getProjectByIdService(req.params.id); 
      const projectUpdate = await uploadImageProjectService(req.params.id, req.files);
      try {
        if (projectFound.image) {
          const oldImage = projectFound.image;
          deleteImageProjectService(oldImage);                        
        }
      } catch (error) {
        //TODO
      }

      return res.status(success.code).send(projectUpdate);
    } catch (error) {

      deleteImageProjectService(getFilename(req.files));
      return res.status(error.code).send(error);
    }
  },
  getImageFile: async function (req, res) {
    try {
      const projectImage = await getImageProjectService(req.params.image);
      return res.sendFile(projectImage);

    } catch (error) {
      return res.status(error.code).send(error);
    }
  }
}

module.exports = projectController