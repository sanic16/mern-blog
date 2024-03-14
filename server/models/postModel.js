const {Schema, model} = require('mongoose')
const categories =[
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather"
]

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: categories,
        message: "VALUE is not supported",
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
}, {
  timestamps: true  
})

const Post = model('Post', postSchema)

module.exports = {
    Post,
    categories
}