const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController.js');
const authenticationMiddleware = require('../../middleware/authenticationMiddleware');


router.get('/dashboard', authenticationMiddleware.ensureAuthenticated, userController.dashboardPage);

module.exports = router;