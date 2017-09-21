'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');
var listarTags = require('../../models/Tag');

let translateError = require('../../lib/translateError');




// GET /
router.get('/', (req, res, next) => {

    const tags = req.query.tags;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const nombre = req.query.nombre;

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    let totalRecords; //numero de registros una vez aplicado los filtros sin paginación.

    let lang = req.query.lang;
    
    if (!lang) lang = 'en';

    var filters = {};

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

    Anuncio.find(filters).count({},function(err, count){
        totalRecords = count;
    });

  // recuperar una lista de Anuncios
  Anuncio.lista(filters, skip, limit).then( lista => {
    res.json({ success: true, rows: lista, totalRecords: totalRecords });
  }).catch( function(){
    return res.json({success:false, error: translateError('ERROR_FETCH',lang)});
  });


});


// POST
// Crear un anuncio
router.post('/',(req, res, next) => {

    let lang = req.query.lang;
    if (!lang) lang = 'en';

    //creamos un nuevo anuncio
    const anuncio = new Anuncio(req.body);
    
    //lo guardamos en la base de datos
    anuncio.save((err,anuncioGuardado) => {
        if (err){
             return res.json({success:false, error: translateError('ERROR_SAVE_BBDD',lang)});
        } 
        res.json({sucess: true, result: anuncioGuardado});
    });
});

router.get('/tags', (req, res, next) => {
    
    let lang = req.query.lang;
    if (!lang) lang = 'en';
    
    listarTags(function(err, tags){
        if (err){
            return res.json({success:false, error: translateError('ERROR_FETCH',lang)});
        } 
        res.json({sucess: true, result: tags});
    }
    
);
});


module.exports = router;