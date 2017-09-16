'use strict';

const mongoose = require('mongoose');

//definimos el esquema.
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

//creamos el modelo
let Anuncio = mongoose.model('Anuncio', anuncioSchema);