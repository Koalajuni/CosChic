
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.coschic.co/api/v1',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export default axiosInstance;
