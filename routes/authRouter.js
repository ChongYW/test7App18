const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

router.get('/login', authenticationMiddleware.ensureNotAuthenticated, authController.loginPage);
router.post('/login', authenticationMiddleware.ensureNotAuthenticated, authController.login);
router.get('/signup', authenticationMiddleware.ensureNotAuthenticated, authController.signupPage);
router.post('/signup', authenticationMiddleware.ensureNotAuthenticated, authController.signup)

module.exports = router;