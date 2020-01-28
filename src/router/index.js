// 路由器对象模块
import Vue from 'vue'
import Router from 'vue-router'
import MSite from '@/pages/MSite/MSite'
import Order from '@/pages/Order/Order'
import Profile from '@/pages/Profile/Profile'
import Search from '@/pages/Search/Search'
import Login from '@/pages/Login/Login'

//声明使用插件
Vue.use(Router)

export default new Router({
  //所有路由
  routes: [
    {
      path: '/msite',
      name: 'msite',
      component: MSite,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/',
      redirect:'/msite',
      meta:{
        showFooter:true
      }
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    }
  ]
})
