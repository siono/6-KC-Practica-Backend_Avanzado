'use strict';

const jwt = require('jsonwebtoken');
var localStorage = require('localStorage');

module.exports = function() { // devuelve un middleware que si no hay usuario responde con error
  return function(req, res, next) {
    const token = req.body.token || req.query.token || req.get('x-access-token') || localStorage.getItem('token_auth');

    console.log('Token en body',req.body.token);
    console.log('Token en query',req.body.token);
    console.log('Token en cabecera',req.get('x-access-token'));
    console.log('Token en localstorage',localStorage.getItem('token_auth'));
    
    if (!token) {
      const err = new Error('unauthorized');
      err.status = 401;
      next(err);
      return;
    }
    
    // tengo token
    jwt.verify(token, 'secret_key', (err, decoded) => {
      if (err){
        const err = new Error('token invalid');
        err.status= 401;
        return next(err); 
      }
      // guardo el id del usuario en request para que
      // los siguientes middlewares puedan usarlo
      req.userId = decoded._id;
      next();
    });

  }
}