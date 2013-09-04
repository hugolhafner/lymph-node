var express = require('express')
  , Heroku = require('heroku.js')
  , app = module.exports = express();

app.post('/restart/:appName', function(req, res, next) {
  var appName = req.params.appName
    , privateKey = req.headers['x-user-key'];

  if (privateKey !== process.env.PRIVATE_KEY) return res.send(401);

  var api = new Heroku({
    'email' : process.env.HEROKU_EMAIL,
    'apiToken' : process.env.HEROKU_API_TOKEN
  });

  return api.postPsRestart(appName, {}, function(err, response) {
    if(err) return next(err);

    console.log(response);
    res.send(response.status);
  });
});
