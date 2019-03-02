'use strict'

var Project = require('../models/project');

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
        var request = req.body;

        project.name = request.name;
        project.description = request.description;
        project.category = request.category;
        project.year = request.year;
        project.langs = request.langs;
        project.image = null;

        project.save((err, projectSave) => {
            if(err) return res.status(500).send({
                message: 'Error al guardar el proyecto.'
            });

            if(!projectSave) return res.status(404).send({
                message: 'No se ha podido guardar el proyecto.'
            });

            return res.status(200).send({
                project: projectSave
            });
        });
    }

};

module.exports = controller;
