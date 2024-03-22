const { parse } = require("csv-parse");
const fs = require('fs');
const path = require('path');
const pdfDocument = require('pdfkit');
const Product = require('../models/products');
const Cart = require('../models/carts');
const Web3 = require('web3');
const ExcelJS = require('exceljs');


// // Connect to the Ethereum network (replace the URL with your Ethereum node URL)
const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/x6boNWpE52wEJveLLS3fFwuKy6Y0rnSX'));

// // Define your smart contract address
const contractAddress = '0xEF2A8e16c3c195664E83eF96D093be85aA8F08F7';

// // Define your smart contract ABI (Application Binary Interface)
const contractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claimed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "depositor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "paymentAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "purchasedTokens", "type": "uint256" }], "name": "Deposits", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "refferalIndex", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "claimedAt", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "ReferralClaimed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "bonus", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "vestingScheduleId", "type": "bytes32" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "refferalIndex", "type": "uint256" }], "name": "claimRefferalBonus", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "holder", "type": "address" }], "name": "computeNextVestingScheduleIdForHolder", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "bool", "name": "initialized", "type": "bool" }, { "internalType": "address", "name": "beneficiary", "type": "address" }, { "internalType": "uint256", "name": "cliff", "type": "uint256" }, { "internalType": "uint256", "name": "start", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "slicePeriodSeconds", "type": "uint256" }, { "internalType": "bool", "name": "revocable", "type": "bool" }, { "internalType": "uint256", "name": "amountTotal", "type": "uint256" }, { "internalType": "uint256", "name": "released", "type": "uint256" }, { "internalType": "bool", "name": "revoked", "type": "bool" }], "internalType": "struct RecruitCoinTest.VestingSchedule", "name": "vestingSchedule", "type": "tuple" }], "name": "computeReleasableAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "computeVestingScheduleIdForAddressAndIndex", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "dates", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "paymentAmount", "type": "uint256" }, { "internalType": "uint8", "name": "pTIndex", "type": "uint8" }, { "internalType": "address", "name": "referral", "type": "address" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_recipients", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amount", "type": "uint256[]" }], "name": "earlyMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_recipients", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amount", "type": "uint256[]" }], "name": "founderAllocationMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getBonusWeek", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCurrentTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPaymentTokensCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "referral", "type": "address" }], "name": "getReferralsCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "vestingScheduleId", "type": "bytes32" }], "name": "getVestingSchedule", "outputs": [{ "components": [{ "internalType": "bool", "name": "initialized", "type": "bool" }, { "internalType": "address", "name": "beneficiary", "type": "address" }, { "internalType": "uint256", "name": "cliff", "type": "uint256" }, { "internalType": "uint256", "name": "start", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "slicePeriodSeconds", "type": "uint256" }, { "internalType": "bool", "name": "revocable", "type": "bool" }, { "internalType": "uint256", "name": "amountTotal", "type": "uint256" }, { "internalType": "uint256", "name": "released", "type": "uint256" }, { "internalType": "bool", "name": "revoked", "type": "bool" }], "internalType": "struct RecruitCoinTest.VestingSchedule", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getVestingScheduleByAddressAndIndex", "outputs": [{ "components": [{ "internalType": "bool", "name": "initialized", "type": "bool" }, { "internalType": "address", "name": "beneficiary", "type": "address" }, { "internalType": "uint256", "name": "cliff", "type": "uint256" }, { "internalType": "uint256", "name": "start", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "slicePeriodSeconds", "type": "uint256" }, { "internalType": "bool", "name": "revocable", "type": "bool" }, { "internalType": "uint256", "name": "amountTotal", "type": "uint256" }, { "internalType": "uint256", "name": "released", "type": "uint256" }, { "internalType": "bool", "name": "revoked", "type": "bool" }], "internalType": "struct RecruitCoinTest.VestingSchedule", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "holdersVestingCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isReffered", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "depositors", "type": "address[]" }, { "internalType": "uint256[]", "name": "paymentAmounts", "type": "uint256[]" }, { "internalType": "bool[]", "name": "preSale", "type": "bool[]" }, { "internalType": "bool[]", "name": "publicSale3M", "type": "bool[]" }, { "internalType": "bool[]", "name": "publicSale6M", "type": "bool[]" }, { "internalType": "address[]", "name": "referral", "type": "address[]" }], "name": "manualDeposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_recipients", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amount", "type": "uint256[]" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "paymentTokens", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "prices", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "referralClaims", "outputs": [{ "internalType": "address", "name": "refferalAddress", "type": "address" }, { "internalType": "uint256", "name": "purchasedTokens", "type": "uint256" }, { "internalType": "uint256", "name": "claimableTokens", "type": "uint256" }, { "internalType": "uint256", "name": "claimedAt", "type": "uint256" }, { "internalType": "bool", "name": "claimed", "type": "bool" }, { "internalType": "uint256", "name": "unlockClaimAt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "vestingScheduleId", "type": "bytes32" }], "name": "revoke", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[5]", "name": "_bonus", "type": "uint256[5]" }], "name": "setBonus", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[4]", "name": "_dates", "type": "uint256[4]" }], "name": "setDates", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20[]", "name": "_paymentTokens", "type": "address[]" }], "name": "setPaymentTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[2]", "name": "_prices", "type": "uint256[2]" }], "name": "setPrices", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "supplies", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "vestingSchedulesTotalAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "pTIndex", "type": "uint8" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to fetch transaction hashes
async function getTransactionHashes() {
    try {
        // Get past logs of transactions related to the smart contract
        const logs = await web3.eth.getPastLogs({
            fromBlock: 0, // Start block number
            toBlock: 'latest', // End block number (or 'latest' for the latest block)
            address: contractAddress // Address of the smart contract
        });
        // Extract transaction hashes from logs
        const transactionHashes = logs.map(log => log.transactionHash);
        return transactionHashes;
    } catch (error) {
        console.error('Error fetching transaction hashes:', error);
    }
}


