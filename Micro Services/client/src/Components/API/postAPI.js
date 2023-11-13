import axios from "axios";

const postAPI  = axios.create({
    baseURL : `http://localhost/posts`,
    headers: {
        'Content-Type': 'application/json',
      },
})

export default postAPI