const Keyword = require('../models/keyword');
const Topic = require('../models/topic');
const Alias = require('../models/alias');

exports.getAddTopic = (req, res, next) => {

  Keyword.findAll().then((allKeywords)=>{
    Alias.findAll().then((allAliases)=>{res.render('add-topic', {
      pageTitle: 'Add Topic',
      path: '/author/add-topic',
      formsCSS: true,
      productCSS: true,
      activeAddTopic: true,
      allAliases: allAliases,
      allKeywords: allKeywords
    })});
  

  
});
}

exports.postAddTopic = (req, res, next) => {
  const domain = req.body.domain;
  const area = req.body.area;
  const topicId = req.body.topicId;
  const name = req.body.name;
  const contentFile = req.file;
  
  const difficulty = req.body.difficulty;
  const keywords = ((req.body.keyword)?req.body.keyword:req.body.keywordId);
  const aliases = ((req.body.alias)?req.body.alias:req.body.aliasId);
  const paragraph = req.body.paragraph;
  const content = req.body.content;

  Topic.create({
    domain: domain,
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

  console.log(contentFile);
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
