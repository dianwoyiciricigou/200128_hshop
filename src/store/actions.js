import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS
} from './mutations-types'
import {
    reqAddress,
    reqFoodTypes,
    reqShops
} from '../api'

export default{
    //异步获取地址
    //这里的参是对象，通常就是context：store，包含了mutation，state。。。，然后结构赋值，就是state了
    async getAddress({commit,state}) {
        //发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude
        const res = await reqAddress(geohash);
        if(res.code === 0){
            const address = res.data
            //本来是context.commit，但是解构赋值，所以直接就commit
            commit(RECEIVE_ADDRESS,{address})
        }
        //提交一个mutation
    },


    //异步获取食品分类列表
    async getCategorys({commit}) {
        //发送异步ajax请求e
        const res = await reqFoodTypes();
        if(res.code === 0){
            const categorys = res.data
            //本来是context.commit，但是解构赋值，所以直接就commit
            commit(RECEIVE_CATEGORYS,{categorys})
        }
        //提交一个mutation
    },

    //异步获取商家列表
    async getShops({commit,state}) {
        //发送异步ajax请求
        const {longitude,latitude} = state
        const res = await reqShops(longitude,latitude);
        if(res.code === 0){
            const shops = res.data
            //本来是context.commit，但是解构赋值，所以直接就commit
            commit(RECEIVE_SHOPS,{shops})
        }
        //提交一个mutation
    }
}