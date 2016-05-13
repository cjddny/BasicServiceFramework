'use strict';

var path = require('path');
var _ = require('lodash');
var sequeConfig = require('../config.json');

var rootPath = path.normalize(__dirname + '/../..');
//All configurations
var all = {

  //server running environment
  env: process.env.NODE_ENV,

  //workspace root path
  root: rootPath,

  //server port
  port: process.env.PORT || 3008,

  //server ip
  ip: process.env.IP || '0.0.0.0'
}

module.exports = _.merge(all, require('./' + process.env.NODE_ENV + '.js') || {});
