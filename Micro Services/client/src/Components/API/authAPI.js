import axios from "axios";

const authAPI  = axios.create({
    baseURL : `http://localhost/user`,
    headers: {
        'Content-Type': 'application/json',
      },
})

export default authAPI
