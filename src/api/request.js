// 请求函数模块
import axios from 'axios'
const baseURL = '/api'

export async function request(config) {
    let hello;
    const instance = axios.create({
        baseURL:baseURL,
        timeout:5000
    })

    await instance(config.baseConfig)
    .then(res => {
        hello = config.success(res);
    })
    .catch(err => {
        config.failure(err)
    })
    return  hello.data;
    
}