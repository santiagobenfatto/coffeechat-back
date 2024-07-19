import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const conversationCollection = 'conversations'

const conversationSchema = new Schema ({
    conversation_name: {
        type: String,
        default: ''
    },
    users: [ 
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'messages'
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    state: {
        type: String,
        enum: ['active','deleted'],
        default: 'active'
    }

})

// conversationSchema.pre('find', function(next){
//     this.populate('users messages')
//     next()
// })

// conversationSchema.pre('findOne', function(next){
//     this.populate('users')
//     next()
// })


conversationSchema.pre('findOne', function(next){
    this.populate('messages', '-_id')
    next()
})

conversationSchema.plugin(mongoosePaginate)

const conversationModel = model(conversationCollection,conversationSchema)

export default conversationModel