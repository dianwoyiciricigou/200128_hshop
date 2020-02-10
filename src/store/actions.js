import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutations-types'
import {
    reqAddress,
    reqFoodTypes,
    reqShops,
    reqUserinfo,
    reqLogout,
    reqShopGoods,
    reqShopInfo,
    reqShopRatings,
    reqSearchShops
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
    },

    //同步记录用户信息
    recordUser ({commit},userInfo) {                //在登陆之前就异步获取到了信息，然后传参到action方法里面，就可以直接保存
        commit(RECEIVE_USER_INFO,{userInfo})
    },

    //异步获取用户信息
    async getUserInfo({commit}) {                   //在app.vue里面运行，为的是在刚登陆的时候就能够获取到信息，自动登陆
        const res = await reqUserinfo();
        if (res.code === 0) {
            const userInfo = res.data
            commit(RECEIVE_USER_INFO,{userInfo})
        }
    },

    async logout({commit}) {
        const res = await reqLogout();
        if (res.code === 0) {
            commit(RESET_USER_INFO)
        }

    },

    // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo();
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit},callback) {
    const result = await reqShopRatings()
    
    
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
    //数据更新之后，通知组件
    callback && callback()
  },

  // 异步获取商家商品列表
  async getShopGoods({commit},callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})

      //数据更新之后，通知组件
      callback && callback()
    }
  },

  //同步更新food中的count值
  updateFoodCount({commit},{isAdd,food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT,{food})
    } else {
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },

  //同步清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  },

  //异步获取搜索的商家数组
  async searchShops({commit,state},keyword) {

    const geohash = state.latitude + ',' + state.longitude
    const res = await reqSearchShops(geohash,keyword)
    
    if (res.code===0) {
      const searchShops = res.data
      commit(RECEIVE_SEARCH_SHOPS,{searchShops})
    }


  }
}