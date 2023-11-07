let Post = require('../models/posts.model');

const router = require('express').Router();
const checkLogin = require('../middlewares/checkLogin');
const createPost = require('../controller/post-controller/createPost');
const {getPost} = require('../controller/post-controller/getPost');
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
// router.get('/uploadPhoto', checkLogin, uploadPhoto)


module.exports = router