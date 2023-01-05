const http =  require('http');

const server =  http.createServer((req,res) =>{
    // console.log(req.headers);
	res.setHeader('Content-type','text/html');
	res.write("<html>");
	res.write("<head><title>Testing</title><head>");
	res.write("<body><h1>This is the Testing Pages</h1></body>");
	res.write("</html>");
	res.end();

	// process.exit();
});

server.listen(3000);