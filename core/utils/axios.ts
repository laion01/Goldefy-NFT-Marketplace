import axios from 'axios';
import { ProcessEnv } from '../../constants';

const onOk = (response) => {
    return response.data
}

const onError = (err) => {
    console.log('err' + err) // for debug
    return Promise.reject(err)
}

const Axios = axios.create({
    baseURL: ProcessEnv.API,
    timeout: 10000
}) as any;

Axios.interceptors.response.use(onOk, onError);
Axios.interceptors.request.use((request) => {
    const token = localStorage.getItem('token');
    if(token)   
        request.headers['Authorization'] = `Bearer ${token}`;
    return request;
})

export default Axios;
