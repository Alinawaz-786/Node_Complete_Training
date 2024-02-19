const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const requestError = require('./controllers/error/404ErrorController');
const sequelize = require('./utils/database');

//RelationShip
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/CartItem');

const app = express();

//Use for view engine templete.
app.set('view engine', 'ejs');
app.set('views', 'views');

const shopRouter = require('./routes/shop');
const AdminRouter = require('./routes/admin');

//Use for make Parsering of request data on serve.
app.use(bodyParser.urlencoded({extended: false}));
//Get access root folder file directly with name
app.use(express.static(path.join(__dirname, 'public')));

//Set User {middlware}.

app.use('/', (req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err)
    })
});

app.use('/', (req, res, next) => {
    console.log('This middleware alway run.');
    next();
});

//This middlware Alway run on every request get on serve
app.use('/', (req, res, next) => {
    console.log('This middleware alway run.');
    next();
});

app.use(shopRouter.router);
app.use('/admin', AdminRouter);

app.use(requestError.NotFound);

sequelize.sync(
    // {force: true}
).then(result => {
    return User.findByPk(1);
})
    .then(user => {
        if (!user) {
            return User.create({
                name: 'Ali',
                email: 'alinawaz1857@gmail.com'
            });
        }
        return user;
    })
    .then(user => {
        // return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    }).catch(err => {
    console.log(err)
});
