import conversationModel from '../models/conversations.model.js'

export default class ConversationsDAO {

    getConverMessages = async (converId) => {
        const result = await conversationModel.findOne({_id: converId}, 'messages').lean()
        return result
    }

    getById = async (converId) => {
        const result = await conversationModel.findOne({_id: converId}).lean()
        return result
    }

    isInConver = async (converId, userId) => {
        const query = await conversationModel.findOne({_id: converId})
        const result = query.users.includes(userId)
        return result
    }

    create = async (conver) => {
        const result = await conversationModel.create(conver)
        return result
    }

    addUserToConver = async (converId, userId) => {
        const result = await conversationModel.findOneAndUpdate({_id: converId}, {$push: { users:userId }})
        return result
    }

    addMsgToConver = async (converId, messageId) => {
        const result = await conversationModel.findOneAndUpdate({_id: converId}, {$push: {messages: messageId}})
        return result
    }

    changeName = async (converId, name) => {
        const result = await conversationModel.findOneAndUpdate({_id: converId}, {conversation_name: name})
        return result 
    }
    changeState = async (converId, state) => {
        const result = await conversationModel.findOneAndUpdate({_id: converId}, {state: state})
        return result
    }
    deleteConver = async (converId) => {
        const result = await conversationModel.findOneAndDelete({_id: converId})
        return result
    }

}