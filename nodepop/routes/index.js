'use strict';

let express = require('express');
let router = express.Router();
let request = require('request');
let translateError = require('../lib/translateError');


let tags = require('../config/configAPI').tags;


/* GET home page. */
router.get('/', function(req, res, next) {
    var page = (!req.query.page) ? 1 : parseInt(req.query.page);  
    var limit = (!req.query.limit) ? 4 : parseInt(req.query.limit);//Definimos por defecto el límite a 3 si no se pasa ningún parametro.
    var skip = page > 0 ? ((page - 1) * limit) : 0;
    
    var filters = "";
    if (req.query.tags) filters += "&tags="+req.query.tags;
    if (req.query.venta) filters += "&venta="+req.query.venta;
    if (req.query.nombre) filters += "&nombre="+req.query.nombre;
    if (req.query.precio) filters += "&precio="+req.query.precio;

    let url = "http://localhost:3000/apiv1/anuncios?skip="+skip+"&limit="+limit+filters;

    request(url, function(err, resp, body) {
      
      console.log("URL INICIAL", url);
      body = JSON.parse(body);
      console.log("Page: ", page);
      console.log("Limit: ",limit);
      if (body.success){
        res.render('index', { title: 'Últimos anuncios', tags: tags, anuncios: body.rows, totalRecords: body.totalRecords, page: page, limit: limit });
      }else{
        res.render('error', { title: 'Error', tags: tags, error: resp.error});
      }
      
    });
});


module.exports = router;
