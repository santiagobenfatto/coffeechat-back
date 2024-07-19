import { Server } from 'socket.io'


export const initSockets = (httpServer) => {

    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true
        }
    })

    io.on('connection', (socket) => {
        console.log(`Socket ${socket.id} has been connected`)
        socket.emit('userInfo', socket.request.user)
        console.log(socket.request.user)
        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} its disconnected`)
          })
    })
    
    return io
}