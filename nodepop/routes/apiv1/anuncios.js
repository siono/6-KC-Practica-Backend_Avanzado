'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');




router.get('/', (req,res,next) =>{
    //recupera una lista de anuncios
    Anuncio.find({}, (err,lista) =>{
        if (err){
            next(err);
            return;
        }
        res.json({ success: true, rows: lista});
    });
});

/*

// GET /
/*router.get('/', (req, res, next) => {

    const name = req.query.name;
    const age = req.query.age;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    const filter = {};

    if (name){
        filter.name = name;
    }

    if (age){
        filter.age = age;
    }

  // recuperar una lista de Anuncios
  Anuncio.lista(filter, skip, limit).then( lista => {
    res.json({ success: true, rows: lista });
  }).catch( err => {
    console.log('Error', err);
    next(err); // para que retorne la página de error
    return;
  });
});
       
    

//GET /:id
// Recupera solo un registro
router.get('/:id',(req , res, next) => {
    const _id = req.params.id;
    Anuncio.findOne({ _id: _id }, (err, anuncio) =>{
        if (err){
            consele.log('Error', err);
            next(err); //para que retorne la página de erro
            return;
        }
        res.json({ sucess: true, rows: anuncio});
    })

})

// POST
// Crear un anuncio
router.post('/',(req, res, next) => {
    console.log(req.body);
    //creamos un nuevo anuncio
    const anuncio = new Anuncio(req.body);
    
    //lo guardamos en la base de datos
    anuncio.save((err,anuncioGuardado) => {
        if (err){
            consele.log('Error', err);
            next(err); //para que retorne la página de erro
            return;
        } 
        res.json({sucess: true, result: anuncioGuardado})
    });
});


//PUT
//Actualizar un anuncio

router.put('/:clavedelanuncio', (req,res,next)=>{
    const _id = req.params.clavedelanuncio;
    // ponemos {new: true} para que retorne el anuncio Actualizado y no el anuncio antes de la actualización.
    Anuncio.findOneAndUpdate({_id: _id}, req.body, {new: true}, (err, anuncioActualizado)=>{
        if (err){
            consele.log('Error', err);
            next(err); //para que retorne la página de erro
            return;
        }   
        res.json({sucess: true, result: anuncioActualizado})
    })
    
});

//DELETE

router.delete('/:id', (req,res,next) =>{
    const _id = req.params.id;
    Anuncio.remove({ _id: _id}, (err) =>{
        if (err){
            consele.log('Error', err);
            next(err); //para que retorne la página de erro
            return;
        }
    })
});


*/

module.exports = router;