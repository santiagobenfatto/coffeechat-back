import GenericRepository from './generic.repository.js'

export default class UsersRepository extends GenericRepository {
    constructor(dao){
        super(dao)
        this.dao = dao
    }

    async getUserByEmailRegister (email) {
        const result = await this.dao.getUserByEmailRegister(email)
        return result
    }

    async createContact (userId, contactId) {
        const result = await this.dao.addContact(userId, contactId)
        return result
    }

    
    async addConverToUser (userId, converId) {
        const result = await this.dao.addConver(userId, converId)
        return result
    }
    
    async addContactList (userId, contactList) {
        const result = await this.dao.addContactList(userId, contactList)
        return result
    }

    async getConvers (userId) {
        const result = await this.dao.getConvers(userId)
        return result
    }
    
    async changeNickName (userId, nickName) {
        const result = await this.dao.changeNickName(userId, nickName)
        return result
    }

    async changeFirstName (userId, firstName) {
        const result = await this.dao.changeFirstName(userId, firstName)
        return result
    }

    async changeLastName (userId, lastName) {
        const result = await this.dao.changeLastName(userId, lastName)
        return result
    }

    async changeEmailRegister (userId, emailRegister) {
        const result = await this.dao.changeEmailRegister(userId, emailRegister)

        return result
    }

    async changeEmailSecondary (userId, emailSecondary) {
        const result = await this.dao.changeEmailSecondary(userId, emailSecondary)
        return result
    }

    async changeVisibility (userId, visibility) {
        const result = await this.dao.changeVisibility(userId, visibility)
        return result
    }

    async changeAvatar (userId, newAvatar) {
        const result =  await this.dao.changeAvatar(userId, newAvatar)
        return result
    }
    async changeAvatar (userId) {
        const result = await this.dao.deleteUser(userId)
        return result
    }
}