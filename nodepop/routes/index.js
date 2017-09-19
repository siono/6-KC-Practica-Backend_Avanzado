'use strict';

let express = require('express');
let router = express.Router();
let request = require('request');


let tags = require('../config/configAPI').tags;


/* GET home page. */
router.get('/', function(req, res, next) {
    var page = (!req.query.page) ? 1 : parseInt(req.query.page);  
    var limit = (!req.query.limit) ? 6 : parseInt(req.query.limit); //Definimos por defecto el limite de elementos a mostrar
    var skip = page > 0 ? ((page - 1) * limit) : 0;
    
    var filters = '';
    filters+= '?skip='+skip;
    filters+= '&limit='+limit;
    if (req.query.tags) filters += '&tags='+req.query.tags;
    if (req.query.venta) filters += '&venta='+req.query.venta;
    if (req.query.nombre) filters += '&nombre='+req.query.nombre;
    if (req.query.precio) filters += '&precio='+req.query.precio;

    

    let url = 'http://localhost:3000/apiv1/anuncios'+filters;

    request(url, function(err, resp, body) {
      
      body = JSON.parse(body);
     
      if (body.success){
        
        var totalPage = Math.ceil(body.totalRecords/limit);
      
        res.render('index', { title: 'Últimos anuncios', tags: tags, anuncios: body.rows, totalPage: totalPage, filters: filters });
     
      }else{
        
        res.render('error', { title: 'Error', tags: tags, error: resp.error});
      }
      
    });
});


module.exports = router;
