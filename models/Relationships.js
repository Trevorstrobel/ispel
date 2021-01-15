const sequelize = require('../util/database');

const Topic = require('./topic');
const Keyword = require('./keyword');

const Alias = require('./alias');

Keyword.belongsToMany(Topic, {
  through: "topic_keyword"
});
Topic.belongsToMany(Keyword, {
  through: "topic_keyword"
});

Alias.belongsToMany(Topic, {
  through: "alias_keyword"
});
Topic.belongsToMany(Alias, {
  through: "alias_keyword"
});
