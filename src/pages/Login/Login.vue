<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay = true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay = false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">
                  {{lastTime > 0?`已发送（${lastTime}s）`:'获取验证码'}}
                </button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                  <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                  <div class="switch_button" :class="{on:showPwd}" @click="showPwd = !showPwd">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">abc</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit" >登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont iconarrow-lift"></i>
        </a>
      </div>
      <alertTip :alertText="alertWord" @closeTip="tipClose" v-show="showTip"></alertTip>
    </section>
</template>

<script>
import alertTip from '../../components/AlertTip/AlertTip'
import {reqPwd,reqMessage,reqPhone} from '../../api'

export default {
  data(){
    return {
      loginWay:true, //true代表短信登陆
      lastTime:0,   //设置发送倒计时剩余时间
      showPwd:false, //设置是否显示密码
      phone:'',    //设置手机登陆的手机号
      code:'',      //手机验证码
      name:'',      //用户名
      pwd:'',     //密码
      captcha:'', //图形验证码
      alertWord:'xxxxx',  //提示框文本内容
      showTip:false,      //提示框显示开关
    }
  },
  computed:{
    rightPhone(){
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods:{
    
    async getCode(){
      //1.短信倒计时  
      if (!this.lastTime) {
        this.lastTime = 30;
        this.timer = setInterval(()=>{
          this.lastTime--;
          if (this.lastTime == 0) {
            clearInterval(this.timer)
          }
        },1000)
      }

      //2.向后台请求短信验证码
      const res = await reqMessage(this.phone);
      
      if (res.code === 1) { //失败时
        //显示提示
        slotWord(res.msg)
        //停止倒计时
        if (this.lastTime) {
          this.lastTime = 0;
          clearInterval(this.timer)
          this.timer = 0;
        }
      }
    },
    
    slotWord(text){
      this.showTip = true;
      this.alertWord = text;
    },
    async login() {

      let res;
      //1.前台表单验证
      
      if (this.loginWay) {   //短信登陆
        const {phone,rightPhone,code} = this
        if (!rightPhone) {
          //手机号不正确
          this.slotWord('手机号不正确')
          return 
        }else if(!/^\d{6}$/.test(code)){
          //短信验证码不正确
          this.slotWord('短信验证码不正确')
          return
        }

        //发送ajax请求短信登陆
        res = await reqPhone(phone,code)
      } else {        //用户名登陆
        const {name,pwd,captcha} = this
        if (!name) {
          //用户名不正确
          this.slotWord('用户名不正确')
          return
        } else if (!pwd){
          //密码不正确
          this.slotWord('密码不正确')
          return
        } else if (!captcha) {
          //图形验证码不正确
          this.slotWord('图形验证码不正确')
          return
        }

        //发送ajax请求密码登陆
        res = await reqPwd(name,pwd,captcha);
        
      }
      //停止倒计时
        if (this.lastTime) {
          this.lastTime = 0;
          clearInterval(this.timer)
          this.timer = 0;
        }

      //根据结果数据处理
      if(res.code === 0){
          const user = res.data
          //将user保存到vuex的state里面
          this.$store.dispatch('recordUser',user)

          //跳转路由到个人中心界面
          this.$router.replace('/profile')
        } else {
          const msg = res.msg
          //显示新的图形验证码
          this.getCaptcha()
          //显示警告提示
          this.slotWord(msg)
        }
    },
    getCaptcha(){
      //this.event.target.src = xxxxxxx
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
    },
    tipClose() {          //弹窗点击关闭
      this.showTip = false;
      this.alertWord = '';
    },
  },
  components:{
    alertTip
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl";
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>