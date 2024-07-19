import { ElementNotFound, UserNotFound } from '../errors/error-exceptions.js'
import { conversationsRepository, messagesRepository, usersRepository, contactsListRepository } from '../repositories/index.js'

import { conversationsService, usersService } from '../services/index.js'

export default class MessagesService {
    
    //Por ahora son endpoints, luego irán en Sockets.

    async create(message) {
        const contact = await usersRepository.getById(message.receiver)
        if(!contact){
            throw new UserNotFound(`El contacto Id N°${message.receiver} no existe`)
        }

        const contactExists = await contactsListRepository.isContact(message.sender, message.receiver)

        if(!contactExists) {
            throw new UserNotFound(`El usuario ID N° ${message.receiver} no está en la lista de contactos, envíale una solicitud.`)
        }

        if(!message.conversation) {
            const newConver = {
                conversation_name: '',
                created_by: message.sender
            }

            const conver = await conversationsRepository.create(newConver)

            const converId = conver._id
            
            const newMsg = {
                sender: message.sender,
                receivers: message.receiver,
                content: message.content
            }
            const msg = await messagesRepository.create(newMsg)
            const messageId = msg._id

            await conversationsService.addUserToConver(converId, message.sender)
            await conversationsService.addUserToConver(converId, message.receiver)
            await conversationsRepository.addMsgToConver(converId, messageId)
            await usersRepository.addConverToUser(message.sender, converId)
            await usersRepository.addConverToUser(message.receiver, converId)
            await messagesRepository.addConverToMessage(messageId, converId)

        } else {
            const conver = await conversationsRepository.getById(message.conversation)
            const converId = conver._id
            
            if(!conver){
                throw new ElementNotFound(`La conversación con Id N° ${message.conversation} no existe`)
            }

            const newMsg = {
                sender: message.sender,
                receivers: message.receiver,
                conversation: converId,
                content: message.content
            }
            const msg = await messagesRepository.create(newMsg)
            const msgId = msg._id

            await conversationsService.addUserToConver(converId, message.sender)
            await conversationsService.addUserToConver(converId, message.receiver)
            await conversationsRepository.addMsgToConver(converId, msgId)
            await usersService.addConverToUser(message.sender, converId)
            await usersService.addConverToUser(message.receiver, converId)
        }
    }

    async toggleSeen(messageId) {
        const message = await messagesRepository.getById(messageId)

        if(!message){
            throw new ElementNotFound(`Mensaje no encontrado. El estado no pudo ser actualizado a visto`)
        }

        const result = await messagesRepository.toggleSeen(messageId)

        return result
    }

    async deleteMessage(messageId) {
        const message = await messagesRepository.getById(messageId)

        if(!message || message.state === 'deleted') {
            throw new ElementNotFound(`El mensaje que se busca eliminar ya fue eliminado o no existe.`)
        }

        const result = await messagesRepository.deleteMessage(messageId)

        return result
    }


}