
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://211.216.177.2:18000/api/v1',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export default axiosInstance;
