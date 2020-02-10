<template>
  <div id="app">
    <router-view></router-view>
    <footerGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import footerGuide from './components/FooterGuide/FootGuide'
import {reqFoodTypes} from './api'
import { mapActions } from "vuex"

export default {
  
  mounted () {
    //this.$store.dispatch('getAddress')
    this.getAddress();
    //this.getUserInfo();
  },
  methods:{
    ...mapActions(['getAddress','getUserInfo'])
  },
  components:{
    footerGuide
  }
}
</script>

// 告诉页面所有的style都用stylus语法
<style lang="stylus" rel="stylesheet/stylus">

</style>
