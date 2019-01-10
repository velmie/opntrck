require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const renderError = require('./libs/renderError');
const checkAuth = require('./libs/checkAuth');

const indexRouter = require('./routes/index');
const infoRouter = require('./routes/info');
const logoutRouter = require('./routes/logout');
const loginRouter = require('./routes/login');
const oauthRouter = require('./routes/oauth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', checkAuth, indexRouter);
app.use('/logout', logoutRouter);
app.use('/login', loginRouter);
app.use('/oauth', oauthRouter);
app.use('/info', checkAuth, infoRouter);

// error handler
app.use(renderError);

module.exports = app;
