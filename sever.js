const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const AdminRouter = require('./routes/admin');
const ShopRouter = require('./routes/shop');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(AdminRouter);
app.use(ShopRouter);

app.listen(3000);