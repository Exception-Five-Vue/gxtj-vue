<template>
  <section id="login">
<body style="">
   <div id="wx_pic" style="margin:0 auto;display:none;">
                    <img src="https://img.huxiucdn.com/article/cover/201703/11/175600370063.png">
            </div>

    <div id="qr_code_pc" class="qr_code_pc" style="display: block;">
        <p>扫码加入Oreo会员</p>
        <img style="width: 100%;" src="https://img.huxiucdn.com/article/cover/201703/01/154112834206.jpg">
        <p>“扫一扫”立享会员服务</p>
    </div>

    <div id="messenger" class="messenger">
        正确的提示信息
    </div>
    <!--文章评论-->
    <div id="pl-box" class="pl-form-box">
        <div class="title">
            <a class="js-close-pl-form pull-left">取消</a>
            <a class="js-submit-pl-form pull-right">发送</a>
            评论
        </div>
        <div class="pl-textarea-box">
            <textarea class="pl-textarea" id="pl-textarea"></textarea>
        </div>
    </div>
    <!--热议评论-->
    <div id="topic-pl-box" class="pl-form-box">
        <div class="title">
            <a class="js-close-pl-form pull-left">取消</a>
            <a class="js-topic-submit-pl-form pull-right">发送</a>
            评论
        </div>
        <div class="pl-textarea-box">
            <textarea class="pl-textarea" id="topic-pl-textarea"></textarea>
        </div>
    </div>
    <!--热议点评评论-->
    <div id="topic-dp-box" class="pl-form-box">
        <div class="title">
            <a class="js-close-pl-form pull-left">取消</a>
            <a class="js-topic-submit-dp-form pull-right">发送</a>
            评论
        </div>
        <div class="pl-textarea-box">
            <textarea class="pl-textarea" id="topic-dp-textarea"></textarea>
        </div>
    </div>



<!-- <a class="guide-box bgw js-open-app">
    <div class="pull-left guide-logo-box">
        <img src="https://static.huxiucdn.com/m/image/guide-logo.png?v=201706161525">
    </div>
    <div class="pull-left">虎不咬你，你来咬我？</div>
    <div class="pull-right btn-open c3">
        好啊
    </div>
</a> -->
<div class="placeholder-box"></div>
<div class="htmlBox" style="background: rgb(255, 255, 255);">
    <nav>
    <div class="nav-box"></div>
</nav>

<!--导航-->
<div class="user-wrap" v-show="isHeaderBoxShow"> 

    <div class="information">
        <a href="/">资讯</a>
    </div>
    
    <!-- <ul class="navbar-nav-ul">
        <li>
            <a class="js-open-app js-hmt-detection" data-detection="M导航,24小时,点击">24小时</a>
        </li>
        <li>
            <div class="nums-nav nums-nav-active" style="display: block;"></div>
            <a class="js-hide-num-active" href="/active">活动</a>
        </li>
        <li><a href="/chuangye.html">创业板</a></li>
            </ul> -->
    <div class="vip-nav-content">
        <div class="title">
            <router-link :to="`/usermod`">
                兴趣统计
                <div class="pull-right time">
                <i class="icon icon-right"></i>
                </div>
            </router-link>
        </div>
    </div>
    <div class="user-face-wrap">
        
            <div class="text-center">
                <router-link class="login-link c3" :to="`/login`">登录</router-link>
                <router-link class="login-link b1" :to="`/register`">极速注册</router-link>
            </div>
            </div>

</div>
<!--搜索框-->
<div class="search-wrap" v-show="searchBoxShow">
    <div class="search-input-box">

        <button class="input-sm-search js-search"><i class="icon icon-sm-search"></i>
        </button>
        <input type="search" name="s" id="top-search" class="search-input" placeholder="输入关键词">
        <a class="close-box js-search-cancel"  @click="searchBoxShow = false">取消</a>
    </div>
    <div class="search-act search-history-act" style="display: block;">
        搜索历史
    </div>
    <ul class="search-ul search-history" style="display: block;"><li class="transition"><a href="/search.html?s=库克&amp;f=history_search">库克</a></li></ul>
    </div>
