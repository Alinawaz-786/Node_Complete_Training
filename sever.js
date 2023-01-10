const http = require('http');
const express = require('express');
const app = express();

/*
 * Middleware Add into the Routes
 */

app.use((req, res, next) => {
    console.log("In the middleware");
    next();
});
app.use((req, res, next) => {
    console.log("In to another middleware");
    res.send('<h1>This is the another middleware Response');
});

const server = http.createServer(app);

server.listen(3000);