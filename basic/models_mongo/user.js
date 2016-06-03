'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stampIt = require('mongoose-stamp');

var UserSchema = new Schema({
  mobile: String,
  userName: String,
  password: String
});

UserSchema.plugin(stampIt);
module.exports = mongoose.model('User', UserSchema);
