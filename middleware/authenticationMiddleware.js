// Middleware to check if user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  const authenticationError = new Error();
  authenticationError.status = 401;
  next(authenticationError);
};
  
// Middleware to check if the user is not authenticated
const ensureNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  const authenticationError = new Error();
  authenticationError.status = 302;
  next(authenticationError);
};
  
const isRole = (role) => (req, res, next) =>{
  if(req.isAuthenticated() && req.user.role === role){
    return next();
  }

  const authenticationError = new Error();
  authenticationError.status = 403;
  next(authenticationError);
}

const isAdmin = isRole('admin');
const isUser = isRole('user');

module.exports = {
  ensureAuthenticated,
  ensureNotAuthenticated,
  isAdmin,
  isUser,
};