class Sockets {
	constructor(io) {
        this.io = io;
        this.socketsEvents();
	}

	socketsEvents() {
		this.io.on("connection", (socket) => {
			socket.on("message-to-server", (message) => {
				console.log(message);
				socket.emit("message-from-server", message);
			});
		});
	}
}

module.exports = Sockets;
