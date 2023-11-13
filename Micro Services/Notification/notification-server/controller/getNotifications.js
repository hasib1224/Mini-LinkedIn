let Notification = require('../model/notification-model')
let User = require('../model/user-model')
let Post = require('../model/post-model')
const getPost = require('../controller/getPost')
const getUser = require('../controller/getUser')

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ receiverId: req.userId })
        notifications.reverse()

        const notificationsWithUsername = await Promise.all(
            notifications.map(async (notification) => {
               
                const post = await getPost(notification.postId);

                const userEmail = post.email
                const user = await getUser(userEmail)
                const userName = user.username
                
                return {
                    ...notification.toObject(),
                    username: userName,
                }
            
            })
        )
        res.json(notificationsWithUsername)
        // console.log(notificationsWithUsername)

    }
    catch (err) {
        console.error("error sending notification : ", err)
    }
}

module.exports = getNotifications