'use strict';

var localStorage = require('localStorage');

module.exports = function() { // devuelve un middleware que si no hay usuario redirige al login
  return function(req, res, next) {
    var token_auth= localStorage.getItem('token_auth');
    if (!token_auth) {
      // redirigimos al login
      res.redirect('/login');
      return;
    }
    // el usuario está autenticado
    next();
  }
}