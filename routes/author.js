const path = require('path');

const express = require('express');

const topicsController = require('../controllers/author');

const router = express.Router();

// /author/add-topic => GET
router.get('/add-topic', topicsController.getAddTopic);

// /author/add-topic => POST
router.post('/add-topic', topicsController.postAddTopic);

module.exports = router;