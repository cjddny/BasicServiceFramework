'use strict';
var errors = require('./components/errors');

module.exports = function(app) {
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers",
      "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,appid"
    );
    res.header("Access-Control-Allow-Methods",
      "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    next();
  });

  //模块化路由
  app.use('/api/v1/users', require('./api/user'));

  //Not Found
  app.route('/:url(api|auth|public|views)/*').get(errors[404]);
}
