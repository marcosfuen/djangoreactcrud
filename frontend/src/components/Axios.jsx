import axios from 'axios';


const baseUrl = 'http://10.0.0.77:8000/'
const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    withCredentials: false,
    xsrfCookieName: 'csrftoken', // For CSRF protection
    xsrfHeaderName: 'X-CSRFToken', // For CSRF protection
    headers: {
        // "Access-Control-Allow-Origin" : "*",
        // "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
        accept: "application/json",
    }
    
})

export default AxiosInstance