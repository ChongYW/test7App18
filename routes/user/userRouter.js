const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController.js')

router.get('/dashboard', userController.dashboardPage);

module.exports = router;