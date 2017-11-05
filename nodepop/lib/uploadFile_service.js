'use strict';

const cote = require('cote');
var upload = require('express-upload');
var fs = require('fs');
const responder = new cote.Responder({ name: 'upload image' });


responder.on('upload', (req, done) => {
    
    console.log('Responde a la petición de subida de imagen....');

    upload()
    .accept(/image*/)
    .gm(function(gm) {
        return gm.resize(100, 100);
    })
    .to(['public', 'images', 'articles'])
    .exec(fs.createReadStream(req.image), function(err, file) {
      console.log('No se ha subido el fichero', err);
    });

    done();
  });