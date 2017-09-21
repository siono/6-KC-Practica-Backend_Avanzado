'use strict';

$(document).ready(function() {
     $('#flag_esp').click(function(){
        alert('Se va a cambiar el idioma al Español');
        document.cookie = 'lang=es';
    });
    $('#flag_gb').click(function(){
        alert('The language has been changed to English');
        document.cookie = 'lang=en';
    }); 
});