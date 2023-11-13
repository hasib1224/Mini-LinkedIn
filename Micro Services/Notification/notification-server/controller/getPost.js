const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config()
const postPort = process.env.POST_PORT

const getPost = async (postId) => {
    try {
        console.log("postId: " + postId)
        const response = await axios.get(`http://host.docker.internal/posts/sendPost/${postId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Usage
module.exports = getPost
