'use strict';

const cote = require('cote');
var upload = require('express-upload');
var Jimp = require("jimp");
var fs = require('fs');
const responder = new cote.Responder({ name: 'upload image' });
const path = require('path');
const configAnuncios = require('../local_config').anuncios;

responder.on('upload', (req, done) => {
    
    console.log('Responde a la petición de subida de imagen....');

    console.log('Ruta de la imagen a subir',req.image);

    Jimp.read(req.image, function (err, image) {

      //eliminamos el antiguo path dejando solo el nombre del fichero y la extensión
      var n_image = req.image.replace(/^.*[\\\/]/, ''); 
      //ruta base de las imagenes dentro del servidor
      const ruta = 'public/'+configAnuncios.imagesURLBasePath;
      //path de la nueva imagen
      var path_image = path.join(ruta,n_image);

      image.clone().resize(300, 300).write(path_image,function(err,imagen_resize){
        if (!err){
          console.log('Nueva imagen subida', path_image);
        }else{
          console.log(err);
        }
      });
     
    });

    

    done();
  });