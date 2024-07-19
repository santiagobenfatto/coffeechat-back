import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'users'

const userSchema = new Schema({
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    nickname: {
        type: String,
        default: ''
    },
    email_register: {
        type: String,
        required: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        index: true,
        unique: true
    },
    avatar_url: {
        type: String,
        default: '/img/avatar_image'
    },
    created_at:{
        type: Date,
        date: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    state: {
        type: String,
        enum: ['active', 'disactive'],
        default: 'active'
    },
    visibility: {
        type: String,
        enum: ['private', 'public', 'restricted', 'disabled']
    },
    conversations: [
        { 
            conversation:
            {
                type: Schema.Types.ObjectId,
                ref: 'conversations'
            },
            _id: false
        }
    ],
    contact_list: {
            type: Schema.Types.ObjectId,
            ref:'contactsList'
    }
})


userSchema.plugin(mongoosePaginate)


export const userModel = model(userCollection, userSchema)


