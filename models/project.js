'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: [String]
});

// Transforma Project a projects
module.exports = mongoose.model('Project', ProjectSchema);
