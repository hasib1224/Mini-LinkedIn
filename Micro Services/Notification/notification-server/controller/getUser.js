const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config()
const userPort = process.env.USER_PORT

const getUser = async (email) => {
    try {
        // console.log("email: " + email)
        const response = await axios.get(`http://host.docker.internal/user/fetchUserInfo/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Usage
module.exports = getUser
