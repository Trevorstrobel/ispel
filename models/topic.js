const DataTypes = require('sequelize');

const sequelize = require('../util/database');

const Keyword = require('./keyword');

const Topic = sequelize.define('topic', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  domain: {
      type: DataTypes.STRING,
      allowNull: false
  },
  difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  topicId: {
      type: DataTypes.STRING,
      allowNull: false
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  
  teaser: {
      type:DataTypes.TEXT,
      allowNull: false
  },
  content: { 
    type: DataTypes.TEXT,
    allowNull: false
}

});



module.exports = Topic;