'use strict';
const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const Ads = require('../models/Anuncio');

module.exports.initBBDD = async function () {
    const deletedUsers = await Usuario.deleteMany();
    const insertUsers = await Usuario.insertMany([
        { email: 'example@example.com', password: Usuario.hashPassword('1234'), name: 'example' }
    ]);

    const deletedAds= await Ads.deleteMany();
    const insertAds = await Ads.insertMany([{
        "nombre": "Play Station",
        "venta": false,
        "precio": 150,
        "foto": "play.jpg",
        "tags": [
            "lifestyle"
        ]
    },
    {
        "nombre": "Lámpara",
        "venta": false,
        "precio": 20,
        "foto": "lampara.jpg",
        "tags": [
            "work",
            "lifestyle"
        ]
    }

    ])
    console.log('************* INICIALIZACIÓN TEST BBDD *********************')
    console.log(`Eliminados ${deletedUsers.result.n} usuarios.`);
    console.log(`Insertados ${insertUsers.length} usuarios.`);
    console.log(`Eliminados ${deletedAds.result.n} anuncios.`);
    console.log(`Insertados ${insertAds.length} anuncios.`);
}