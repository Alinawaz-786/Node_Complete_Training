const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const shopRouter = require('./routes/shop');
const AdminRouter = require('./routes/admin');
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',(req,res,next)=>{
    console.log('This middleware alway run.');
    next();
});

app.use(shopRouter);
app.use(AdminRouter);


app.listen(3000);