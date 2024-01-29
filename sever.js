const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');

const app = express();

//Use for view engine templete.
app.set('view engine', 'ejs')
app.set('views', 'views')

const shopRouter = require('./routes/shop');
const AdminRouter = require('./routes/admin');

//Use for make Parsering of request data on serve.
app.use(bodyParser.urlencoded({ extended: false }));
//Get access root folder file directly with name
app.use(express.static(path.join(__dirname, 'public')))

//This middlware Alway run on every request get on serve
app.use('/', (req, res, next) => {
    console.log('This middleware alway run.');
    next();
});

app.use(shopRouter.router);
app.use('/admin', AdminRouter);

app.use((req, res, next) => {
    // Before view engine use 
    // res.status(404).sendFile(path.join(rootDir,'views','errors','404.html'))
    
    // After view engine use
    res.status(404).render('404', { pageTitle: '404 Error' })
});

app.listen(3000);