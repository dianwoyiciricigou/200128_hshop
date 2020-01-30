// 接口请求函数
import {request} from './request'


// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (geohash) => request({
    baseConfig:{
        url:`/position/${geohash}`
    },
    success:function(res){
        return res
    },
    failure:function(err){
        console.log(err)
    }
})

// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqFoodTypes = () => request({
    baseConfig:{
        url:`/index_category`
    },
    success:function(res){
        return res
    },
    failure:function(err){
        console.log(err)
    }

})

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = (longitude,latitude) => request({
    url:`/shops`,
    params:{
        longitude,latitude
    }
})

// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqSearchShops = (geohash,keyword) => request({
    url:`/search_shops`,
    params:{
        geohash,keyword
    }
})

// [5、获取一次性验证码](#5获取一次性验证码)<br/>
export const reqCaptcha = () => request({
    url:`/captcha`
})

// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqPwd = (name,pwd,captcha) => request({
    url:`/captcha`,
    methods:'post',
    params:{
        name,
        pwd,
        captcha
    }
})
// [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqMessage = (phone) => request({
    url:`/sendcode`,
    params:{phone}
})
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqPhone = (phone,code) => request({
    url:`/captcha`,
    methods:'post',
    params:{
        phone,
        code
    }
})
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUserinfo = () => request({
    url:`/userinfo`
})
// [10、用户登出](#10用户登出)<br/>
export const reqLogout = () => request({
    url:`/logout`
})


