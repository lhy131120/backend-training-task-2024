const http = require("http");
const { v4: uuidv4 } = require("uuid");
const errorHandle = require("./errorHandle");

const todos = [];

const requestListener = (req, res) => {
	const headers = {
		"Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
		"Content-Type": "application/json",
	};

	// 接收data
	let body = "";
	req.on("data", (chunk) => {
    console.log(chunk.toString());
		body += chunk.toString();
	});

	if (req.url === "/todos" && req.method === "GET") {
		res.writeHead(200, headers);
		res.write(
			JSON.stringify({
				status: "success",
				data: todos,
			})
		);
		res.end();
		return;
	} else if (req.url === "/todos" && req.method === "POST") {
		req.on("end", () => {
			try {
				// 轉換為json - Object data
				const data = JSON.parse(body);
				// check title is exist?
				if (!data.title || data.title.trim() === "" || data.title === undefined) {
					errorHandle(res, "false", "欄位未填寫正確，或無此 todo id");
					return;
				}

				// create todo
				const todo = {
					id: uuidv4(),
					title: data.title.trim(),
					completed: false,
				};
				todos.push(todo);
				res.writeHead(200, headers);
				res.write(
					JSON.stringify({
						status: "success",
						data: todos,
					})
				);
				res.end();
			} catch (error) {
				errorHandle(res, "error", "Invalid JSON");
			}
		});
	} else if (req.method === "OPTIONS") {
		res.writeHead(200, headers);
		res.end();
	} else if (req.url === "/todos" && req.method === "DELETE") {
		todos.length = 0;
		res.writeHead(200, headers);
		res.write(JSON.stringify({ status: "success", data: todos }));
		res.end();
	} else if (req.url.startsWith("/todos/") && req.method === "DELETE") {
		const id = req.url.split("/")[2];
		const index = todos.findIndex((todo) => todo.id === id);
		if (index === -1) {
			errorHandle(res, "false", "Todo not found");
			return;
		} else {
			todos.splice(index, 1);
			res.writeHead(200, headers);
			res.write(JSON.stringify({ status: "success", data: todos }));
			res.end();
			return;
		}
	} else if (req.url.startsWith("/todos/") && req.method === "PATCH") {
		const id = req.url.split("/")[2];

		req.on("end", () => {
      
			try {
				// 用解構賦值取出 title, completed 的值 (解構賦值) 
				const { title, completed } = JSON.parse(body);

				// const index = todos.findIndex((todo) => todo.id === id);
				// if (index === -1) {
				// 	errorHandle(res, "false", "Todo not found");
				// 	return;
				// }

				// 改用 find 代替 findIndex，直接攞到個 todo object
				const todo = todos.find((todo) => todo.id === id);
				if (!todo) {
					errorHandle(res, "false", "Todo not found");
					return;
				}

				// 更新 todo
				// todos[index].completed = data.completed;
				// todos[index].title = data.title;

				// 用 Object.assign 更新 todo
				Object.assign(todo, { completed, title });

				res.writeHead(200, headers);
				res.write(
					JSON.stringify({
						status: "success",
						data: todos,
					})
				);
				res.end();
			} catch (error) {
				errorHandle(res, "error", "Invalid JSON");
			}
		});
	} else {
		errorHandle(res, "false", "Route not found");
		return;
	}
};
const server = http.createServer(requestListener);

server.listen(3005);
