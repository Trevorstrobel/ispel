const sequelize = require('../util/database');

const Topic = require('./topic');
const Keyword = require('./keyword');

Keyword.belongsToMany(Topic, {
  through: "topic_keyword"
});
Topic.belongsToMany(Keyword, {
  through: "topic_keyword"
});