import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const messageCollection = 'messages'

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        unique: false
    },
    receivers: [ 
        {
            type: Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    conversation: {
            type: Schema.Types.ObjectId,
            ref: 'conversations'
    },
    content: {
        type: String,
        
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String,
        enum: ['seen', 'unseen', 'deleted'],
        default: 'unseen'
    }

})


messageSchema.pre('find', function(next){
    this.populate('sender', '-_id first_name nickname')
        .populate('receivers', '-_id first_name nickname')
        .populate('conversation', '_id')
    next()
})


messageSchema.pre('findOne', function(next){
    this.populate('receiver')
    next()
})

messageSchema.plugin(mongoosePaginate)

const messageModel = model(messageCollection, messageSchema)

export default messageModel