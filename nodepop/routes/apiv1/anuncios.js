'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');
const listarTags = require('../../models/Tag');


// GET /
router.get('/', (req, res, next) => {

    const tags = req.query.tag;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const nombre = req.query.nombre;

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    const filters = {};

    console.log(filters);

    if (tags){
        filters.tags = tags;
    }

    if (venta){
        filters.venta = venta;
    }

    if (precio){
        
        let rango = precio.split('-');
       
        if (rango.length === 1){
            filters.precio = rango[0];
        }
        else if (rango.length === 2){
            // - precio
            if (rango[0]===''){
                filters.precio = {'$lte':rango[1]};
            }
            // precio -
            else if (rango[1]===''){
                filters.precio = {'$gte':rango[0]};
            }
            // limiteInf - limiteSup
            else {
                filters.precio = {'$gte':rango[0],'$lte':rango[1]};
            }
            
        }
        
    }

    if (nombre){
        filters.nombre = new RegExp('^'+ req.query.nombre, 'i');
    }


  // recuperar una lista de Anuncios
  Anuncio.lista(filters, skip, limit).then( lista => {
    res.json({ success: true, rows: lista });
  }).catch( err => {
    console.log('Error', err);
    next(err); // para que retorne la página de error
    return;
  });


});


// POST
// Crear un anuncio
router.post('/',(req, res, next) => {
    console.log(req.body);
    //creamos un nuevo anuncio
    const anuncio = new Anuncio(req.body);
    
    //lo guardamos en la base de datos
    anuncio.save((err,anuncioGuardado) => {
        if (err){
            console.log('Error', err);
            next(err); //para que retorne la página de error
            return;
        } 
        res.json({sucess: true, result: anuncioGuardado});
    });
});

router.get('/tags', (req, res, next) => {
    listarTags(function(err, tags){
        if (err){
            console.log('Error', err);
            next(err); //para que retorne la página de error
            return;
        } 
        res.json({sucess: true, result: tags});
    }
    
);
});


module.exports = router;