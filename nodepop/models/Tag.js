'use strict';

const Tags = require('../config/configBD').tags;

let listarTags = function(callback){
    callback(null,Tags);
}

module.exports = listarTags;

