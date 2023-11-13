const mongoose  = require('mongoose');

const Schema = mongoose.Schema

const postSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    imageId : {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;