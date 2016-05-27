'use strict';
var express = require('express');

module.exports = function(app) {
  //部署静态文件目录
  app.use(express.static('public'));
}
