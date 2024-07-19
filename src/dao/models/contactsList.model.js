import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const contactsListCollection = 'contactsList'

const contactListSchema = new Schema({
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    contacts: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            state: {
                type: String,
                enum:['accepted', 'blocked', 'pending'],
                default: 'pending'
            },
            _id: false,
            
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
})

contactListSchema.pre('findOne', function(next){
    this.populate('contacts.user', 'first_name last_name nickname avatar_url')
    next()
})


contactListSchema.plugin(mongoosePaginate)


const contactsListModel= model(contactsListCollection, contactListSchema)

export default contactsListModel