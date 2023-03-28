const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const errorController = require('./controllers/errorController');
// const mongoConnected = require('./util/database').mongoConnected;
const app = express();

const MONGODB_URL = 'mongodb://localhost:27017/Userdb';

const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});
//set the view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "view/ejs"))

//Controller SetUP
const adminRoutes = require('./routes/admin');
const ShopRouter = require('./routes/shop');
const AuthRouter = require('./routes/auth');
// const UserRouter = require('./routes/userRouter'); 

const cron = require('./crons/cronJob');

const { join } = require('path');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

// app.use((req, res, next) => {
//     let userID = '63eb314ad51add4ca2a95522';
//     User.findById(userID)
//         .then(user => {
//             req.user = user;
//             next();
//         }).catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
// app.use('/user', UserRouter);

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true, store: store })); //Session setup

app.use(ShopRouter);
app.use(AuthRouter);


//Error Page Load
app.use(errorController.get404);

mongoose.set('strictQuery', false);

mongoose.connect(MONGODB_URL).then(result => {
    /*
    * User.findOne().then(user => {
    *    if (!user) {
    *        const user = new User({
    *            name: "Ali",
    *            email: "ali@nawazgmail.com",
    *            cart: {
    *                items: []
    *            }
    *        });
    *        user.save();
    *    }
    *
    * })
    */

    app.listen(4000)
}).catch(err => {
    console.log(err);
});