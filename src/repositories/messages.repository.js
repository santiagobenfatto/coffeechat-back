import GenericRepository from './generic.repository.js'

export default class MessagesRepository extends GenericRepository {
    constructor(dao){
        super(dao)
        this.dao = dao
    }

    async addConverToMessage (messageId, converId) {
        const result = await this.dao.addConverToMessage(messageId, converId)
        return result
    }

    async toggleSeen (messageId) {
        const result = await this.dao.toggleSeen(messageId)
        return result
    }

    async deleteMessage(messageId) {
        const result = await this.dao.deleteMessage(messageId)
        return result
    }
}