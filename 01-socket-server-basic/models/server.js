//Express Server
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require('cors');
const Sockets = require("./sockets");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.server = http.createServer(this.app);

		//Socket config
		this.io = socketio(this.server);
	}

	middlewares() {
        this.app.use(express.static(path.resolve(__dirname + "/../public")));
        this.app.use(cors());
	}

	configSocket() {
		new Sockets(this.io);
	}

	execute() {
		this.middlewares();
        this.configSocket();
		this.server.listen(this.port, () => {
			console.log("Server running on :", this.port);
		});
	}
}

module.exports = Server;
