// 路由器对象模块
import Vue from 'vue'
import Router from 'vue-router'



// import MSite from '@/pages/MSite/MSite'
// import Order from '@/pages/Order/Order'
// import Profile from '@/pages/Profile/Profile'
// import Search from '@/pages/Search/Search'
const MSite = () =>import('@/pages/MSite/MSite')
const Order = () =>import('@/pages/Order/Order')
const Profile = () =>import('@/pages/Profile/Profile')
const Search = () =>import('@/pages/Search/Search')



import Login from '@/pages/Login/Login'
import Shop from '@/pages/Shop/Shop'
import ShopGoods from '@/pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '@/pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '@/pages/Shop/ShopInfo/ShopInfo'


//声明使用插件
Vue.use(Router)

export default new Router({
  //所有路由
  routes: [
    {
      path: '/msite',
      name: 'msite',
      component: MSite,   //返回路由组件的函数，执行此函数才会加载路由组件，这个函数在请求对应的路由路径时候才会执行
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
    },
    {
      path:'/shop',
      name:'shop',
      component: Shop,
      children:[
        {
          path:'/shop/goods',
          name:'goods',
          component: ShopGoods
        },
        {
          path:'/shop/ratings',
          name:'ratings',
          component: ShopRatings
        },
        {
          path:'/shop/info',
          name:'info',
          component: ShopInfo
        },
        {
          path:'/shop',
          redirect:'/shop/goods'
        }
      ]
    },
  ]
})
