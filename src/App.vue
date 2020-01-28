<template>
  <div id="app">
    <router-view></router-view>
    <footerGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import footerGuide from './components/FooterGuide/FootGuide'
import MSite from './pages/MSite/MSite'
import Order from './pages/Order/Order'
import Profile from './pages/Profile/Profile'
import Search from './pages/Search/Search'
export default {
  components:{
    footerGuide,
    MSite,
    Order,
    Profile,
    Search
  }
}
</script>

// 告诉页面所有的style都用stylus语法
<style lang="stylus" rel="stylesheet/stylus">

</style>
