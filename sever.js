const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const errorController = require('./controllers/errorController');
const MONGODB_URL = 'mongodb://localhost:27017/Userdb';

const User = require('./models/user');
const FeedRouter = require('./routes/api/feed');
const AuthRouter = require('./routes/api/auth');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const auth = require("./middleware/is-apiAuth.js");
const app = express();

app.use(cors())

const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});



app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true, store: store })); //Session setup
app.use(flash());

app.use('/api', FeedRouter);
app.use('/api', AuthRouter);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

//Error Page Load
// app.get('/500', errorController.get500);
// app.use(errorController.get404);

app.use(auth);
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError(err) {
        if (!err.originalError) {
            return err;
        }
        const error = err.originalError.data;
        const message = err.message || "An error occurred.";
        const code = err.originalError.code;
        return { message: message, status: code, data: error }
    }
}))

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URL).then(result => {
    app.listen(4000)
}).catch(err => {
    console.log(err);
});