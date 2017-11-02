'use strict';

const mongoose = require('mongoose');
var hash = require('hash.js');

//definimos el esquema del usuario
const usuarioSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
  });

usuarioSchema.statics.hashPassword = function(pass) {
    return hash.sha256().update(pass).digest('hex');
}

//Creamos el modelo
var Usuario = mongoose.model('Usuario', usuarioSchema);
  
module.exports = Usuario;