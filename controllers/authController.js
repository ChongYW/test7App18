const User = require('../models/userModel');
const passport = require('passport');

const loginPage = (req, res) =>{
    res.render('login');
}

const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.flash('error', 'Email or Password is wrong!');
      return res.status(401).redirect('/login');
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      if (req.user && req.user.role === 'admin') {
        return res.redirect('/admin/dashboard');
      }else if(req.user && req.user.role === 'user'){
        return res.redirect('/user/dashboard');
      }else{
        return res.render('somethingWrong');
      }

      // // Customize the response based on your requirements
      // const responseData = {
      //   message: 'Login successful',
      //   user: {
      //     username: user.username,
      //     email: user.email,
      //     // Add other user properties as needed
      //   },
      // };

      // return res.status(200).json(responseData);
    });
  })(req, res, next);
};


const signupPage = (req, res) =>{
    res.render('signup');
}

const signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate input (you may want to add more validation)
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'Username, email, password, and role are required.' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    // Check if the email or username is already taken
    const existingUserByEmail = await User.findOne({ email }).exec();
    const existingUserByUsername = await User.findOne({ username }).exec();

    if (existingUserByEmail || existingUserByUsername) {
      return res.status(409).json({ message: 'Email or username already exists. Choose different ones.' });
    }

    // Use Passport-local-mongoose's register method to create a new user
    const newUser = new User({ username, email, role });
    await User.register(newUser, password);

    // Redirect or respond based on your application's needs
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
    loginPage,
    login,
    signupPage,
    signup,
}