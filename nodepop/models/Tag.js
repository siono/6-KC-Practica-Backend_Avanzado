'use strict';

const Tags = require('../config/configAPI').tags;

let listarTags = function(callback){
    callback(null,Tags);
}

module.exports = listarTags;

