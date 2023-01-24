const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnected = callback => {
    MongoClient.connect('mongodb://localhost:27017/Userdb')
        .then(client => {
            _db = client.db();
            callback();
            console.log('Connected !');
        }).catch(err => {
            console.log(err);
        })
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No dataBase found!';
}

exports.mongoConnected = mongoConnected;
exports.getDb = getDb;