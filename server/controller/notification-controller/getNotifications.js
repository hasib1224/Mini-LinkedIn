let Notification = require('../../models/notification.model')
let User = require('../../models/user.model')
let Post = require('../../models/posts.model')
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ receiverId: req.userId })
        console.log("notifications: ", notifications)
        notifications.reverse()

        const notificationsWithUsername = await Promise.all(
            notifications.map(async (notification) => {
               
                const post = await Post.findById(notification.postId);
                const userEmail = post.email
                const user = await User.findOne({ email: userEmail })
                const userName = user.username
                
                return {
                    ...notification.toObject(),
                    username: userName,
                }
            
            })
        )
        res.json(notificationsWithUsername)
        console.log(notificationsWithUsername)

    }
    catch (err) {
        console.error("error sending notification : ", err)
    }
}

module.exports = getNotifications