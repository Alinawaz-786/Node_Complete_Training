const express = require('express');

const router = express.Router();

router.use('/', (req, res, next) => {
    console.log("In to middleware");
    res.send('<h1>This is the middleware Response');
    next();
});

module.exports = router;