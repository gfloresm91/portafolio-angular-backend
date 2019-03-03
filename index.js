'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var env = require('./environment/production');
var port = env.NODE_PORT;
var connectionString = 'mongodb://mongo:27017/portafolio?authSource=admin';

mongoose.Promise = global.Promise;
mongoose.connect(connectionString, { 
    user: env.MONGO_USER,
    pass: env.MONGO_PASS,
    useNewUrlParser: true
})
.then(() => {
    console.log('Conexión a la base de datos establecida...');

    // Creación del servidor
    app.listen(port, () => {
        console.log('Servidor corriendo correctamente en la url: localhost:' + port);
    });
})
.catch(err => {
    console.log('Ha ocurrido un error: ' + err);
});