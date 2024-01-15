const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController.js');

router.get('/dashboard', userController.dashboardPage);
router.get('/profile', userController.profilePage);
router.post('/logout', userController.logout);

module.exports = router;