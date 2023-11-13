const express = require('express');
const router = express.Router();
let User = require('../model/user-model')
let Post = require('../model/post-model')


const sendPost = async (req, res) => {
    try {
        let user;
        console.log('Fetching post for postId: ', req.params.postId)
        post = await Post.findOne({ _id: req.params.postId})
        
        if (post) {
            console.log('post: ', post)
            res.json(post);
        } else {
            console.log('No post found')
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = sendPost;