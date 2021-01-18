const nodePandoc = require('node-pandoc');

//import data models
const Keyword = require('../models/keyword');
const Topic = require('../models/topic');
const Alias = require('../models/alias');


//controller for GET add-topic
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

//controller for POST add-topic
exports.postAddTopic = (req, res, next) => {
  const domain = req.body.domain;
  const area = req.body.area;
  const topicId = req.body.topicId;
  const name = req.body.name;
  const contentFile = req.file; 
  const difficulty = req.body.difficulty;
  const keyword = req.body.keyword;
  const keywords = req.body.keywords;
  const alias =  req.body.alias;
  const aliases = req.body.aliases;
  const paragraph = req.body.paragraph;
  const content = req.body.content;
  
  

  Topic.create({
    domain: domain,
    area: area,
    difficulty: difficulty,
    topicId: topicId,
    name: name,
    teaser: paragraph,
    content: content,
    contentHtml: contentFile.path
  }).then((newTopic) => {
    if (keyword) { //checks if keyword input field was used
    Keyword.create({
      value: keyword
    }).then((newKeyword) => {
      newTopic.addKeyword(newKeyword)
    }).catch(err=>console.log(err));
  } else {
   Keyword.findAll({
      id: keywords
    }).then((newKeywords)=>{
      newTopic.addKeywords(newKeywords)
    }).catch(err=>console.log(err))
  }
    if(alias){ //checks if alias input field was used
    Alias.create({value: alias}).then((newAlias=>{
      newTopic.addAlias(newAlias)
    })).catch(err=>console.log(err))} else{
      Alias.findAll({id:aliases}).then((newAliases)=>{
        newTopic.addAliases(newAliases)
      }).catch(err=>console.log(err))
    }
  });

  console.log(contentFile);
  res.redirect('/author/');
};

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
    res.write(topic.content);
  });
}
