const http = require("http");


const requestListener = (req, res) => {
  const headers = {
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json",
  };
  // console.log(req.url);
  // console.log(req.method);
	res.writeHead(200, headers);
	res.write("Index");
	res.end();
};
const server = http.createServer(requestListener);

server.listen(3005);

const { v4: uuidv4 } = require("uuid");
