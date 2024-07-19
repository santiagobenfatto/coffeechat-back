export default class MessagesSockets {
    constructor(socket, messagesService){
        this.socket = socket
        this.messagesService = messagesService
        this.initMessagesSockets()
    }

    initMessagesSockets(){
        this.socket.on('privateMessage', async (message) => {
            try {
                const { receiver, conversation, content } = message

                if( !receiver || !content ){
                    return this.socket.emit('error', {status:400, message: 'Missing fields'})
                }

                //One way
                this.socket.to(receiver).to(this.socket.id).emit('privateMessage', { message })
                
                //Creating a room named with converId

                

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

        this.socket.on('toggleSeen', async (messageId) => {
            try {
                //...
            } catch (error) {
                //...
            }
        })
    }
}