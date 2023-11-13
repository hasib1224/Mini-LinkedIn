let Notification = require('../model/notification-model')
let User = require('../model/user-model')
let Post = require('../model/post-model')
const getUser = require('../controller/getUser')
const getPost = require('../controller/getPost')

const createNotification = async (req,res) => {
    try{  
        const postId = req.params.postId;
        const users = await getUser("null")
        const post = await getPost(postId)
        const postEmail = post.email

        users.map(async (user)=>{
            if(user.email !== postEmail){
                const newNotification = new Notification({postId : postId, receiverId : user._id})
                await newNotification.save()
            }
        })
        res.send("notification created successfully")
    }
    catch(err){
        console.error("error creating notification :" + err)
        return err
    }

  
}

module.exports = createNotification