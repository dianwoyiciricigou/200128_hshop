<template>
    <!--首页外卖-->
    <div class="on">
      <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
          <template v-slot:left>
            <span class="header_search">
              <i class="iconfont icon-sousuo"></i>
            </span>
          </template>
          <template v-slot:right>
            <span class="header_login">
            <span class="header_login_text">登录|注册</span>
          </span>
          </template>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys,index) in categorysTo2D" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <shopList/>
      </section>
    </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop"
import shopList from "../../components/shopList/shopList"


import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import { mapState } from "vuex"
import { mapActions } from "vuex"

export default {
  data(){
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted(){
    this.getCategorys();
    this.$store.dispatch('getShops');
    
  },
  watch:{
    categorys(){  //categorys数组接收到数据了，即将在dom上渲染出来
      //此时swiper插件如果作用，数组还没渲染到dom，就会出现bug
      //所以需要$vm.nextTick(callback)（这个函数的回调会在dom渲染出来16个div之后执行，swiper就可以用了）
      this.$nextTick(()=>{
        new Swiper ('.swiper-container', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
    }
  },
  computed:{
    ...mapState(['address','categorys']),
    //把食品分类数组在计算属性里面变成二维数组
    categorysTo2D(){
      let {categorys} = this;
      let arr = [];
      let num = categorys.length / 8 - 1;
      for (let i = 0; i < num+1; i++) {
        arr[i] = [];
      }
      arr.forEach((item,index)=>{
        for (let  i = 0; i < categorys.length; i++) {
          if (i < (index+1)*8 && i >= index*8) {
            item.push(categorys[i])
          }
        }
      })
      return arr
    },
    
  },
  methods:{
    ...mapActions(['getCategorys'])
  },
  components:{
    HeaderTop,
    shopList
  } 
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl";
  .msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>