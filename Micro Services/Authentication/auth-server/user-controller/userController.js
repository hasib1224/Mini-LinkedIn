const { response } = require('express')
let User = require('../model/user-model')
let Token = require('../model/token')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
// const checkLogin = require('../middlewares/checkLogin')

dotenv.config()

const signupUser = async (req, res) => {
    // res.send("sign up page")
    const userInfo = req.body.userInfo

    const username = userInfo.username
    const email = userInfo.email
    console.log("userinfo : ", userInfo)

    const password = await bcrypt.hash(userInfo.signUpPass,10)
    
    console.log("password:",password)
    const newUser = new User({ username, email, password });

    await newUser.save()
        .then(() => res.json("user added"))
        .catch((err) => {
            console.error("Error inserting user into the database:", err);
            res.status(500).json("Internal server error");
    });

}

const loginUser = async (req, res) => {
    const userInfo = req.body.loginInfo
    console.log(userInfo)
    let user =await User.findOne({email:userInfo.email})
    // console.log("user : ", user)
    console.log("password : ", userInfo.signInPass)

    if (!user) {
        console.log("user not found")
        return res.status(400).json("username does not match")
    }
    try {
        console.log("decrypt password")
        console.log(user.password)
        let match = await bcrypt.compare(userInfo.signInPass, user.password)
        console.log("match : ",match)
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY)
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_KEY)

            const newToken = new Token({token:refreshToken})

            console.log("token created")
            await newToken.save()
            .catch((err)=>{
                console.log("error while saving token : ", err)
            })
            console.log("token inserted")

            return res.status(200).json({ accessToken: accessToken, username: user.username })
            // return res.status(200).json({"msg": "logged in successfully"});
        }
        else {
            return res.status(400).json("password does not match")
        }
    }
    catch (err) {
        console.log("err :", err)
        return res.status(500).json({ msg: "error while logging in" })
    }
}


module.exports = {
    signupUser,
    loginUser,
};

