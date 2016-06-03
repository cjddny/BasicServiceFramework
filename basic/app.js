var express = require('express');
var config = require('./config/environment');

var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);
// Start server
server.listen(config.port, config.ip, function() {
  console.log('Express server listening on %d, in %s mode', config.port,
    app.get('env'));
});

module.exports = app;
