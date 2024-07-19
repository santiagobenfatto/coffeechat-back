import { ElementNotFound, UserNotFound  } from '../errors/error-exceptions.js'
import MessagesServices from '../services/messages.service.js'

const messagesService = new MessagesServices()
export default class MessagesController {

    async create (req,res) {
        try {
            const { receiver, conversation, content } = req.body
            const sender = req.user._id
            
            if(!sender){
                return res.status(403).send({message: `Forbidden`})
            }

            if( !receiver || !content ){
                return res.status(400).send({message: 'Missing fields'})
            }

            await messagesService.create({sender, ...req.body})

            res.send({status: 'Success', message: 'Message created succesfully'})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }

            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async toggleSeen (req, res) {
        try {
            const { messageId } = req.body

            if( !messageId ){
                return res.status(400).send({message: 'Missing fields'})
            }

            await messagesService.toggleSeen(messageId)

            res.send({status: 'Success', message: 'Message seen'})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async deleteMessage (req, res) {
        try {
            const { messageId } = req.body

            if( !messageId ){
                return res.status(400).send({message: 'Missing fields'})
            }

            await messagesService.deleteMessage(messageId)

            res.send({status: 'Success', message: 'Message deleted'})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
    
}
