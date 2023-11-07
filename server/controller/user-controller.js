const { response } = require('express')
let User = require('../models/user.model')
let Token = require('../models/token')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const checkLogin = require('../middlewares/checkLogin')

dotenv.config()

const signupUser = async (req, res) => {
    const userInfo = req.body.userInfo

    const username = userInfo.username
    const email = userInfo.email
    const password = await bcrypt.hash(userInfo.signUpPass, 10)

    console.log("userinfo : ", userInfo)

    const newUser = new User({ username, email, password });

    await newUser.save()
        .then(() => res.json("user added"))
        .catch((err) => res.status(400).json("cannot insert into db : " + err))

}

const loginUser = async (req, res) => {
    const userInfo = req.body.loginInfo
    let user =await User.findOne({email:userInfo.email})
    // console.log("usernames : ", userInfo.username)
    console.log("user : ", user)

    if (!user) {
        return res.status(400).json("username does not match")
    }

    try {
        let match = await bcrypt.compare(userInfo.signInPass, user.password)
        console.log("match : ",match)
        if (match) {
            console.log("access key:", process.env.ACCESS_SECRET_KEY)
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY)
            console.log("access token:", accessToken)
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_KEY)

            const newToken = new Token({token:accessToken})

            console.log("token created")
            await newToken.save()
            .catch((err)=>{
                console.log("error while saving token : ", err)
            })
            console.log("token inserted")

            return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, username: user.username })
        }
        else {
            return res.status(400).json("password does not match")
        }
    }
    catch (err) {
        return res.status(500).json({ msg: "error while logging in" })
    }
}


module.exports = {
    signupUser,
    loginUser,
};

