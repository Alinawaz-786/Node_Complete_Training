const path = require('path');
const express = require('express');
const rootDir = require('./util/path');
const bodyParser = require('body-parser');

const app = express();

//set the view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "view/ejs"))

const AdminRouter = require('./routes/admin');
const ShopRouter = require('./routes/shop');

const { join } = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', AdminRouter.routers);
app.use(ShopRouter);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});


app.listen(3000);