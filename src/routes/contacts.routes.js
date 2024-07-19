import Router from './router.routes.js'
import { customStrategy } from '../utils/strategiesEnum.js'
import ContactsController from '../controllers/contacts.controller.js'

const contactsController = new ContactsController()

export default class ContactsRoutes extends Router {
    init(){
        this.get('/', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.getContacts)

        this.get('/requests', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.getRequests)

        this.patch('/contact/add', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.addContact)

        this.patch('/contact/accept', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.acceptContact)
        
        this.patch('/contact/delete', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.deleteContact)
    }
}