const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/errorController');
// const mongoConnected = require('./util/database').mongoConnected;
const app = express();

//set the view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "view/ejs"))

//Controller SetUP
const adminRoutes = require('./routes/admin');
const ShopRouter = require('./routes/shop');
// const UserRouter = require('./routes/userRouter');

const cron = require('./crons/cronJob');

const { join } = require('path');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    let userID = '63de462e8e9b63a659ed6d35';
    User.findById(userID)
        .then(user => {
            req.user = user;
            next();
        }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
// app.use('/user', UserRouter);
app.use(ShopRouter);

//Error Page Load
app.use(errorController.get404);

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/Userdb').then(result => {
    User.findOne().then(user => {
        if (!user) {
            const user = new User({
                name: "Ali",
                email: "sana@aligmail.com",
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })

    app.listen(4000)
}).catch(err => {
    console.log(err);
});