'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {
    home: (req, res) => {
        return res.status(200).send({
            message: 'Soy home'
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy test'
        });
    },

    saveProject: (req, res) => {
		var project = new Project();

        var params = req.body;
        
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		project.save((err, projectStored) => {
			if(err) return res.status(500).send({
                message: 'Error al guardar el documento.'
            });

			if(!projectStored) return res.status(404).send({
                message: 'No se ha podido guardar el proyecto.'
            });

			return res.status(200).send({
                project: projectStored
            });
		});
	},

    getProject: (req, res) => {
        var projectId = req.params.id;

        Project.findById(projectId, (err, project) => {
            if(err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });
    
            if(!project) return res.status(404).send({
                message: 'El proyecto no existe.'
            });

            return res.status(200).send({
                project
            });
        });
    },

    getProjects: (req, res) => {
        Project.find({}).sort('+year').exec((err, projects) => {
            if(err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });
    
            if(!projects) return res.status(404).send({
                message: 'No hay proyectos registrados.'
            });

            return res.status(200).send({
                projects
            });
        });
    },

    updateProject: (req, res) => {
        var projectId = req.params.id;
        var updatedRequest = req.body;

        Project.findByIdAndUpdate(projectId, updatedRequest, {new:true}, (err, projectUpdated) => {
            if(err) return res.status(500).send({
                message: 'Error al actualizar los datos.'
            });
    
            if(!projectUpdated) return res.status(404).send({
                message: 'No existe el proyecto.'
            });

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    deleteProject: (req, res) => {
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
            if(err) return res.status(500).send({
                message: 'Error al eliminar los datos.'
            });
    
            if(!projectRemoved) return res.status(404).send({
                message: 'No existe el proyecto.'
            });

            return res.status(200).send({
                project: projectRemoved
            });
        }); 
    },

    uploadImage: (req, res) => {
        var projectId = req.params.id;
        var filename = 'Imagen no subida.';

        if(req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('/');
            var filename = fileSplit[1];
            var extSplit = filename.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Project.findByIdAndUpdate(projectId, { image: filename }, { new: true }, (err, projectUpdated) => {
                    if(err) return res.status(500).send({
                        message: 'Error al subir la imagen.'
                    });
            
                    if(!projectUpdated) return res.status(404).send({
                        message: 'No existe el proyecto.'
                    });
        
                    return res.status(200).send({
                        project: projectUpdated
                    });
                });
            }else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({
                        message: 'La extensión no es válida'
                    });
                });
            } 

        } else {
            return res.status(200).send({
                message: filename
            });
        }
    },

    getImageFile: (req, res) => {
        const file = req.params.image;
        const path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if(exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: 'No existe la imagen.'
                });
            }
        });
    }

};

module.exports = controller;
