const Product = require('../../models/product');

exports.createItem = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: 'admin/add-product',
        activeShop: true,
        productCSS: true
    });
};

exports.saveItem = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    // const product = new Product('', title, imgUrl, price, description);
    Product.create({
        title: title,
        price: price,
        imageUrl:imgUrl,
        description:description,
    }).then(result =>{
        console.log(result)
    }).catch(err=>{
        console.log(err)
    });
    res.redirect('/admin/product-list');
};


exports.editItem = (req, res, next) => {
    const product_id = req.params.id;

    Product.findById(product_id, product => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            product: product,
            path: 'admin/edit-product',
            activeShop: true,
            productCSS: true
        });
    })
}


exports.updateItem = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const price = req.body.price;
    const imgUrl = req.body.imgUrl;
    const description = req.body.description;
    console.log(title);
    const product = new Product(id, title, imgUrl, price, description);
    product.save();
    res.redirect('/admin/product-list');
}

exports.listItem = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('admin/list-product', {
            productList: products,
            pageTitle: 'Product List',
            path: 'admin/product-list',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    }).catch(err=>{
        console.log(err)
    });
};

exports.deleteItem = (req, res, next) => {
    const product_id = req.params.id;
    console.log(product_id);
    Product.deleteById(product_id);
    res.redirect('/admin/product-list');
}