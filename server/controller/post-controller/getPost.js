let Post = require('../../models/posts.model');
let User = require('../../models/user.model')
const minioClient = require('../../minio/minioConfig')

const getImageFromMinio = (imageId) => {
    return new Promise((resolve, reject) => {
        minioClient.getObject('linkedin', imageId, (err, dataStream) => {
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
        console.log(posts)
        const postsWithUsername = await Promise.all(
            posts.map(async (post) => {
                const user = await User.findOne({ email: post.email });
                // const imageBuffer = post.imageId ? await getImageFromMinio(post.imageId) : null;
                // const base64String = imageBuffer ? imageBuffer.toString('base64') : null;
                // const mimeType = 'image/jpeg';
                // const image = base64String ? `data:${mimeType};base64,${base64String}` : null;
                // console.log("image: " + image);
                // console.log('username: ' + user.username)
                return { 
                    ...post.toObject(), 
                    username: user ? user.username : 'Unknown',
                    // image:image
                };
            })
        );
        console.log("post with username : " + postsWithUsername)
        res.json(postsWithUsername);
    }
    catch(err){
        console.error("Error fetching posts:", err);
        res.status(500).json("couldn't load post")
    }
}

module.exports = {getPost, getImageFromMinio}