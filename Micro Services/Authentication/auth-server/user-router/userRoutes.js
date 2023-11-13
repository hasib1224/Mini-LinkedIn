const express = require('express')

const { signupUser, loginUser } = require('../user-controller/userController');
const fetchUserInfo = require('../user-controller/fetchUserInfo.js')
const getUserProfile = require('../user-controller/getUserProfile')
const checkLogin = require('../middlewares/checkLogin')
const router = express.Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.get('/getUserProfile',checkLogin, getUserProfile)
router.get('/fetchUserInfo/:email', fetchUserInfo)

module.exports = router