'use strict';

var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename);
var svc = {};

fs.readdirSync(__dirname).filter(function(file) {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) ===
    '.js');
}).forEach(function(file) {
  svc[path.basename(file, '.js')] = require('./' + file);
});

module.exports = svc;
