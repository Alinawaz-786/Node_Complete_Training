const fs = require('fs');

const requestHandler = (req, res) => {
    console.log("Goooooooooooooood");
    if (req.url == '/testing') {
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Submit Form</title><head>');
        res.write('<body><form method="POST" action="/message"><input type="text" name="message"><button  type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (req.method == 'POST' && req.url == '/message') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        })

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
}

module.exports = {
    handler: requestHandler,
    someText: 'Some Hard Coded text'
};