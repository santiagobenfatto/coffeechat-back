import Router from './router.routes.js'
import { customStrategy } from '../utils/strategiesEnum.js'
import MessagesController from '../controllers/messages.controller.js'

const messagesController = new MessagesController()



export default class MessagesRouter extends Router {
    init(){
        this.post('/message', ['USER', 'ADMIN'], customStrategy.JWT, messagesController.create)

        this.patch('/message/seen', ['USER', 'ADMIN'], customStrategy.JWT, messagesController.toggleSeen)

        this.patch('/message/seen', ['USER', 'ADMIN'], customStrategy.JWT, messagesController.deleteMessage)
    }
}