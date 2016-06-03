'use strict';

var svc = require('./../../services/');

exports.register = function(req, res) {
  svc.user.register(req.body).then(function(result) {
    res.json(result.toJson());
  }).catch(function(err) {
    res.json(err.toJson());
  });
}
