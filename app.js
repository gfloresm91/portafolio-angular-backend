'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar archivos de rutas
var project_routes = require('./routes/project');

// Middlewares
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

// CORS

// Rutas
app.use('/api', project_routes);

app.get('/test', (req, res) => {
    res.status(200).send(
        {
            message: 'Hola mundo desde mi API Node.js'
        }
    )
});

// Exportar
module.exports = app;