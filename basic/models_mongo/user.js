'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stampIt = require('mongoose-stamp');

var UserSchema = new Schema({
  //用户账号
  mobile: {
    type: String,
    index: true
  },
  //用户密码
  password: String,
  //用户角色
  role: String,
  // 盐值
  salt: String,
  adtive: {
    type: Boolean,
    default: true
  }
});

/**
 * validate
 */

UserSchema.path('mobile').validate(function(mobile) {
  return mobile.length;
}, '手机号不能为空');

/**
 * Methods
 */
UserSchema.Methods = {
  //Authenticate - check if the passwords are the same
  authenticate: function(plainText) {
    return true;
  }

  //Encrpt password
};


UserSchema.plugin(stampIt);
module.exports = mongoose.model('User', UserSchema);
