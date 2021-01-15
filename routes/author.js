const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const authorController = require('../controllers/author');

const router = express.Router();


router.get('/add-topic', authorController.getAddTopic);
    


router.get('/',(req, res, next)=>{
    
    res.sendFile(path.join(rootDir, 'views', 'elm.html'));
    
});


module.exports = router;