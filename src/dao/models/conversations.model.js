import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const conversationCollection = 'conversations'

const conversationSchema = new Schema ({
    name: {
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


conversationSchema.pre('findOne', function(next){
    this.populate({
        path: 'messages',
        select: '-_id',
        options: {sort: {created_at: 1}}
    })
    next()
})

conversationSchema.plugin(mongoosePaginate)

const conversationModel = model(conversationCollection,conversationSchema)

export default conversationModel