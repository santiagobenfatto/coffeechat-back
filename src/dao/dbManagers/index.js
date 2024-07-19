import ContactsListDAO from './contactsList.dao.js'
import ConversationsDAO from './conversations.dao.js'
import MessagesDAO from './messages.dao.js'
import UsersDAO from './users.dao.js'


export const contactsListDAO = new ContactsListDAO()
export const conversationsDAO = new ConversationsDAO()
export const messagesDAO = new MessagesDAO()
export const usersDAO = new UsersDAO()
