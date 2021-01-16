

const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const authorRoutes = require('./routes/author');

const sequelize = require('./util/database');

const Topic = require('./models/topic');
const Keyword = require('./models/keyword');
const TopicKeyword = require('./models/topic-keyword');
const Alias = require('./models/alias');
const TopicAlias = require('./models/topic-alias');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public'))); //provide static access to the public folder

app.use('/author', authorRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

Topic.belongsToMany(Keyword, {
  through: TopicKeyword
});
Keyword.belongsToMany(Topic, {
  through: TopicKeyword
});

Topic.belongsToMany(Alias, {
  through: TopicAlias
});
Alias.belongsToMany(Topic, {
  through: TopicAlias
});


sequelize.sync({ force: false }).then(result => {
  console.log(result);
  console.log(`success. App listening on port: ${port}`);
  app.listen(port);
}).catch(err => {
  console.log('ERROR!');
  console.log(err);
});


