

const PORT = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require("multer");
var session = require('express-session');


// initalize sequelize with session store
var SequelizeStore = require("connect-session-sequelize")(session.Store);

const authorRoutes = require('./routes/author');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const authenticationRoutes = require('./routes/auth');

const sequelize = require('./util/database');

const Topic = require('./models/topic');
const Keyword = require('./models/keyword');
const TopicKeyword = require('./models/topic-keyword');
const Alias = require('./models/alias');
const TopicAlias = require('./models/topic-alias');
const Domain = require('./models/domain');
const Area = require('./models/area');
const User = require('./models/user');


const app = express();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext.toLowerCase() !== '.html' && ext.toLowerCase() !== '.rmd') {
    console.log(ext);
    cb(new Error('Wronf file type'), false)
  } else {
    cb(null, true);
  }
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'rmdhtml');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
  storage: fileStorage,
  fileFilter: fileFilter
}).fields([{ name: 'contentUpload', maxCount: 1 }, { name: 'rmdUpload', maxCount: 1 }]));
app.use(express.static(path.join(__dirname, 'public'))); //provide static access to the public folder
app.use('/author/topic/rmdhtml', express.static(path.join(__dirname, 'rmdhtml')));

app.use(session({
  secret: 'ecusessionsecret',
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false, saveUninitialized: false
}));

app.use('/author', authorRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authenticationRoutes);

app.use('/', userRoutes);

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

Area.belongsTo(Domain);

Topic.belongsTo(Area);

Topic.belongsTo(User);




sequelize.sync({ force: false }).then(result => {
  console.log(result);
  console.log(`success. App listening on port: ${PORT}`);
  app.listen(PORT);
}).catch(err => {
  console.log('ERROR!');
  console.log(err);
});


