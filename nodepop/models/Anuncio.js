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

//creamos los indices
anuncioSchema.index({ nombre : 1, venta: 1 });

//Metodo estátilo lista
anuncioSchema.statics.lista = function( filter, skip, limit, callback) {
    const query = Anuncio.find(filter);
    query.skip(skip);
    query.limit(limit);
  
    return query.exec(callback); 
};



//creamos el modelo
let Anuncio = mongoose.model('Anuncio', anuncioSchema);