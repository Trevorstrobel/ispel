const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

const router = express.Router();

// /author/add-topic => GET
router.get('/add-domain', isAuth, isAdmin, adminController.getAddDomain);
router.post('/add-domain', adminController.postAddDomain);

router.get('/add-area', isAuth, isAdmin, adminController.getAddArea);
router.post('/add-area', adminController.postAddArea);

router.get('/assign-user', isAuth, isAdmin, adminController.getAssignUser);
router.post('/assign-user', isAuth, isAdmin, adminController.postAssignUser);

module.exports = router;