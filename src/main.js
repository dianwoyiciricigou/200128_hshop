// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters'  //加载过滤器

import './mock/mockServer'   //加载mockServer即可

Vue.config.productionTip = false
/* eslint-disable no-new */

//注册全局组件
Vue.component(Button.name,Button) //<mt-button>
Vue.use(VueLazyLoad,{ //内部自定义一个指令lazy
  loading
})

new Vue({
  el: '#app',
  router,//用上vue-router
  components: { App },
  template: '<App/>',
  store//使用上vuex
})
