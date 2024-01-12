const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const authenticationMiddleware = require('../../middleware/authenticationMiddleware');

router.get('/dashboard', authenticationMiddleware.ensureAuthenticated, adminController.dashboardPage);

module.exports = router;