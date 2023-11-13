let Notification = require('../model/notification-model')
let User = require('../model/user-model')
let Post = require('../model/post-model')
const getUser = require('./getUser')
const getPost = require('./getPost')
const getImageFromMinio = require('../controller/getImage')

const getNotifiedPost  = async(req,res) => {
    const notification = req.query
    const postId = notification.postId
   

    try{
        const post = await getPost(postId)
        const user = await getUser(post.email)
        const imageBuffer = post.imageId ? await getImageFromMinio(post.imageId) : null;
        const base64String = imageBuffer ? imageBuffer.toString('base64') : null;
        const mimeType = 'image/jpeg';
        const image = base64String ? `data:${mimeType};base64,${base64String}` : null;

        const postWithImage = {
            ...post,
            username :user.username,
            image: image
        };


        res.status(200).json(postWithImage)
    }
    catch(err){
        res.json({message: "error getting post",err})    
        console.error("Error getting post : " + err)
    }
}

module.exports = getNotifiedPost