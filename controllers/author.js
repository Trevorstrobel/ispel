const Topic = require('../models/topic');

exports.getAddTopic = (req,res, next) =>{
    res.render('add-topic');

}
Topic.create({

});