const express = require('express');
const router = express.Router();
let User = require('../model/user-model')


const fetchUserInfo = async (req, res) => {
    try {
        let user;
        console.log('Fetching user for email: ', req.params.email)
        if(req.params.email === "null"){
            user = await User.find()
        }
        else{
            user = await User.findOne({ email: req.params.email });
        }
        if (user) {
            console.log('user: ', user)
            res.json(user);
        } else {
            res.status(404).json({ message: 'Users not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = fetchUserInfo;