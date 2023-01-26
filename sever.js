const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/errorController');
const user = require('./models/user');
const mongoConnected = require('./util/database').mongoConnected;
const app = express();

//set the view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "view/ejs"))

//Controller SetUP
const adminRoutes = require('./routes/admin');
const ShopRouter = require('./routes/shop');
const UserRouter = require('./routes/userRouter');

const cron = require('./crons/cronJob');

const { join } = require('path');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById(1).then(user => {
        req.user = user;
        next();
    }).catch(err => console.log(err));
    next();
});

app.use('/admin', adminRoutes);
app.use('/user', UserRouter);
app.use(ShopRouter);

//Error Page Load
app.use(errorController.get404);

mongoConnected(() => {
    app.listen(8081);
});