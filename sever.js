const path =  require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');


const app = express();

const shopRouter = require('./routes/shop');
const AdminRouter = require('./routes/admin');

//Use for make Parsering of request data on serve.
app.use(bodyParser.urlencoded({extended:false}));

//This middlware Alway run on every request get on serve
app.use('/',(req,res,next)=>{
    console.log('This middleware alway run.');
    next();
});

app.use(shopRouter);
app.use('/admin',AdminRouter);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'views','errors','404.html'))
    // res.status(404).send('<h1>Bad Request 404</h1>');
});

app.listen(3000);