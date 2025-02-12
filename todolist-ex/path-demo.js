// const http = require("http");
// http.createServer((request, response) => {
//   console.log(request.url)
// 	response.writeHead(200, { "Content-Type": "text/plain" });
// 	response.write("Custom");
// 	response.end();
// }).listen(8080);

const path = require("path");

console.log(path)

// get Path
console.log(path.dirname("xx/yy/todolist-ex/server.js"));

// concat Path
console.log(path.join(__dirname, '/xx'))

// get file name
console.log(path.basename("xx/yy/todolist-ex/server.js"));

// get file extension
console.log(path.extname("xx/yy/todolist-ex/server.js"));

// parse path
console.log(path.parse("xx/yy/todolist-ex/server.js"));