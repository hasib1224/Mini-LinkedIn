const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config()
const notificationPORT = process.env.NOTIFICATION_PORT

const createNotification = async (postId) => {
    try {
        // console.log("email: " + email)
        console.log("postId: " + postId)
        const response = await axios.post(`http://host.docker.internal/notification/createNotification/${postId}`);
        return response
    } catch (error) {
        throw error;
    }
};

// Usage
module.exports = createNotification
