const User = require('../models/user');
const Product = require('../models/products');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
    createUser: async function ({ userInput }, req) {
        const errors = [];
        if (!validator.isEmail(userInput.email)) {
            errors.push({ message: 'Email is invalid.' })
        }
        if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 5 })) {
            errors.push({ message: 'Password too short.' })
        }

        if (errors.length > 0) {
            const error = new Error('Invalid input.')
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const existingUser = await User.findOne({ email: userInput.email });
        if (existingUser) {
            const error = new Error('User exist already.');
            throw error;
        }
        const hashPw = await bcrypt.hash(userInput.password, 12)
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashPw
        });
        const createdUser = await user.save();
        return { ...createdUser._doc, _id: createdUser._id.toString() }
    },
    login: async function ({ email, password }) {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('User does not found.');
            error.code = 401;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Password is incorrect.');
            error.code = 401;
            throw error;
        }

        const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email
        }, 'somesupersecretsecret', { expiresIn: '1h' });

        return { token: token, userId: user._id.toString() }
    },
    createProduct: async function ({ productInput }, req) {
        console.log("req.isAuth........", req.isAuth, req.userId);
        if (!req.isAuth) {
            const error = new Error('Not Authicated.')
            error.code = 401;
            throw error;
        }
        const errors = [];
        console.log('list', productInput);
        if (validator.isEmpty(productInput.title)) {
            errors.push({ message: 'Title is invalid.' })
        }
        if (validator.isEmpty(productInput.description) || !validator.isLength(productInput.description, { min: 5 })) {
            errors.push({ message: 'Description too short.' })
        }

        if (errors.length > 0) {
            const error = new Error('Invalid input.')
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const user = await User.findById(req.userId);
        console.log("user...", user);
        if (!user) {
            const error = new Error('Invalid User.')
            error.code = 401;
            throw error;
        }

        const product = new Product({
            title: productInput.title,
            description: productInput.description,
            imgUrl: productInput.imgUrl,
            price: productInput.price,
            qty: productInput.qty,
            user_id: req.userId
        });

        const createdProduct = await product.save();

        return { ...createdProduct._doc, _id: createdProduct._id, createdAt: createdProduct.createdAt.toISOString(), updatedAt: createdProduct.updatedAt.toISOString() }
    },
    product: async function (args, req) {
        if (!req.isAuth) {
            const error = new Error('Not Authicated.')
            error.code = 401;
            throw error;
        }
        const totalProduct = await Product.find().countDocuments();
        console.log("length",totalProduct);
        const products = await Product.find().sort({ createdAt: -1 }).populate('user_id');

        return {
            product: products.map(p => {
                return {
                    ...p._doc,
                    _id: p._id,
                    createdAt: p.createdAt.toISOString(),
                    updatedAt: p.updatedAt.toISOString()
                };
            }),
            totalProduct: totalProduct
        }
    }
}
