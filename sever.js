const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const requestError =  require('./controllers/error/404ErrorController');

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

app.use(requestError.NotFound);

app.listen(3000);