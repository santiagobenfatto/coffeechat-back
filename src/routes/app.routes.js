import { Router } from 'express'
import ConversationsRoutes from './conversations.routes.js'
import MessagesRoutes from './messages.routes.js'
import ContactsRoutes from './contacts.routes.js'
import UsersRoutes from './users.routes.js'

const conversRoutes = new ConversationsRoutes()
const messagesRoutes = new MessagesRoutes()
const contactsRoutes = new ContactsRoutes()
const usersRoutes = new UsersRoutes()

const router = Router()

router.use('/convers', conversRoutes.getRouter())
router.use('/messages', messagesRoutes.getRouter())
router.use('/contacts', contactsRoutes.getRouter())
router.use('/users', usersRoutes.getRouter())

export default router
