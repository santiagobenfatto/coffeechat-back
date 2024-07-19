import { contactsListDAO, conversationsDAO, messagesDAO, usersDAO } from '../dao/dbManagers/index.js'
import ContactsListRepository from './contactsList.repository.js'
import ConvesationsRepository from './conversations.repository.js'
import MessagesRepository from './messages.repository.js'
import UsersRepository from './users.repository.js'



export const contactsListRepository = new ContactsListRepository(contactsListDAO)
export const conversationsRepository = new ConvesationsRepository(conversationsDAO)
export const messagesRepository = new MessagesRepository(messagesDAO)
export const usersRepository = new UsersRepository(usersDAO)