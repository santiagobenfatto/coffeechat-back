export default class MessagesSockets {
    constructor(socket, messagesService){
        this.socket = socket
        this.messagesService = messagesService
        this.initMessagesSockets()
    }

    initMessagesSockets(){
        this.socket.on('privateMessage', async (message) => {
            try {
                const { receiver, converId, text, date } = message

                this.socket.join(converId)

                this.socket.to(converId).emit('privateMessage', { message })
                

                

                const newMessage = await this.messagesService.create({sender, ...req.body})

                
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