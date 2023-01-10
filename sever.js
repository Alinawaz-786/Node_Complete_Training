const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
/*
 *Routes
 */

app.use('/add-product', (req, res, next) => {
    console.log("In to the testing middleware");
    res.send('<form method="POST" action="/product"><input type="text" name="message"><button  type="submit">Send</button></form>');
});

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});


app.use('/', (req, res, next) => {
    console.log("In to middleware");
    res.send('<h1>This is the middleware Response');
    next();
});



app.listen(3000);