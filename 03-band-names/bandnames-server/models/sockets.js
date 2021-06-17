const BandList = require("./band-list");


class Sockets {

    constructor( io ) {

        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log("customer connected");
            
            //Emit all bands
            socket.emit('current-bands', this.bandList.getBands());

            //Add vote
            socket.on("votar-banda", (id) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on("remove-band", (id) => {
                this.bandList.romeveBand(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on("change-name-band", ({id, name}) => {
                this.bandList.changeName(id,name);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on("add-new-band",(name) => {
                this.bandList.addBand(name);
                this.io.emit('current-bands', this.bandList.getBands());
            })
        
        });
    }


}


module.exports = Sockets;