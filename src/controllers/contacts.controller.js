import { UserNotFound } from '../errors/error-exceptions.js'
import ContactsListService from '../services/contactsList.service.js'

const contactsListService = new ContactsListService()

export default class ContactsController {
    
    async getContacts (req, res) {
        try {
            const userId = req.user._id 

            if(!userId){
                return res.status(403).send({message: 'Forbidden'})
            }

            const contacts = await contactsListService.getContacts(userId)

            res.send({status:'Success', contacts})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message}) 
        }
    }
    
    async getRequests (req, res) {
        try {
            const userId = req.user._id 

            if(!userId){
                return res.status(403).send({message: 'Forbidden'})
            }

            const requests = await contactsListService.getRequests(userId)

            res.send({status:'Success', requests})
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async addContact (req, res) {
        try {
            const { contactId } = req.body
            const userId = req.user._id
            
            if(!contactId){
                return res.status(404).send({message: 'Missing fields'})
            }
            
            if(!userId){
                return res.status(403).send({message: 'Forbidden'})
            }

            await contactsListService.addContact(userId, contactId)

            res.send({status: 'Success', message:'User added to contacts'})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async sendRequest (req, res) {
        try {
            const { contactId } = req.body
            const userId = req.user._id

            if( !userId || !contactId){
                return res.status(404).send({message: 'Missing fields'})
            }

            if(!userId){
                return res.status(403).send({message: 'Forbidden'})
            }

            const request = await contactsListService.sendRequest(userId, contactId)

            res.send({status: 'Success', message:'Request sent', request})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
    
    async acceptContact (req, res) {
        try {
            const { contactId } = req.body
            const userId = req.user._id
        
            if(!contactId){
                return res.status(404).send({message: 'Misising fields'})
            }

            if(!userId){
                return res.status(403).send({message: 'Forbidden'})
            }

            await contactsListService.acceptContact(userId, contactId)
            
            res.send({ status: 'Success', message: 'contact accepted' })

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }


    }

    async deleteContact(req, res) {
        try {
            const { contactId } = req.body
            const userId = req.user._id

            if(!contactId){
                return res.status(404).send({message: 'Missing fields'})
            }

            if(!userId){
                return res.status(403).send({message: 'Forbidden'})
            }

            await contactsListService.deleteContact(userId, contactId)

            res.send({status: 'Success', message:'User delted from contacts'})


        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

}