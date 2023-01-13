const path = require('path');
const express = require('express');
const rootDir = require('./util/path');
const bodyParser = require('body-parser');

const app = express();

const AdminRouter = require('./routes/admin');
const ShopRouter = require('./routes/shop');
const { join } = require('path');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', AdminRouter);
app.use(ShopRouter);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});


app.listen(3000);