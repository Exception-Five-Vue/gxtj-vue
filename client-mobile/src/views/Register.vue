<template>
  <section id="register">
     <body style=""><div id="wx_pic" style="margin:0 auto;display:none;">
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
                <a class="login-link b1" href="/user/register">极速注册</a>
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
                    <img src="../assets/image/logo.jpg">
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
        <strong class="login-title text-center">极速注册</strong>

        <div class="form-login gain-code">
            <div class="label-box col-xs">
                <input class="l-input" id="username" placeholder="输入手机号">
                <a class="js-input-close input-close"><i class="icon-login icon-l-close"></i></a>
            </div>
            
            <div class="label-box">
                <input class="l-input captcha" placeholder="输入6位验证码" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" maxlength="6">
                <a class="js-input-close input-close third"><i class="icon-login icon-l-close"></i></a>
                <a class="gain-code-time js-get-code">获取验证码</a>
            </div>

            <a class="label-select-box text-center"><span class="js-country">+86</span><i class="icon-login icon-l-caret"></i></a>
            <a class="js-Gsou-register btn-login btn-login-code text-center">注册</a>
            <div class="mobile-box"></div>
            <div class="sms-link text-center">已有账号，<router-link :to="`/login`">去登录</router-link></div>
        </div>

    </div>

    <div class="area-box">
        <strong class="login-title text-center">选择国家和地区</strong>

    </div>

<VFooter></VFooter>
</div>

<audio controls="controls" style="display: none;"></audio></body>
  </section>
</template>
<script>
import VTypeList from '@/components/TypeList.vue'
import VFooter from '@/components/Footer.vue'

export default {
  data(){
     return{

        userInfo: {},
        isLogined: false,
        isHeaderBoxShow: false,
            searchBoxShow: false,            
            modalMsg: "",
            modalMsgShow: false,

     }
  },
  components:{

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
