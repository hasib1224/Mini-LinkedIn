let Post = require('../model/post-model');

const router = require('express').Router();
const checkLogin = require('../middlewares/checkLogin');
const createPost = require('../controller/createPost');
const {getPost} = require('../controller/getPost');
const sendPost = require('../controller/sendPost')
const path = require('path')
const multer = require('multer');


const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        console.log(file)
        // console.log("original name : ", file.originalname)
        cb(null, './public/images')
    },
    filename :(req,file, cb) => {
        const newFilename = Date.now() + path.extname(file.originalname);
        // console.log('filename : ', newFilename)
        cb(null, newFilename)
    },
   
})

const upload = multer({storage: storage})



router.post('/createPost', checkLogin,upload.single('image'),createPost)
router.get('/getPost',checkLogin, getPost)

// router.post('/createPost',checkLogin, createPost)
router.get('/getPost', getPost)
router.get('/sendPost/:postId', sendPost)


module.exports = router