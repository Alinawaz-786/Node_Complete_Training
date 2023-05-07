const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const errorController = require('./controllers/errorController');
const app = express();
const MONGODB_URL = 'mongodb://localhost:27017/Userdb';
const multer = require('multer');

const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});
//CRSF Token setting
const csrfProtection = csrf();
//file storage
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
//set the view engine
app.set("view engine", "ejs");
//Controller SetUP
const adminRoutes = require('./routes/admin');
const ShopRouter = require('./routes/shop');
const AuthRouter = require('./routes/auth');
// const UserRouter = require('./routes/userRouter');
const cron = require('./crons/cronJob');
const {join} = require('path');
const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}));
// app.use(multer({dest: 'images'}).single('image'));
app.use(multer({dest: 'images', fileFilter: fileFilter}).single('image'));
// app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'images')))

app.use(session({secret: 'secret', resave: true, saveUninitialized: true, store: store})); //Session setup

app.use(csrfProtection);
app.use(flash());

app.use('/admin', adminRoutes);
app.use(ShopRouter);
app.use(AuthRouter);

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        next();
    }
    // console.log(req.session);
    let userID = req.session.user ? req.session.user._id : null;
    User.findById(userID)
        .then(user => {
            req.user = user;
            next();
        }).catch(err => {
        /*
        * Throw error if database connection issue
        */
        next(Error(err));
    });
});

//Error Page Load
app.get('/500', errorController.get500);
app.use(errorController.get404);

app.use((error, req, res, next) => {
    // res.redirect('/500');
    res.status(500).render('500',
        {
            pageTitle: 'Page Not Found',
            path: '',
            isAuthenticated: req.isLogedIn
        });
});

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