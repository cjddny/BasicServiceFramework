'use strict';

var _ = require('lodash');

var _systemCode = 'ff';

exports.format = function(errCode) {
  var code = parseInt(errCode || 0);
  var prefix = code < 0xff ? '0x00' : '0x' + _systemCode;
  return prefix + _.padLeft(code.toString(16), 4, '0');
}

exports.setSystemCode = function(systemCode) {
  _systemCode = systemCode;
}
