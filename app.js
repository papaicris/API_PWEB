const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const urlMongo = `mongodb+srv://${process.env.USER_MONGO}:${process.env.PASSWORD_MONGO}@cluster0.bp0h9jk.mongodb.net/api_pweb?retryWrites=true&w=majority`;
console.log(urlMongo)
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

mongoose.connect(urlMongo, { useNewUrlParser: true,
                          useUnifiedTopology: true});
const dbConnection = mongoose.connection;

dbConnection.on("error", console.error.bind(console, "Erro na conexão ao MongoDB."));

var indexRouter = require('./routes/index');
var questoesRouter = require('./routes/questoes');
var usersRouter = require('./routes/users');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questoes', questoesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