exports.downloadExcel = async (req, res, next) => {
    const data = await getTransactionHashes();
    const filePath = 'example.txt';
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Data has been written to the file successfully.');
    });
    res.send('Send');
}

exports.getProducts = (req, res, next) => {
    // console.log(req.session);
    Product.find({ user_id: String(req.session.user._id) })
        .then(products => {
            res.render('admin/product-list', {
                prods: products,
                pageTitle: 'Products List',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCss: true,
                isAuthenticated: req.session.isLoggedIn
            });
        });
}

exports.getShop = (req, res, next) => {
    const isLogedIn = req.get('Cookie').split('=')[1];
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    Product.fetchAll().then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop List',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true,
            isAuthenticated: req.session.isLoggedIn
        });
    })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error)
        });
}

exports.getIndex = (req, res, next) => {
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const isLogedIn = req.get('Cookie').split('=')[1];

    Product.fetchAll().then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop List',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true,
            isAuthenticated: req.session.isLoggedIn
        });
    })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error)
        });
}

exports.postOrder = (req, res, next) => {
    req.user.addOrder().then(result => {
        res.redirect('/cart');
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    });
};

exports.getOrders = (req, res, next) => {
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const isLogedIn = req.get('Cookie').split('=')[1];

    req.user.getOrder()
        .then(orders => {
            res.render('shop/orders', {
                path: '/order',
                pageTitle: 'Your Order',
                order: orders,
                isAuthenticated: req.session.isLoggedIn
            });
        }).catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error)
        });

};

exports.postCart = (req, res, next) => {
    const ProID = req.params.productId;
    Product.findById(ProID).then(product => {
        console.log(product);
        console.log(req.user);
        // return req.user.AddToCart(product);
    }).then(result => {
        res.redirect('/cart');
    })
}

exports.getCart = (req, res, next) => {
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const isLogedIn = req.get('Cookie').split('=')[1];


    // req.user.populate('cart.items.productId')
    //     .then(user => {
    //         const products = user.cart.items;
    //         res.render('shop/carts', {
    //             path: '/cart',
    //             pageTitle: 'Your Carts',
    //             products: products,
    //             isAuthenticated: req.session.isLoggedIn
    //         });
    //     }).catch(err => console.log(err));
}

exports.deleteCartItem = (req, res, next) => {
    const _proID = req.params.productId;
    req.user.deleteItemFromCart(_proID).then(result => {
        res.redirect('/cart');
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    });
}

exports.getCheckOut = (req, res, next) => {
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const isLogedIn = req.get('Cookie').split('=')[1];

    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.getInvoice = (req, res, next) => {
    const OrderId = req.params.orderId;
    Order.findById(OrderId).then(order => {
        if (!order) {
            return next(new Error('No Order Found.'));
        }
        if (order.user.userId.toString() !== req.user._id.toString()) {
            return next(new Error('Unauthorized'));
        }
        const invoiceName = 'invoice-' + OrderId + '.pdf';
        const invoicePath = path.join('data', 'invoices', invoiceName);
        //Method 1
        // fs.readFile(invoicePath, (err, data) => {
        //     if (err) {
        //         return next(err);
        //     }
        //     res.setHeader('Content-Type', 'application/pdf');
        //     res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
        //     res.send(data);
        // });

        //Method 2
        // const file = fs.createReadStream(invoicePath);
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
        // file.pipe(res);

        /*
         * Method 3
         *  New Package PDF Kit
         */
        const pdfDoc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
        pdfDoc.pipe(fs.createReadStream(invoiceName));
        pdfDoc.pipe(res);
        pdfDoc.text('Hello Worlds!');
        // Design PDF
        pdfDoc.fontSize(12).text('Invoice', {
            underline: true
        });
        pdfDoc.text('--------------------------------');
        let totalPrice = 0;
        order.products.forEach(prod => {
            totalPrice += prod.quantity * prod.product.price;
            pdfDoc.text(
                prod.product.title + '-' + prod.quantity + 'x' + '$' + prod.product.price
            );
        });

        pdfDoc.text('Total Price: ');
        pdfDoc.text();
        pdfDoc.end();

    }).catch(err => next(err));

};