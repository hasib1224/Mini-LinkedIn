let Notification = require('../../models/notification.model')
let User = require('../../models/user.model')
let Post = require('../../models/posts.model')


const createNotification = async (postId) => {
    try{  
        const Users = await User.find()
        const post = await Post.findById(postId)
        const postEmail = post.email

        Users.map(async (user)=>{
            if(user.email !== postEmail){
                const newNotification = new Notification({postId : postId, receiverId : user._id})
                await newNotification.save()
            }
        })
    }
    catch(err){
        // console.error("error creating notification :" + err)
        return err
    }

  
}

module.exports = createNotification