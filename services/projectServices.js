const path = require('path');
let fs = require('fs');
const Project = require('../models/project');
const {
	forbidden,
	notFound,
	conflict,
	badRequest
} = require('../lib/util/response');
const { 
	validateExtensions,
	getExtensions,
	getFilename
 } = require('../lib/util/extensions');

/**
 * 
 * @returns {Array} Proyects
 */
const getAllProyectsService = () => {
	return new Promise((resolve, reject) => {
		Project.find({}).sort('-year').exec((err, projects) => {
			if (err) reject(conflict);
			if (!projects) reject(forbidden);

			resolve(projects);
		});
	})
}

/**
 * 
 * @param {*} id 
 * @returns {Object} Project
 */
const getProjectByIdService = (id) => {
	return new Promise((resolve, reject) => {
		const projectId = id;
		if (!projectId) reject(badRequest);

		Project.findById(projectId, (error, project) => {
			if (error) reject(conflict);
			if (!project) reject(notFound);

			resolve(project);
		})
	})
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
const deleteProjectService = (id) => {
	return new Promise((resolve, reject) => {
		const projectId = id;

		Project.findByIdAndRemove(projectId, (error, projectRemove) => {
			if (error) reject(conflict);
			if (!projectRemove) reject(forbidden);

			resolve(projectRemove);
		});
	})
}

/**
 * 
 * @param {Object} param0 
 * @returns {Object} New Project
 */
const saveProjectService = ({ name, description, category, year, lang }) => {
	// TODO validation input data

	const project = new Project();
	project.name = name;
	project.description = description;
	project.category = category;
	project.year = year;
	project.lang = lang;
	project.image = null;

	return new Promise((resolve, reject) => {
		project.save((error, projectStored) => {
			if (error) reject(conflict);
			if (!projectStored) reject(badRequest);

			resolve(projectStored);
		});
	})
}

/**
 * 
 * @param {*} id 
 * @param {Object} fieldsToUpdate 
 * @returns {Object} Updated Project
 */
const updateProjectService = (id, fieldsToUpdate) => {
	// TODO validation input data

	const projectId = id;
	return new Promise((resolve, reject) => {
		Project.findByIdAndUpdate(projectId, fieldsToUpdate, { new: true }, (error, updatedProject) => {
			if (error) reject(conflict);
			if (!updatedProject) reject(forbidden);

			resolve(updatedProject);
		});
	})
}

/**
 * 
 * @param {File} file 
 * @returns 
 */
const getImageProjectService = async (file) => {
	// Todo validate input file
	const pathFile = './uploads/' + file;
	
	return new Promise((resolve, reject) => {
		fs.exists(pathFile, (exists) => {
			if (!exists) reject(notFound);

			resolve(path.resolve(pathFile));
		});
	})
}

/**
 * 
 * @param {String} projectId 
 * @param {Object} fileToUpload 
 * @returns {Object}
 */
const uploadImageProjectService = async (projectId, fileToUpload) => {
	return new Promise((resolve, reject) => {
		if (!fileToUpload) reject(badRequest);
		if (!validateExtensions(getExtensions(fileToUpload))) reject(badRequest);

		if (!projectId) reject(badRequest);

		Project.findByIdAndUpdate(projectId, { image: getFilename(fileToUpload) }, { new: true }, (error, projectUpdate) => {
			if (error) reject(conflict);
			if (!projectUpdate) reject(forbidden);

			return resolve(projectUpdate);
		});

	})
}

/**
 * 
 * @param {*} file 
 */
const deleteImageProjectService = (file = null) => {
	try {
		if (file) {
			fs.unlink('uploads/' + file, (error) => {
				if (error) Promise.reject(error);

				return;
			});
		}
	} catch (error) {
		// TODO
	}
}

module.exports = {
	getAllProyectsService,
	getProjectByIdService,
	deleteProjectService,
	saveProjectService,
	updateProjectService,
	getImageProjectService,
	uploadImageProjectService,
	deleteImageProjectService
}