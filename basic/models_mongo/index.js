'use strict';

var fs = require('fs');
var path = require('path');
var basename = require(__filename);
var config = require('../config/environment');
var mongoose = require('mongoose');
var mg = {};

console.info('mongoDB----Linking');

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error:' + err);
  process.exit(-1);
});

fs.readdirSync(__dirname).filter(function(file) {
  return (file.indexOf('.') !== 0) && (file != basename) && (file.slice(-3) ===
    '.js');
}).forEach(function(file) {
  mg[path.basename(file, '.js')] = require('./' + file);
});

module.exports = mg;
