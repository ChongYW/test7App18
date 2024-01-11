var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/userModel');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/admin/adminRouter');
const userRouter = require('./routes/user/userRouter');

mongoose.connect('mongodb://localhost:27017/test7App18');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', authRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

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

// Stop at `login` from `authController.js`.
// C:\Users\User\Desktop\Work+\Exapancific Sdn Bhd\Project+\Project 2\test7\test7App18\views\admin\dashboard.ejs