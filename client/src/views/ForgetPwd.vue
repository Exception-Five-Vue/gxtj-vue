<template>
  <section id="forgetPwd">
    <VHeader 
    :isLogined="isLogined" 
    :userInfo="userInfo" 
    :isLoginShow="isLoginShow"
    :isRegisterShow="isRegisterShow"
    :isSearchShow="isSearchShow"
    @handleForm="handleForm"
    @closeForm="closeForm"
    @loginConfirm="loginConfirm"
    @registerConfirm="registerConfirm"
    @logout="logout"
    @handleSearch="handleSearch"
    ></VHeader>
<div class="placeholder-height"></div>
<div class="retrieve-password-box" style="height: 699px;">
    <div class="title">找回密码</div>
    <label class="login-label transition" style="margin-top: 20px;
">
        <input id="reset_username" class="login-input username reset-username" placeholder="邮箱" v-model="pwdForm.userMail">
        <a class="js-label-select label-select-box hide login-label-select text-center"><span class="js-reset-country-user">+86</span><i class="icon-modal icon-l-caret"></i></a>

    </label>
    <label class="login-label" style="margin-top: 20px;
">
        <input placeholder="用户名" type="text" class="login-input reset-password1" v-model="pwdForm.username">
    </label>
    <div class="country-box retrieve-box">
        <ul class="country-ul js-country-ul"><li data-code="+355"></li></ul>
    </div>
    <!-- <label class="login-label">
        <input placeholder="验证码" class="login-input reset-captcha">
        <span class="js-reset-captcha  btn-captcha">获取验证码</span>
    </label> -->
    <!-- <label class="login-label">
        <input placeholder="新密码" type="password" class="login-input reset-password1">
    </label>
    <label class="login-label">
        <input placeholder="确认新密码" type="password" class="login-input reset-password2">
    </label> -->
    <button class="js-reset-password btn-login" @click="submit">发送邮件</button>

</div>
    <div style="height: 60px">
    </div>
</div>
<div style="clear:both;"></div>
<VFooter></VFooter>
  </section>
</template>
<script>

import {getUserInfoById,requestLogin, requestRegister,getUserMod,findPassword} from '../api/api.js'
import VFooter from '@/components/Footer.vue'
import VHeader from '@/components/Header.vue'
import VueNotifications from 'vue-notifications'

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
        
        pwdForm: {
            username: '',
            userMail: ''
        },
		isLogined: false,
		isLoginShow: false,
        isRegisterShow: false,
        isSearchShow: false,
        defaultAvatar: 'this.src="https://img.huxiucdn.com/auth/data/avatar/2.jpg"',

        }
    },
    components: {VHeader,VFooter},
    mounted(){
        setTimeout(()=>{
            this.isLoginShow = false
        })
        let token = window.localStorage.getItem("token")
        if(token!=null&&token!=""){
            // this.userInfo = JSON.parse(window.localStorage.getItem("user"))
            this.userInfo.userId = window.localStorage.getItem("user");
            getUserInfoById(this.userInfo.userId).then(res=>{
                if(res.status === 1){
                    this.userInfo = res.result
                }
            })
            this.isLogined = true
        }else{
            this.handleForm(0)
        }
        
    },
    methods: {
        submit(){
            let param = new FormData()
            param.append('username', this.pwdForm.username)
            param.append('userMail', this.pwdForm.userMail)
            findPassword(param).then(res=>{
                console.log(res)
                if(res.data.status === 1){
                    this.showSuccessMsg({title:"成功",message:"已成功向您的邮箱发送确认邮件,请确认"})
                }
            })
        },
        /* header方法 */
        handleForm(...data) {
            console.log(data)
            console.log("dsadsadsa")
            if(data[0] === 0){//点击登录
                this.isLoginShow = true
                this.isRegisterShow = false
            }else if(data[0] === 1){//点击注册
                this.isLoginShow = false
                this.isRegisterShow = true
            }
        },
        closeForm() {
            this.isLoginShow = false
            this.isRegisterShow = false
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
                        this.showSuccessMsg({title:"成功",message:"登录成功"})
                    }
                })
                // this.userInfo = JSON.parse(window.localStorage.getItem("user"))
                }else if(res.data.status === -1){
                    this.showErrorMsg({title:"失败",message:"用户名不存在"})
                }
            })
        },
        registerConfirm () {
            this.userInfo.userGroupId = 1
            let param = this.userInfo
            requestRegister(param).then(res => {
                console.log(res)
                if(res.status === 1){
                    alert("已成功向您的邮箱发送帐号激活邮件,请确认")
                }else{
                    alert("发送邮件失败")
                }
            })
        },
        logout () {
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("user")
            this.isLogined = false
        },        
        handleSearch(...data){
            if(data[0] === 0){//关闭
                this.isSearchShow = false
            }else if(data[0] === 1){
                this.isSearchShow = true
            }    
        },
        
    },
    //   通知插件
    notifications: {
        showSuccessMsg: {
        type: VueNotifications.types.success,
        title: 'Hello there',
        message: 'That\'s the success!'
        },
        showInfoMsg: {
        type: VueNotifications.types.info,
        title: 'Hey you',
        message: 'Here is some info for you'
        },
        showWarnMsg: {
        type: VueNotifications.types.warn,
        title: 'Wow, man',
        message: 'That\'s the kind of warning'
        },
        showErrorMsg: {
        type: VueNotifications.types.error,
        title: 'Wow-wow',
        message: 'That\'s the error'
        }
    },
}
</script>
<style>
@import '../assets/bootstrap/css/bootstrap.min.css';
@import '../assets/css/build.css';
@import '../assets/css/login.css';
@import '../assets/css/dlzc.css';
@import '../assets/css/zzsc.css';
@import '../assets/css/userinfo.css';

#index{
    font-size: 14px;
}
li.nav-news.js-show-menu ul{position: absolute; visibility: hidden; background:#fff; width:250px;  top:60px; left:-50px; z-index:9999; box-shadow:0 1px 15px rgba(18,21,21,.2);padding:10px 5px;}
#jsddm ul li{ float:left; width:105px; padding-left:20px; line-height:40px;}
.echarts-wrapper{
    display: table;
    width: 100%;
}
</style>

