const checkLogin = require('../middlewares/checkLogin');
const getNotifications = require('../controller/getNotifications')
const setNotificationStatus = require('../controller/setNotificationStatus')
const getNotifiedPost = require('../controller/getNotifiedPost')
const createNotification = require('../controller/createNotification')

const router = require('express').Router();


router.post('/createNotification/:postId',createNotification);
router.get('/getNotifications',checkLogin,getNotifications)
router.post('/setNotificationStatus',checkLogin,setNotificationStatus)
router.get('/getNotifiedPost',checkLogin,getNotifiedPost)



module.exports = router;