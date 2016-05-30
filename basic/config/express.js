'use strict';
var express = require('express');
var config = require('./environment');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

module.exports = function(app) {
  //部署静态文件,视图文件目录
  app.use(express.static('public'));
  app.set('views', config.root + '/server/views');
  //配置视图引擎
  app.engine('jade', require('jade').__express);
  app.set('view engine', 'jade');
  //配置通用中间件
  app.use(function(req, res, next) {
    if (req.headers['x-forwarded-for']) {
      req.clientIp = req.headers['x-forwarded-for'];
    } else if (req.ip) {
      req.clientIp = req.ip;
    }
    next();
  });
  //gzip静态资源压缩
  app.use(compression());
  //bodyParser json对象转化
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(cookieParser());
}
