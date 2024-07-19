import { ElementNotFound, UserAlreadyExists, UserNotFound } from '../errors/error-exceptions.js'
import { contactsListRepository, usersRepository } from '../repositories/index.js'


export default class ContactsListService {


    getContacts = async (userId) => {
        const user =  await usersRepository.getById(userId)
        //const userList = user.contact_list

        if(!user){
            throw new UserNotFound(`Usuario no encontrado`)
        }
        const contacts = await contactsListRepository.getContacts(userId)

        if(contacts.length === 0){
            throw new ElementNotFound(`No hay contactos agregados aún`)
        }

        return contacts
    }

    getRequests = async (userId) => {
        //const user =  await usersRepository.getById(userId)
        //const listId = user.contact_list

        const requesters = await contactsListRepository.getRequests(userId)
        
        if(requesters.length === 0){
            throw new ElementNotFound(`El usuario aún no tiene solicitudes de contacto`)
        }
        
        return requesters
    }

    createList = async (userId) => {
        const user =  await usersRepository.getById(userId)
        
        if(!user){
            throw new UserNotFound(`Usuario con Id N°${user._id} no encontrado`)
        }

        const result = await contactsListRepository.createList(userId)

        return result
    }

    addContact = async (userId, contactId) => {        
        const contact = await contactsListRepository.isContact(userId, contactId)

        if(contact){
            throw new UserAlreadyExists(`El usuario ya pertenece a la lista de contactos o tiene una solicitud enviada`)
        }

        const contacExists = await usersRepository.getById(contactId)
        
        if(!contacExists){
            throw new UserNotFound(`Usuario con Id N°${contactId} no encontrado`)
        }

        const result = await contactsListRepository.addContact(userId, contactId)
        await contactsListRepository.addContact(contactId, userId)

        return result
    }

    acceptContact = async (userId, contactId) => {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`Usuario con Id N°${user} no encontrado`)
        }

        const receptor = await usersRepository.getById(contactId)

        if(!receptor){
            throw new UserNotFound(`Usuario con Id N°${contactId} no encontrado`)
        }

        await contactsListRepository.acceptContact(userId, contactId)
        await contactsListRepository.acceptContact(contactId, userId)
    }

    deleteContact = async(userId, contactId) => {
        const user = await usersRepository.getById(userId)
        const contactIsUser = await usersRepository.getById(contactId)

        if(!user){
            throw new UserNotFound(`Usuario con Id N°${user} no encontrado`)
        }

        if(!contactIsUser){
            throw new UserNotFound(`El contacto Id N°${user} no es un usuario`)
        }
        
        const contact = await contactsListRepository.isContact(userId, contactId)

        if(!contact){
            throw new UserNotFound(`Usuario con Id N°${contactId} no encontrado`)
        }
        await contactsListRepository.deleteContact(userId, userId)

        const result = await contactsListRepository.deleteContact(userList, contactId)

        return result

    }
}