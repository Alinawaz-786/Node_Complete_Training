const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const AdminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("Shop file");
    console.log(AdminData.products);
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // res.sendFile(path.join(rootDir, '../', 'views', 'shop.html'));
    // console.log("In to middleware");
    // res.send('<h1>This is the middleware Response');
    // next();
});

module.exports = router;