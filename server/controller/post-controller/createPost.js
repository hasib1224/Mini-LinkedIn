let Post = require('../../models/posts.model');
const minioClient =  require('../../minio/minioConfig')
const createNotification = require('../../controller/notification-controller/createNotification')

async function uploadToMinio(file) {
    const bucketName = "linkedin";
    console.log('checking filenname: ', file.filename);
    // const objectKey = Date.now() + ' ' + file.originalname;
    const objectKey = file.filename;
    const metaData = {
        'Content-Type': file.mimetype,
    }


    await minioClient.fPutObject(bucketName, objectKey, file.path, metaData, (err, etag) => {
        if (err) {
            console.log(err);
            return null;
        }
    }); //bucketName, objectKey

    console.log("object key: " + objectKey)

    return objectKey;
}

const createPost = async(req, res) =>{
    console.log(req.body);
    const content = req.body.content;
    const image = req.file;
    const username = req.username;
    const email = req.email
    console.log("userId : " + req.userId);
    console.log("contents : " + content);
    console.log("image :" + image)
    // console.log("image info : " + req.file.filename)

    try{
        let imageId = null;
        let _imageId = null;

        if (req.file) {
            console.log("here")
            _imageId = await uploadToMinio(req.file);
        }
        imageId = _imageId ? _imageId : null;
        console.log("image id : " + imageId)

        const newPost = new Post({email,content,imageId})

        await newPost.save()
        await createNotification(newPost._id)
        .then(()=>res.status(200).json({msg: "post created successfully"}))
        .catch((err) => {
            res.status(400).json({msg: "error creating post"})
        })
    } catch(err) {
        res.status(400).json({msg: "error creating post 2"})
    }

    
}

module.exports = createPost