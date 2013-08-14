var express = require('express')
  , heroku = require('heroku.js')
  , app = module.exports = express();

app.post('/restart/:appName', function(req, res, next) {
  var appName = req.params.appName
    , privateKey = req.headers['x-user-key'];

  if (privateKey !== process.env.PRIVATE_KEY) return res.send(401);

  new heroku.App(appName).process().restart(function(success) {
    res.send(success ? 200 : 400);
  });
});
