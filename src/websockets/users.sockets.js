export default class MessagesSockets {
    constructor(socket, usersService){
        this.socket = socket
        this.usersService = usersService
        this.initUsersSockets()
    }

    initUsersSockets(){
        //users?
        this.socket.on('someEvent', async (message) => {
            try {
                //contacts online ?
                
                this.socket.emit('messageCreated', { status: 'Success', message: 'Message created successfully', newMessage})
            } catch (error) {
                if (error instanceof UserNotFound) {
                    this.socket.emit('error', { status: 404, message: error.message });
                } else if (error instanceof ElementNotFound) {
                    this.socket.emit('error', { status: 404, message: error.message });
                } else {
                    this.socket.emit('error', { status: 500, message: 'Internal server error' });
                }
            }
        } )

    }
}