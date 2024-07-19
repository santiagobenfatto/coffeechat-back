import contactsListModel from '../models/contactsList.model.js'

export default class ContactsDAO {
    getContacts = async (userId) => {
        const query = await contactsListModel.findOne({owner_id: userId}).lean()
        const result = query.contacts.filter(contact => {
            if(contact.state === 'accepted'){
                let obj = {
                    user: contact.user,
                    state: contact.state
                }
                return obj
            }
        })
        return result
    }

    // getContact = async (userList, contactId) => {
    //     const result = await contactsListModel.findOne({_id: userList}, {'contacts.users': contactId}).lean()
    //     return result
    // }

    isContact = async (userId, contactId) => {
        const result = await contactsListModel.findOne({owner_id: userId, 'contacts.user': contactId}).lean()
        return result
    }

    getRequests = async (userId) => {
        const query = await contactsListModel.findOne({owner_id: userId}).lean()
        const result = query.contacts.filter(contact => {
            if(contact.state === 'pending'){
                let obj = {
                    user: contact.user,
                    state: contact.state
                }
                return obj
            }
        })
        return result
    }
    

    createList = async (userId) => {
        const result = await contactsListModel.create({owner_id: userId})
        return result
    }

    addContact = async (userId, receptorId) => {
        const result = await contactsListModel.findOneAndUpdate({owner_id: userId}, { $push: {contacts: {user: receptorId}}})
        return result
    }

    // sendRequest = async (receptorId, userId) => {
    //     const result = await contactsListModel.findOneAndUpdate({owner_id: receptorId}, {$push: {contacts: {user: userId}}})
    //     return result
    // }

    acceptContact = async (userId, contactId) => {
        const result = await contactsListModel.findOneAndUpdate({owner_id: userId, 'contacts.user': contactId}, { $set: { 'contacts.$.state': 'accepted' } })
        return result
    }


    deleteContact = async (userList, contactId) => {
        const result = await contactsListModel.findOneAndUpdate({_id: userList, 'contacts.user': contactId}, {$pull: { contacts: { user: contactId }}})
        return result
    }
    
}