import messageModel from '../models/messages.model.js'


export default class messagesDAO {      
    create = async (message) => {
        const result = await messageModel.create(message)
        return result
    }

    addConverToMessage = async (messageId, converId) => {
        const result = await messageModel.findOneAndUpdate({_id: messageId}, {conversation: converId})
        return result
    }

    toggleSeen = async (messageId) => {
        const result = await messageModel.findByIdAndUpdate({_id: messageId}, {state: 'seen'})
        return result
    }

    deleteMessage = async (messageId) => {
        const result = await messageModel.findByIdAndUpdate({_id: messageId}, {state: 'deleted'})
        return result
    }
}