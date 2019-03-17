var dotenv = require('dotenv');
dotenv.config();

var env = {
    NODE_ENV: process.env.NODE_ENV,
    PORTAFOLIO_BACKEND_ANGULAR_PORT: parseInt(process.env.PORTAFOLIO_BACKEND_ANGULAR_PORT),
    MONGO_USER: process.env.MONGO_INITDB_ROOT_USERNAME,
    MONGO_PASS: process.env.MONGO_INITDB_ROOT_PASSWORD
}

module.exports = env;