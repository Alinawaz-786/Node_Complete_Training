const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/errorController');
const mongoConnect = require('./util/database');
const app = express();

//set the view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "view/ejs"))

//Controller SetUP
const adminRoutes = require('./routes/admin');
const ShopRouter = require('./routes/shop');

const cron = require('./crons/cronJob');

const { join } = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(ShopRouter);
//Error Page Load
app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
});