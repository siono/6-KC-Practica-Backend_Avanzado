'use strict';

//para el formulario de login.
 $(document).ready(function() {

    $('form#form_login').submit(function(event){
        
        //recogemos los valores del formulario
        var formData = {
            'email': $('input[name=email]').val(),
            'password': $('input[name=password]').val()
        };
        
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "/apiv1/authenticate",
          "method": "POST",
          "headers": {
            "content-type": "application/x-www-form-urlencoded"
          },
          "data": formData
        }
        
        $.ajax(settings).done(function (response) {
          if(response.ok){
            //credenciales válidas
            window.location.href = "/";
          }
          else{
            //error de autenticación
            alert('Error de Autenticación');
            window.location.href = "/login";
          }
        });
        
        event.preventDefault();
    });
}); 
