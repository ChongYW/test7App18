var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const authenticationMiddleware = require('./middleware/authenticationMiddleware');
const cacheControlMiddleware = require('./middleware/cacheControlMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

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

// Use flash messages
app.use(flash());

// Use the cache control middleware
app.use(cacheControlMiddleware);

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Cant call the `ensureNotAuthenticated` globaly cause will hit other middleware like `ensureAuthenticated`.
app.use('/', authRouter);

// For avoid overlap anything bug some middleware will call one by one, instead of `app.use(authenticationMiddleware.ensureAuthenticated);`.
app.use('/admin', authenticationMiddleware.ensureAuthenticated, authenticationMiddleware.isAdmin, adminRouter);
app.use('/user', authenticationMiddleware.ensureAuthenticated, authenticationMiddleware.isUser, userRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(errorMiddleware.handleError);

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

// Stop at dynamic EJS page.