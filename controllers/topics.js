//import data models
const Keyword = require('../models/keyword');
const Topic = require('../models/topic');
const Alias = require('../models/alias');

exports.getTopics = (req, res, next) => {
  Topic.findAll().then(topics =>{
  res.render('topics', {
    topics: topics,
    pageTitle: 'Topics',
    path: '/',
    hasTopics: topics.length > 0,
    activeTopics: true,
    productCSS: true
  })})
};

exports.getTopic = (req, res, next) =>{
  const topicId = req.params.topicId;

  Topic.findOne({where:{id:topicId}}).then((topic) =>{
    res.render('htmlTopic', {
        topic: topic,
        pageTitle: 'Topic',
        path: '/htmlTopic',
        activeTopics: true,
        productCSS: true
      })
  });
}
