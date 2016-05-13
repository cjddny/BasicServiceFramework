'use strict';

var path = require('path');
var _ = require('lodash');
var sequeConfig = require('../config.json');

var rootPath = path.normalize(__dirname + '/../..');
//All configurations
var all = {
  env: process.env.NODE_ENV,
}
