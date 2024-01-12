// const passport = require('passport');

// Middleware to check if user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
    //   res.locals.errorMessage = req.flash('error');
    //   res.locals.successMessage = req.flash('success');
      return next();
    }
    // req.flash('error', 'You must be logged in to access this page.');
    res.redirect('/login');
  };
  
  // Middleware to check if the user is not authenticated
  const ensureNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    
    if (req.user && req.user.role === 'admin') {
        return res.redirect('/admin/dashboard');
      }else if(req.user && req.user.role === 'user'){
        return res.redirect('/user/dashboard');
      }else{
        return res.render('somethingWrong');
      }
  };
  
  module.exports = {
    ensureAuthenticated,
    ensureNotAuthenticated,
  };