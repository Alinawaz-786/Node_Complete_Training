const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(req.headers);

    if (req.url == '/testing') {
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Submit Form</title><head>');
        res.write('<body><form method="POST" action="/message"><input type="text" name="message"><button  type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (req.method == 'POST' && req.url == '/message') {
        fs.writeFileSync('message.txt', 'Dummy');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-type', 'text/html');
    res.write("<html>");
    res.write("<head><title>Testing</title><head>");
    res.write("<body><h1>This is the Testing Pages</h1></body>");
    res.write("</html>");
    res.end();

    // process.exit();
});

server.listen(3000);