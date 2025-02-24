const http = require("http");
const { v4: uuidv4 } = require("uuid");
const successHandle = require("./successHandle");
const errorHandle = require("./errorHandle");

const todos = [];

const requestLister = (req, res) => {
	const headers = {
		"Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
		"Content-Type": "application/json",
	};

	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	if (req.url === "/todos" && req.method === "GET") {
		successHandle(res, "success", todos);
	} else if (req.method === "OPTION") {
		res.writeHead(200, headers);
		res.end();
	} else if (req.url === "/todos" && req.method === "POST") {
		req.on("end", () => {
			try {
				const data = JSON.parse(body);

				if (!data.title || data.title.trim() === "" || data.title === undefined) {
					errorHandle(res, "false", "欄位未填寫正確，或無此 todo id");
					return;
				}

				const todo = {
					id: uuidv4(),
					title: data.title.trim(),
					completed: false,
				};

				todos.push(todo);
				successHandle(res, "success", todos);
			} catch (error) {
				console.log(error);
				errorHandle(res, "error", "Invalid JSON");
			}
		});
	} else if (req.url === "/todos" && req.method === "DELETE") {
		req.on("end", () => {
			todos.length = 0;
			successHandle(res, "success", todos);
		});
	} else if (req.url.startsWith("/todos/") && req.method === "DELETE") {
		const id = req.url.split("/")[2];
		const index = todos.findIndex((todo) => todo.id === id);

		if (index === -1) {
			errorHandle(res, "false", "Invalid: Todo Not Found");
			return;
		} else {
			todos.splice(index, 1);
			successHandle(res, "success", todos);
		}
	} else if (req.url.startsWith("/todos/") && req.method === "PATCH") {
    const id = req.url.split("/")[2];

		req.on("end", () => {
      
      const {title, completed} = JSON.parse(body);
      console.log(title, completed)
			try {
        
				const { title, completed } = JSON.parse(body);
        
				const todo = todos.find((todo) => todo.id === id);

				if (!todo) {
					errorHandle(res, "false", "Todo Not Found");
					return;
				}

				Object.assign(todo, { completed, title });

				successHandle(res, "success", todos);
			} catch (error) {
				errorHandle(res, "error", "Invalid JSON");
			}
		});
	} else {
		errorHandle(res, "false", "Router Not Found");
		return;
	}
};

const server = http.createServer(requestLister);

server.listen(4060);
