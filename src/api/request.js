// 请求函数模块
import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL:'http://',
        timeout:1000
    })

    instance(config.baseConfig)
    .then(res => {
        config.success(res)
    })
    .catch(err => {
        config.failure(err)
    })
}