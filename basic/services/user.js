'use strict';

var mg = require('../models_mongo/');
var Promise = require('bluebird');

function register(dto) {
  console.info('dto-----', dto);

  return new Promise(function(resolve, reject) {
    mg.user.create({
        userName: dto.userName,
        mobile: dto.mobile,
        password: dto.password,
        roles: 'user'
      },
      function(err, user) {
        console.info('user-----', user);
        console.info('err-----', err);
        if (!!err) reject(new Error('新建用户出错'));
        resolve(user);
      });
  });
}

exports.register = register;
