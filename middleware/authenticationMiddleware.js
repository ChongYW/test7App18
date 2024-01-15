// Middleware to check if user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('warning', 'Before using this function, you need to be logged in!');
  res.redirect('/login');
};
  
  // Middleware to check if the user is not authenticated
  const ensureNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }

    let redirectURL = '/login';

    if (req.user && req.user.role === 'admin') {
        // req.flash('warning', 'You already logged in, this action is no needed.');
        // return res.render('somethingWrong');
        redirectURL = '/admin/dashboard';
      }else if(req.user && req.user.role === 'user'){
        // req.flash('warning', 'You already logged in, this action is no needed.');
        // return res.render('somethingWrong');
        redirectURL = '/user/dashboard';
      }

      req.flash('warning', 'You already logged in, this action is no needed.');
      return res.render('somethingWrong', {redirectURL});
  };
  
  const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    }else{
      let redirectURL = '/'+ req.user.role + '/dashboard';
      req.flash('error', 'You are not authorized to perform this operation!');
      res.render('somethingWrong', {redirectURL});
    }
    
  };
  
  const isUser = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'user') {
      return next();
    }else{
      let redirectURL = '/'+ req.user.role + '/dashboard';
      req.flash('error', 'You are not authorized to perform this operation!');
      res.render('somethingWrong', {redirectURL});
    }
    
  };

  module.exports = {
    ensureAuthenticated,
    ensureNotAuthenticated,
    isAdmin,
    isUser,
  };

  // C:\Users\User\Desktop\Work+\Exapancific Sdn Bhd\Project+\Project 2\test7\test7App18\middleware\authenticationMiddleware.js