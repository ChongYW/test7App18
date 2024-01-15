const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');

router.get('/dashboard', adminController.dashboardPage);
router.get('/profile', adminController.profilePage);
router.post('/logout', adminController.logout);

module.exports = router;