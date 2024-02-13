const { log } = require('console');
const Product = require('../../models/product');

exports.createItem = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: 'admin/add-product',
        activeShop: true,
        productCSS: true
    });
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
};

exports.saveItem = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imgUrl, price, description);
    product.save();
    res.redirect('/admin/product-list');
};


exports.editItem = (req, res, next) => {
    const product_id =  req.params.id;
    console.log("Product-ID ", product_id);
    Product.findById(product_id,product =>{
        console.log(product);
    });
    // res.render('admin/edit-product', {
    //     pageTitle: 'Edit Product',
    //     path: 'admin/edit-product',
    //     activeShop: true,
    //     productCSS: true
    // });
}

exports.listItem = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('admin/list-product', {
            productList: products,
            pageTitle: 'Product List',
            path: 'admin/product-list',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};