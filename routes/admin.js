const path = require('path');
const express = require('express');
const rootDir = require('../util/path');


const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    // console.log("In to the testing middleware");
    // res.send('<form method="POST" action="admin/product"><input type="text" name="message"><button  type="submit">Send</button></form>');
});

router.post('admin/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;