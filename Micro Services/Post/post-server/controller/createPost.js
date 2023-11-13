let Post = require('../model/post-model');
const createNotification = require('../controller/createNotification')
const minioClient =  require('../minio/minioConfig')

async function uploadToMinio(file) {
    const bucketName = "linkedin-post";
    // console.log('checking filenname: ', file.filename);
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
    // const image = req.e;
    // const username = req.username;
    const email = req.email
    console.log("userId : " + req.userId);
    console.log("contents : " + content);
    console.log("email : " + req.email);
    // console.log("image :" + image)
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

        // const newPost = new Post({email,content})

        await newPost.save()
        const response = await createNotification(newPost._id)
        .then(()=>{
            res.status(200).json({msg: "post created successfully"})
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json({msg: "error creating post"})
        })
    } catch(err) {
        console.log("error 2 : ",  err);
        res.status(400).json({msg: "error creating post 2"})
    }

    
}

module.exports = createPost