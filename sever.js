const path =  require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');

const app = express();

const shopRouter = require('./routes/shop');
const AdminRouter = require('./routes/admin');

//Use for make Parsering of request data on serve.
app.use(bodyParser.urlencoded({extended:false}));
//Get access root folder file directly with name
app.use(express.static(path.join(__dirname,'public')))

//This middlware Alway run on every request get on serve
app.use('/',(req,res,next)=>{
    console.log('This middleware alway run.');
    next();
});

app.use(shopRouter);
app.use('/admin',AdminRouter);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'views','errors','404.html'))
});

app.listen(3000);