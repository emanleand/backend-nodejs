'use strict';
 
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
 
let ProyectSchema = Schema({
   name: String,
   description: String,
   category: String,
   year: Number,
   lang: String,
   image: String
 
})
 
module.exports = mongoose.model('Project', ProyectSchema)