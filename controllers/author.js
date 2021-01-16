const Keyword = require('../models/keyword');
const Topic = require('../models/topic');
const Alias = require('../models/alias');

exports.getAddTopic = (req, res, next) => {
  res.render('add-topic', {
    pageTitle: 'Add Topic',
    path: '/author/add-topic',
    formsCSS: true,
    productCSS: true,
    activeAddTopic: true
  });
};

exports.postAddTopic = (req, res, next) => {
  const area = req.body.area;
  const topicId = req.body.topicId;
  const name = req.body.name;
  const difficulty = req.body.difficulty;
  const keywords = req.body.keywordId;
  const aliases = req.body.aliasId;
  const paragraph = req.body.paragraph;
  const content = req.body.content;

  Topic.create({
    area: area,
    difficulty: difficulty,
    topicId: topicId,
    name: name,
    teaser: paragraph,
    content: content
  }).then((newTopic) => {
    Keyword.create({
      value: keywords
    }).then((newKeyword) => {
      newTopic.addKeyword(newKeyword)
    });
    Alias.create({value: aliases}).then((newAlias=>{
      newTopic.addAlias(newAlias)
    }))
  });


  res.redirect('/');
};

exports.getTopics = (req, res, next) => {
  res.render('topics', {
    topics: topics,
    pageTitle: 'Topics',
    path: '/',
    hasTopics: topics.length > 0,
    activeTopics: true,
    productCSS: true
  });
};
