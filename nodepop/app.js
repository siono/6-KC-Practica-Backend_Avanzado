'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const i18n = require('./lib/i18nConfigure')();
var loginController = require('./routes/loginController');
const jwtAuth = require('./lib/jwtAuth');
const tokenAuth = require('./lib/tokenAuth'); 
var request = require('request');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Conexion a la base de datos.
require('./lib/connectMongoose');

// Llamamos al modelo
require('./models/Anuncio');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(i18n.init);

app.get('/lang/:locale', (req, res, next) => {
  const locale = req.params.locale;
  const referer = req.query.redir || req.headers.referer;
  res.cookie('nodepop-lang', locale, { maxAge: 900000, httpOnly: true });
  res.redirect(referer);
});

//middleware para generar el token JWT
app.post('/apiv1/authenticate',  loginController.postLoginJWT);

//para usar la api debemos validarnos
app.use('/apiv1/anuncios',jwtAuth(), require('./routes/apiv1/anuncios'));

app.get( '/login',loginController.index);
app.get( '/logout', loginController.logout);

app.get('/anuncio',tokenAuth(), function(req,res,next){
  res.render('ad',{
    error: ""
  });
});

app.post('/anuncio',function(req,res,next){
  console.log('Campos para crear un anuncio nuevo',req.body);

  var options = { method: 'POST',
  url: req.protocol+'://'+req.get('host')+'/apiv1/anuncios',
  headers: 
   {'content-type': 'application/x-www-form-urlencoded' },
  form: req.body };

  request(options, function (error, response, body) {
    if (error){
      res.render('ad',{
        error: __(error.message)
      });
    
    }else{
        res.redirect('/');
    }
  });
 
});

//con tokenAuth comprobamos que el usuario tiene el token de validación,sino lo devolvemos al login.
app.get('/',tokenAuth(),require('./routes/index'));





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  // establezco el status a la respuesta
  err.status = err.status || 500;
  res.status(err.status);

  // si es un 500 lo pinto en el log
  if (err.status && err.status >= 500) console.error(err);
  
  // si es una petición al API respondo JSON...
  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/api') === 0;
}

module.exports = app;
