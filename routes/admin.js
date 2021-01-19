const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /author/add-topic => GET
router.get('/add-domain', adminController.getAddDomain);
router.post('/add-domain', adminController.postAddDomain);

router.get('/add-area', adminController.getAddArea);
router.post('/add-area', adminController.postAddArea);

module.exports = router;