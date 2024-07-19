import GenericRepository from './generic.repository.js'

export default class ContactsListRepository extends GenericRepository {
    constructor(dao){
        super(dao)
        this.dao = dao
    }

    async getContacts (userId) {
        const result = await this.dao.getContacts(userId)
        return result
    }

    async isContact (userList, contactId) {
        const result = await this.dao.isContact(userList, contactId)
        return result
    }

    async getRequests (userId) {
        const result = await this.dao.getRequests(userId)
        return result
    }

    async createList (userId) {
        const result = await this.dao.createList(userId)
        return result
    }

    async addContact(userList, contactId) {
        const result = await this.dao.addContact(userList, contactId)
        return result
    }
    
    async sendRequest (userId, receptorList) {
        const result = await this.dao.sendRequest(userId, receptorList)
        return result
    }

    async acceptContact(userId, contactId) {
        const result = await this.dao.acceptContact(userId, contactId)
        return result
    }

    async deleteContact(userList, contactId) {
        const result = await this.dao.deleteContact(userList, contactId)
        return result
    }
}