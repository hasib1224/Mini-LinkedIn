let Notification = require('../model/notification-model')

const setNotificationStatus = async(req, res) => {
    const notification = req.body
    const postId = notification.postId
    const receiverId = notification.receiverId
    try{    
        await Notification.deleteMany({ $and: [{ postId: postId }, { receiverId: receiverId }] });

        return res.status(200).json({ message: 'Notification status updated successfully' });
    }
    catch(err){
        console.log("Error updating notification : ", err)
    }

}

module.exports = setNotificationStatus