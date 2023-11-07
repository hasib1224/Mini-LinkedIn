const checkLogin = require('../middlewares/checkLogin');
const getNotifications = require('../controller/notification-controller/getNotifications')
const setNotificationStatus = require('../controller/notification-controller/setNotificationStatus')
const getNotifiedPost = require('../controller/notification-controller/getNotifiedPost')

const router = require('express').Router();



router.get('/getNotifications',checkLogin,getNotifications)
router.post('/setNotificationStatus',checkLogin,setNotificationStatus)
router.get('/getNotifiedPost',checkLogin,getNotifiedPost)



module.exports = router;