const Product = require('../models/products');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    // const product = new Product(null, req.body.title, req.body.imgUrl, req.body.price, req.body.description, req.user._id);
    const product = new Product({
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        price: req.body.price,
        description: req.body.description,
        userId: req.user
    });
    product.save().then(result => {
        res.redirect('/admin/list-product');
    }).catch(err => {
        console.log(err);
    });
}

exports.getProducts = (req, res, next) => {
    console.log("=========================================");
    Product.find()
        // .select('title price -_id')
        .populate('userId', 'name')
        .then(products => {
            console.log(products);
            res.render('admin/product-list', {
                prods: products,
                pageTitle: 'Products List',
                path: '/admin/products',
                hasProducts: products.length > 0,
                activeShop: true,
                productCss: true
            });
        });
}

exports.getEditProduct = (req, res, next) => {
    const ProID = req.params.productId;
    Product.findById(ProID)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('shop/product-detail', {
                prods: product,
                pageTitle: 'Edit Shop',
                path: 'admin/edit-product/:productId',
                activeShop: true,
                productCss: true
            });
        })
        .catch(err => console.log(err));
}

exports.updateProduct = (req, res, next) => {
    const ProID = req.body.productId;
    const updateTitle = req.body.title;
    const updateImgUrl = req.body.imgUrl;
    const updatePrice = req.body.price;
    const updateDescription = req.body.description;

    // const product = new Product(new ObjectId(ProID), updateTitle, updateImgUrl, updatePrice, updateDescription);

    Product.findById(ProID).then(product => {
            product.title = updateTitle;
            product.imgUrl = updateImgUrl;
            product.price = updatePrice;
            product.description = updateDescription;
            product.save();
        }).then(result => {
            res.redirect('/admin/list-product');
        })
        .catch(err => console.log(err));
}

exports.deleteProductItem = (req, res, next) => {
    const ProID = req.params.productId;
    Product.findByIdAndRemove(ProID)
        .then(product => {
            if (!product) {
                return res.redirect('/admin/list-product');
            }
            return res.redirect('/admin/list-product');
        })
        .catch(err => console.log(err));
};