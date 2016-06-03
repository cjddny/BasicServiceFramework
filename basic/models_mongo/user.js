'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stampIt = require('mongoose-stamp');

var UserSchema = new Schema({
  //用户手机
  mobile: {
    type: String,
    index: true
  },
  //用户名
  userName: String,
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

UserSchema.path('mobile').validate(function(mobile) {
  return mobile.length;
}, '手机号不能为空');

UserSchema.plugin(stampIt);
module.exports = mongoose.model('User', UserSchema);
