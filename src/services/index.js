import ConversationsService from './conversations.service.js'
import UsersService from './users.service.js'
import MessagesService from './messages.service.js'

export const usersService = new UsersService()
export const conversationsService = new ConversationsService()
export const messagesService = new MessagesService()
