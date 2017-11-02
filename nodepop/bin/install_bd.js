'use strict';

let async = require('async');

//Conexión Mongo
const conn = require('../lib/connectMongoose');

//Modelo
const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');

//Entidad
//const Anuncio = mongoose.model('Anuncio');

//Ficheros de anuncios
let fs = require('fs');
let ficheros = 'data/anuncios.json';


conn.once('open', async function() {
    // uso try/catch para cazar los errores de async/await
    try {
      
      await initAds();
      await initUsuarios();
      // otros inits ...
      conn.close();
      
    } catch(err) {
      console.log('Hubo un error:', err);
      process.exit(1);
    }
  });


async function initAds(){
    const deleted = await Anuncio.deleteMany();
    console.log(`Eliminados ${deleted.result.n} anuncios.`);
    const data = fs.readFileSync(ficheros,'utf8');
    const insertedAds = await Anuncio.insertMany(JSON.parse(data).anuncios);
    console.log(`Insertados ${insertedAds.length} anuncios.`); 
}

async function initUsuarios() {
    const deleted = await Usuario.deleteMany();
    console.log(`Eliminados ${deleted.result.n} usuarios.`);
  
    const inserted = await Usuario.insertMany([
      { name: 'admin', 
        email: 'user@example.com',
        password: Usuario.hashPassword('1234') }
    ]);
    console.log(`Insertados ${inserted.length} usuarios.`);
}
