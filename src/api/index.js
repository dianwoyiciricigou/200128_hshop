// 接口请求函数
import {request,ajax} from './request'


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
    baseConfig:{
        url:`/shops`,
        params:{
            longitude,latitude
        }
    },
    success:res=>res,
    failure:err=>err
})

// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqSearchShops = (geohash,keyword) => request({
    
    baseConfig:{
        url:`/search_shops`,
        params:{
            geohash,keyword
        }
    },
    success:res=>res,
    failure:err=>err
})


// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqPwd = (name,pwd,captcha) => request({
    
    baseConfig:{
        url:`/login_pwd`,
        method:'POST',
        params:{
            name,
            pwd,
            captcha
        },
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    },
    success:res=>res,
    failure:err=>err
})
// [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqMessage = (phone) => request({
    
    baseConfig:{
        url:`/sendcode`,
        params:{phone}
    },
    success:res=>res,
    failure:err=>err
})
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqPhone = (phone,code) => request({
    
    baseConfig:{
        url:`/login_sms`,
        method:'POST',
        params:{
            phone,
            code
        }
    },
    success:res=>res,
    failure:err=>err
})
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUserinfo = () => request({
    
    baseConfig:{
        url:`/userinfo`
    },
    success:res=>res,
    failure:err=>err
})
// [10、用户登出](#10用户登出)<br/>
export const reqLogout = () => request({
    
    baseConfig:{
        url:`/logout`
    },
    success:res=>res,
    failure:err=>err
})

//获取商家信息
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')


