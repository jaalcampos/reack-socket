const TicketList = require("./ticket_list");

class Sockets {
	constructor(io) {
		this.io = io;
		this.ticketList = new TicketList();
		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on("connection", (socket) => {
			console.log("Customer connected");

			socket.on("request-ticket", (data, callback) => {
				const newTicket = this.ticketList.createTicket();
				callback(newTicket);
			});

			socket.on("next-ticket-task", (user, callback) => {
				const { agent, desktop } = user;
				const yourTicket = this.ticketList.assignTicket(agent, desktop);
				callback(yourTicket);
				this.io.emit("ticket-assigned", this.ticketList.last13());
			});
		});
	}
}

module.exports = Sockets;
