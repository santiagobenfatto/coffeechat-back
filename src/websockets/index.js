import { Server } from 'socket.io'
import MessageServices from '../services/messages.service.js'
import MessagesSockets from './messages.sockets.js'

export const initSockets = (httpServer) => {

    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true
        }
    })

    io.on('connection', (socket) => {
        console.log(`Socket ${socket.id} has been connected`)
        const reqUser = socket.request.user
        const userData = {
            first_name: reqUser.first_name,
            nickname: reqUser.nickname,
            email: reqUser.email,
            avatar_url: reqUser.avatar_url
        } 
        socket.emit('userData', userData)

        const messageService = new MessageServices()
        new MessagesSockets(socket, messageService)

        
        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} its disconnected`)
          })
    })
    
    return io
}