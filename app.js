
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const authorRoutes = require('./routes/author');

const sequelize = require('./util/database');

const Topic = require('./models/topic');
const Keyword = require('./models/topic');
const TopicKeyword = require('./models/topicKeyword');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
 

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); //provide static access to the public folder

app.use('/author',authorRoutes);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

sequelize.sync().then(result =>{
    console.log(result);
    console.log('success');
    app.listen(3000);
}).catch(err => {
    console.log('ERROR!');
    console.log(err);
});


