const router = require('express').Router()
const getUserProfile = require('../controller/getUserProfile')
const checkLogin = require('../middlewares/checkLogin')

let User = require('../models/user.model')

router.route('/').get((req,res)=>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error : " +err))
})

router.route('/add').post(async(req,res)=>{
    const userInfo = req.body.userInfo

    const username = userInfo.username
    const email = userInfo.email
    const password = userInfo.signUpPass

    console.log("userinfo : ", userInfo)

    const newUser = new User({username, email,password});

    await newUser.save()
    .then(()=> res.json("user added"))
    .catch((err)=> res.status(400).json("cannot insert into db : "+ err ))
})

router.get('/getUserProfile',checkLogin, getUserProfile)


module.exports = router
