let Notification = require('../../models/notification.model')
let Post = require('../../models/posts.model')
let User = require('../../models/user.model')
const {getImageFromMinio} = require('../../controller/post-controller/getPost')

const getNotifiedPost  = async(req,res) => {
    const notification = req.query
    console.log("notification : ", notification)
    const postId = notification.postId
   

    try{
        const post = await Post.findById(postId)
        const user = await User.findOne({email: post.email})
        console.log(post)
        const imageBuffer = post.imageId ? await getImageFromMinio(post.imageId) : null;
        const base64String = imageBuffer ? imageBuffer.toString('base64') : null;
        const mimeType = 'image/jpeg';
        const image = base64String ? `data:${mimeType};base64,${base64String}` : null;

        const postWithImage = {
            ...post.toObject(),
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