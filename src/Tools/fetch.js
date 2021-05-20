import axios from 'axios';

const API_URL_Instance =
    axios.create({
        baseURL: 'http://aedalat.ir/'
    });


const API_Auth_Token = {
    ...API_URL_Instance,
    post:(url,data) => {
        return API_URL_Instance.post(url,data,{
        headers:{
            Authorization: "Bearer: " + window.localStorage.getItem('token')
        }});
    }    
}

export default API_Auth_Token;
