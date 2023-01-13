const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // res.sendFile(path.join(rootDir, '../', 'views', 'shop.html'));
    // console.log("In to middleware");
    // res.send('<h1>This is the middleware Response');
    // next();
});

module.exports = router;