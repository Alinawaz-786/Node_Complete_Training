const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const errorController = require('./controllers/errorController');
const MONGODB_URL = 'mongodb://localhost:27017/Userdb';

const User = require('./models/user');
const FeedRouter = require('./routes/api/feed');
const AuthRouter = require('./routes/api/auth');
const app = express();

app.use(cors())

const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});



app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true, store: store })); //Session setup
app.use(flash());

app.use('/api', FeedRouter);
app.use('/api', AuthRouter);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message,data:data });
});

// app.use((req, res, next) => {
//     res.locals.isAuthenticated = req.session.isLoggedIn;
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

// app.use((req, res, next) => {
//     if (!req.session.user) {
//         next();
//     }
//     let userID = req.session.user ? req.session.user._id : null;
//     User.findById(userID)
//         .then(user => {
//             req.user = user;
//             next();
//         }).catch(err => {
//             /*
//             * Throw error if database connection issue
//             */
//             next(Error(err));
//         });
// });

// Error Page Load
app.get('/500', errorController.get500);
app.use(errorController.get404);

// app.use((error, req, res, next) => {
//     res.status(500).render('500',
//         {
//             pageTitle: 'Page Not Found',
//             path: '',
//             isAuthenticated: req.isLogedIn
//         });
// });

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
    * })
    */
    app.listen(4000)
}).catch(err => {
    console.log(err);
});