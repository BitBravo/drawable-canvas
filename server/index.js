/* eslint consistent-return:0 */

const express = require('express');
const { resolve } = require('path');
const bodyParser = require('body-parser')

const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util//port');
const setup = require('./middlewares/frontendMiddleware');
const fs = require('fs')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
app.post('/save', function (req, res) {
  saveJSON(req.body, function(err) {
    if (err) {
      res.status(404).send({data: req.body, msg:'Data not saved'});
      return;
    }
    res.send({data: req.body, msg:'Data saved'});
  });
})

function saveJSON(points, callback) {
  fs.writeFile('points.json', JSON.stringify(points), callback);
}

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
