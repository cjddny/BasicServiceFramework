'use strict';

var mg = require('../models_mongo/');

function register(dto) {
  console.info('dto-----', dto);
  return true;
}

exports.register = register;
