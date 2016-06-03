'use strict';

var svc = require('./../../services/');
var OperationResult = require('../../components/utils/result');

exports.register = function(req, res) {
  svc.user.register(req.body).then(function(result) {
    res.json(new OperationResult(null, result).toJson());
  }).catch(function(err) {
    res.json(new OperationResult(err).toJson());
  });
}
