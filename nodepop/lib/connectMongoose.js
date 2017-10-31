'use strict';

const mongoose = require('mongoose');
const bbdd = require('../config/configAPI').BBDD;
const conn = mongoose.connection;

conn.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log('Conectado a MongoDB');
});

mongoose.connect(bbdd,{
    useMongoClient: true //para que no salga el DeprecationWarning
});

