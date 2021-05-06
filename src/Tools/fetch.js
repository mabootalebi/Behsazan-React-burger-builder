import axios from 'axios';

const API_URL_Instance =
    axios.create({
        baseURL: 'http://aedalat.ir/'
    });

export default API_URL_Instance;
