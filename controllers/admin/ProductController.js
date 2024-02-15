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
        imageUrl: imgUrl,
        description: description,
    }).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    });
    res.redirect('/admin/product-list');
};


exports.editItem = (req, res, next) => {
    const product_id = req.params.id;
    Product.findOne({ where: { id: product_id } })
        .then(product => {
            console.log(product['title']);
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                product: product,
                path: 'admin/edit-product',
                activeShop: true,
                productCSS: true
            });
        }).catch(err => {
            console.log(err);
        });
}


exports.updateItem = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const price = req.body.price;
    const imgUrl = req.body.imgUrl;
    const description = req.body.description;

    Product.findOne({ where: { id: id } }).then(product => {
        product.title = title;
        product.price = price;
        product.imageUrl = imgUrl;
        product.description = description;
        return product.save();
    }).then(result => {
        console.log("Update successFully");
        res.redirect('/admin/product-list');
    }).catch(err => {
        console.log(err);
    })

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
    }).catch(err => {
        console.log(err)
    });
};

exports.deleteItem = (req, res, next) => {
    const product_id = req.params.id;

    Product.findOne({ where: { id: product_id } })
    .then(product => {
       return product.destroy();
    }).then(result => {
        console.log("Delete successFully");
        res.redirect('/admin/product-list');
    }).catch(err => {
        console.log(err);
    })
}