import { ElementNotFound, UserNotFound } from '../errors/error-exceptions.js'
//import ConversationsService from '../services/conversations.service.js'
import { conversationsService } from '../services/index.js'
//const conversationsService = new ConversationsService()

export default class ConversationsController {
    

    async getConver(req, res) {
        try {
            const { converId } = req.body
                        
            if(!converId) {
                return res.status(404).send({message: `Incomplete values`})
            }
            
            const conver = await conversationsService.getConver(converId)

            res.send({status: 'Success', conver: conver})
            
        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message:error.message})
            }
        }
    }

    async getConverMessages (req, res) {
        try {
            const { converId } = req.body

            if(!converId) {
                return res.status(404).send({message: `Incomplete values`})
            }

            const conver = await conversationsService.getConverMessages(converId)

            res.send({status: 'Success', conver: conver})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message:error.message})
            }
        }
    }

    // async createConver(req, res) {
    //     try {
    //         const { users, messages, created_by } = req.body

    //         if( !users || !messages || created_by){
    //             res.status(400).send({message: 'Missing fields'})
    //         }

    //         const conver = await conversationsService.createConver({...req.body})

    //         res.send({status: 'Success', conver})

    //     } catch (error) {
    //         if(error instanceof ElementNotFound){
    //             return res.status(404).send({message: error.message})
    //         }
    //         res.status(500).send({message: error.message})
    //     }
    // }

    async addUserToConver(req, res) {
        try {
            const { invitedId, converId } = req.body
            
            
            if( !converId || !invitedId ){
                return res.status(400).send({message: 'Missing fields'})
            }

            await conversationsService.addUserToConver(converId, invitedId)
            
            res.send({status: 'Success', message: 'The user has been added'})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeName(req, res) {
        try {
            const { userId, name } = req.body
            
            if( !userId || !name ){
                return res.status(400).send({message: 'Missing fields'})
            }
            
            await conversationsService.changeName(userId, name)
            
            res.send({status: 'Success', message: 'Name changed'})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeState(req, res) {
        try {
            const { userId, state } = req.body
            
            if( !userId || !state ){
                res.status(400).send({message: 'Missing fields'})
            }

            await conversationsService.changeState(userId, state)

            res.send({status: 'Success', message: 'State changed'})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
    
    async deleteConver(req, res) {
        try {
            const { converId } = req.body

            if( !converId ){
                return res.status(400).send({message: 'Missing fields'})
            }

            await conversationsService.deleteConver(converId)

            res.send({status: 'Success', message: 'Conver deleted'})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
    
}
