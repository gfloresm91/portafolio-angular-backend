'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
        .then(() => {
            console.log('Conexión a la base de datos establecida...');
        })
        .catch(err => {
            console.log('Ha ocurrido un error: ' + err);
        });