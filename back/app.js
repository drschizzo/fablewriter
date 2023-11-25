var cors = require('cors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const corsOptions = {
    origin: 'http://localhost:4200', // Autoriser les requêtes depuis l'origine de l'application Angular
    optionsSuccessStatus: 200 // certains navigateurs legacy (IE11, divers SmartTVs) chokent sur 204
  };
  

var indexRouter = require('./routes/index');
var storyRouter = require('./routes/storygen');
var imageRouter = require('./routes/imagegen');

var app = express();

  // Activation de CORS pour toutes les requêtes
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/storygen', storyRouter);
app.use('/imagegen', imageRouter);

module.exports = app;
