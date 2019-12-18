//**************************************
'use strict';
const bodyParser = require('body-parser');
const express = require('express');
let expressWs = require('express-ws');
expressWs = expressWs(express());
const app = expressWs.app;
const router = express.Router();
const passport = require('passport');
const join = require('path').join;
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
//**************************************


const API_PORT = process.env.API_PORT || 3000;

// Require all mongoose models
const models = join(__dirname, '/backend/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)));

// Setup custom modules
require('./backend/models/database');
require('./backend/config/passport');

// Server configuration
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'build')));

require('./backend/config/routes')(router);

app.use('/api', router);
app.get('*', (req, res) => {
  res.sendFile('build/index.html', { root: __dirname });
})

app.listen(API_PORT, () => console.log('Listening on port: ' + API_PORT));

module.exports = app;