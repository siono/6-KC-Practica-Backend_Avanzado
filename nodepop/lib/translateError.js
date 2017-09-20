'use strict';

const errorMessages = require('../data/messageError.json');

let translateError = function (error, lang) {

    const langsAccepted = require('../config/configAPI').languages;
    
    if (lang == null) lang = langsAccepted[0];
    
    const definedError = errorMessages.hasOwnProperty(error);

    if (definedError) {

        const definedLang = errorMessages[error].hasOwnProperty(lang);

        if (definedLang){ 
            
            return errorMessages[error][lang];
        
        }else return errorMessages["LANG_ERROR"][langsAccepted[0]];

    }

    else return errorMessages["UNDEFINED_ERROR"][lang];
};

module.exports = translateError;