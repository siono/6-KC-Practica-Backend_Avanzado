'use strict';

const mongoose = require('mongoose');
const configAnuncios = require('../local_config').anuncios;
const path = require('path');

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
anuncioSchema.statics.lista = async function( filter, skip, limit, callback) {
    const query = Anuncio.find(filter);
    query.skip(skip);
    query.limit(limit);
  
    let result = {};

    result = await query.exec();
    
    // poner ruta base a imagenes
    const ruta = configAnuncios.imagesURLBasePath;
    result.forEach(r => {r.foto = r.foto ? path.join(ruta, r.foto) : null} );

    
    return result; 
    
    
};



//creamos el modelo
let Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;