<header>
    
            <!-- 默认 -->
        <div class="top-bar">
            <div class="nums" style="display: block;"></div>
            <button class="navbar-toggle js-open-nav" type="button" :class="{'active':isHeaderBoxShow}" @click="toggleHeaderBox">
                <div class="icon-bar"></div>
                <div class="icon-bar"></div>
                <div class="icon-bar"></div>
            </button>
            <div class="logo-box">
                <a href="/">
                    <img src="../assets/image/logo.png">
                </a>
            </div>
            <div class="pull-right search-box js-search-cancel js-hmt-detection" @click="searchBoxShow = !searchBoxShow">
                <i class="icon icon-search"></i>
            </div>
        </div>
       

</header>
<div class="modal-message" v-show="modalMsgShow">
    <span class="title">{{modalMsg}}</span>
</div>    
<div class="login-wrap">
        <router-link :to="`/register`" class="register-link">极速注册</router-link>
        <strong class="login-title text-center">登录Oreo</strong>
<!--        上次登录方式为短信快捷登录-->
<!--        <div class="last-login c4 text-center"></div>-->
<!---->
        <div class="form-login">
            <!--col-xs-->
            <div class="label-box">
                <input class="l-input username" placeholder="用户名" v-model="userInfo.username">
                <a class="js-input-close input-close"><i class="icon-login icon-l-close"></i></a>
            </div>
            <a class="label-select-box hide text-center"><span class="js-country">+86</span><i class="icon-login icon-l-caret"></i></a>

            <div class="label-box">
                <input class="l-input password" type="password" placeholder="密码" v-model="userInfo.password">
                <a class="js-input-close input-close second "><i class="icon-login icon-l-close"></i></a>
                <a class="i-eye js-i-eye"><i class="icon-login i-l-e"></i> </a>
            </div>
            <a href="/user/reset_password" class="forget-pass">忘记密码？</a>
            <a class="js-btn-login btn-login text-center" @click="loginConfirm">登 录</a>
            <!-- <div class="sms-link"><a href="/user/login_sms" class=" text-center">短信快捷登录</a></div> -->
        </div>

        <div class="three-login-box">
            <a href="/user/auth_login/qq.html"><i class="icon-login i-l-qq"></i></a>
                        <a href="/user/auth_login/sina.html"><i class="icon-login i-l-wb"></i></a>
                    </div>

    </div>
    <div class="area-box">

    </div>
<VFooter></VFooter>
</div>

<audio controls="controls" style="display: none;"></audio></body>
  </section>
</template>
<script>
import {requestLogin ,getUserInfoById} from '../api/api.js'
import VTypeList from '@/components/TypeList.vue'
import VFooter from '@/components/Footer.vue'

export default {
  data(){
     return{
        userInfo: {
			userId:1,
			username: "",
			password: "",
			nickname: "",
			userMail: "",
			userGroupId: 1
		},
      isHeaderBoxShow: false,

            searchBoxShow: false,
        isLogined: false,
                    modalMsg: "",
            modalMsgShow: false,

     }
  },
  components:{
      VTypeList,VFooter
  },
  mounted(){

  },
  methods:{
    toggleHeaderBox(){
      console.log("大三大四的")
      this.isHeaderBoxShow = !this.isHeaderBoxShow
    },
    logout () {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("user")
        this.isLogined = false
        this.displayMsg("退出成功")
    },
    loginConfirm () {
        requestLogin(this.userInfo).then(res => {
            console.log(res)
            if(res.data.status === 1){
                this.isLoginShow = false
                this.isLogined = true
                getUserInfoById(window.localStorage.getItem("user")).then(res=>{
                    if(res.status === 1){
                        this.userInfo = res.result
                        // this.initData()
                        this.$router.push("/");
                        alert("成功")
                    }
                })
                // this.userInfo = JSON.parse(window.localStorage.getItem("user"))
                // this.webSocketConnect();
            }else if(res.data.status === -1){
                alert("失败")
            }
        })
    },        
  }
}
</script>
<style>
   @import '../assets/css/login.css';
   @import '../assets/css/activity.css';
   @import '../assets/css/m_video.css';
   @import '../assets/css/m.css';
   @import '../assets/css/share.css';
   @import '../assets/css/topic.css';
   @import '../assets/css/vip.css';
   @import '../assets/css/vip_coulmn.css';
   
   
</style>
