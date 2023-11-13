import { notification } from "antd";
import axios from "axios";

const notficationAPI  = axios.create({
    baseURL : `http://localhost/notification`,
    headers: {
        'Content-Type': 'application/json',
      },
})

export default notficationAPI