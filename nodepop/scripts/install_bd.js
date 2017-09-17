'use strict';

let async = require('async');

//Conexión Mongo
require('../lib/connectMongoose');
let mongoose = require('mongoose');
let conn = mongoose.connection;

//Modelo
require('../models/Anuncio');

//Entidad
const Anuncio = mongoose.model('Anuncio');

//Ficheros de anuncios
let fs = require('fs');
let ficheros = 'data/anuncios.json';

async.series([
    //borramos la tabla anuncios
    function(callback){
        Anuncio.remove({}, err =>{
            console.log('Borrando tabla de Anuncios...');
            if (err){
                console.log('Error al borrar la tabla', err);
                return callback(err);
            }
            //si se ha realizado correctamente
            callback(null, ' 1 - Borrado de tablas realizado correctamente **********');

        });
     },
    // cargamos el fichero json con anuncios
    function(callback) {
        
        fs.readFile(ficheros, 'utf8', function(err, data) {
            
            if (err) {
                return callback(err);
            }
            try {
                data = JSON.parse(data);
            } catch (e) {
                return callback(e);
            }

            async.each(data.anuncios, function(anuncio, callback) {
                
                new Anuncio(anuncio).save((err,anuncioCreado)=>{
                    if (err) {
                        console.log('Error al crear el anuncio', err);
                        return callback(err);
                    }
                    else{
                        console.log('Anuncio '+anuncioCreado.nombre+' creado correctamente');
                        callback();
                    }   
                    
                    }); 
                   
            }, function(err){
                if (err){
                    return callback(err);
                }
                callback(null, ' 2 - Carga de anuncios realizada correctamente **********');
            });
            
            
        });   
        
       
        
    }


],function(err, results) {
    if (err) {
        console.error('Error al instalar la BD: ', err);
        return;
    }
    console.log(results);
    conn.close();
    console.log('--------------------------------------------');
    console.log('Instalacion base de datos nodepop terminada.');
    console.log('--------------------------------------------');
});



