let Post = require('../model/post-model');
let User = require('../model/user-model')
const minioClient = require('../minio/minioConfig');
const { response } = require('express');
const { post } = require('../routes/postRoutes');
const getUser = require('../controller/getUser')

const getImageFromMinio = (imageId) => {
    return new Promise((resolve, reject) => {
        minioClient.getObject('linkedin-post', imageId, (err, dataStream) => {
            if (err) {
                // Handle any error when fetching the image from MinIO
                reject(err);
            } else {
                const chunks = [];
                dataStream.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                dataStream.on('end', () => {
                    // Concatenate the binary chunks and resolve with the image data
                    const imageData = Buffer.concat(chunks);
                    resolve(imageData);
                });

                dataStream.on('error', (err) => {
                    reject(err);
                });
            }
        });
    });
};


const getPost = async(req, res) =>{
    try{
        // const post = await Post.find()
        // res.json(post)

        ///////////////////////
        const posts = await Post.find();
        posts.reverse();
        // console.log(posts)
        const postsWithUsername = await Promise.all(
            posts.map(async (post) => {
                // const user = await User.findOne({ email: post.email });
                console.log("fetching user : ", post.email)
                const user = await getUser(post.email);
                console.log("user : ", user)

                const imageBuffer = post.imageId ? await getImageFromMinio(post.imageId) : null;
                const base64String = imageBuffer ? imageBuffer.toString('base64') : null;
                const mimeType = 'image/jpeg';
                const image = base64String ? `data:${mimeType};base64,${base64String}` : null;
               
                return { 
                    ...post.toObject(), 
                    username: user ? user.username : 'Unknown',
                    // image:image
                };
            })
        );
        // console.log("post with username : " + postsWithUsername)
        res.json(postsWithUsername);
        // res.send(posts)
    }
    catch(err){
        console.error("Error fetching posts:", err);
        res.status(500).json("couldn't load post")
    }
}

module.exports = {getPost, getImageFromMinio}