<template>
  <section>
	  <header id="top" role="banner" class="transition">
            <!--搜索弹窗 开始-->
            <div class="box">
                <div class="box2" v-show="isSearchShow">
                    <div class="icon icon-search-close js-show-search-box" @click="handleSearch(0)"><a class="close"></a></div>
                    <div class="search-content overlay-dialog-animate">
                        <div class="search-input">
                            <button type="submit" @click="requestSearch"></button>
                            <input placeholder="请输入关键字" name="s" id="search-input" v-model="searchContent">
                        </div>
                        <div class="search-history hide" id="history">
                            <span>我的搜索历史</span>
                            <ul class="transition" id="history_ul">
                                <li class="transition"><a href="#">数码</a></li>
                                <li class="transition"><a href="#">科技</a></li>
                                <li class="transition"><a href="#">科技</a></li>
                                <li class="transition"><a href="#">互联网</a></li>
                                <li class="transition"><a href="#">汽车之家</a></li>
                            </ul>
                            <div class="pull-right empty-history js-empty-history">清空历史</div>
                        </div>
                        <div class="search-history search-hot">
                            <strong>热搜词</strong>
                            <ul>
                                <li class="transition"><a href="#">数码</a></li>
                                <li class="transition"><a href="#">科技</a></li>
                                <li class="transition"><a href="#">互联网</a></li>
                                <li class="transition"><a href="#">汽车之家</a></li>
                                <li class="transition"><a href="#">Uber</a></li>
                                <li class="transition"><a href="#">支付宝</a></li>
                                <li class="transition"><a href="#">大数据</a></li>
                                <li class="transition"><a href="#">创业</a></li>
                                <li class="transition"><a href="#">旅游</a></li>
                                <li class="transition"><a href="#">美团</a></li>
                                <li class="transition"><a href="#">社交</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="navbar-header transition">
                    <a @click="flush" title="首页"><img src="../assets/images/logo.jpg" alt="Oreo" title="首页" width="50px" height="50px"/></a>
                </div>
                <ul class="nav navbar-nav navbar-left" id="jsddm">
                    <!-- <li class="nav-news js-show-menu">
                        <a href="#">资讯 <span class="caret"></span></a>
                        <ul>
                            <li v-for="type in typeList"><a href="#">{{type.typeName}}</a></li>
                        </ul>
                    </li> -->
                    <li class="nav-news" v-for="type in typeList">
                        <router-link :to="{path:'/type/'+type.typeId}">{{type.typeName}}</router-link>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right transition  xiala main_nav">
                    <!-- <li class="app-guide js-app-guide" >
                        <div class="app-guide-box">
                            <img src="../assets/images/1448211685.png">
                            <div class="app-guide-title">
                                <span>微信扫一扫</span><br>
                                <span>下载OreoAPP</span>
                            </div>
                        </div>
                        <i class="icon icon-sm-phone"></i>APP下载<em class="guide-prompt"></em>
                    </li> -->
                    <li class="search-li js-show-search-box" @click="handleSearch(1)"><a><i class="icon icon-search "></i></a><span>搜索</span></li>
                    <li class="login-link-box" @click="handleForm(0)" v-show="!isLogined"><a class="cd-signin">登录</a></li>
                    <li ><a class="cd-signup" @click="handleForm(1)" v-show="!isLogined">注册</a></li>
                    <li class="logined-info" v-show="isLogined">
                        <router-link :to="`#`"> 
                            您好，{{userInfo.nickname}}
                            <a class="avatar transition">
                                <img style="width:35px;border-radius:100%;" :src="`${userInfo.userImageUrl}`" :onerror="defaultAvatar">
                            </a>
                            <span class="caret"></span>
                            <ul class="logined-show-menu">
                                <li><router-link :to="`/member`">个人中心</router-link></li>
                                <li><router-link :to="`/usermod`">兴趣统计</router-link></li>
                                <li @click="logout"><router-link :to="`/`">退出登录</router-link></li>
                            </ul>
                        </router-link>
                        <!-- <a @click="logout">&nbsp;&nbsp;&nbsp;退出</a></li> -->
                    <li><a class="cd-tougao">投稿</a></li>
                </ul>
            </div>
            <div class="cd-user-modal" :class="{'is-visible': isLoginShow || isRegisterShow}"> 
                <div class="cd-user-modal-container">
                    <div id="cd-login" v-show="isLoginShow"> <!-- 登录表单 -->
                        <div class="modal-alert-title">登录</div>
                        <div class="register" >
                            <!-- <div class="register-top" id="reg-top"><i><a id="qrcode" href="#"></a></i></div> -->
                            <div class="register-con" id="rc">
                                <div class="login-form username-box " style="margin-top:52px;">
                                    <label class="login-label transition" >
                                        <input id="login_username"  class="login-input" placeholder="用户名" v-model="userInfo.username">
                                    </label>
                                    <label class="login-label">
                                        <input id="login_password" class="login-input password" type="password" placeholder="输入6～24位密码" v-model="userInfo.password">
                                    </label>
                                    <a class="js-label-select label-select-box hide login-label-select text-center"><span class="js-country-user">+86</span><i class="icon-modal icon-l-caret"></i></a>
                                    <div class="login-operation">
                                        <a href="/user/reset_password" class="js-forget-passward pull-right">忘记密码</a>
                                    </div>
                                    <button class="js-btn-login btn-login" @click="loginConfirm">登&nbsp;录</button>
                                </div>
                                <div class="js-open-register register-text" @click="handleForm(1)">极速注册</div>
                                <!-- <div class="third-box">
                                    <div class="title"><span>第三方登录</span></div>
                                    <a href="#"><i class="icon-modal icon-login-qq"></i></a>
                                    <a class="js-login-switch"><i class="icon-modal icon-login-wx"></i></a>
                                    <a href="#"><i class="icon-modal icon-login-wb"></i></a>
                                    <a href="#"><i class="icon-modal icon-login-zfb"></i></a>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div id="cd-signup" v-show="isRegisterShow">
                        <div class="modal-alert-title">极速注册</div>
                        <div class="user-register-box">
                            <div class="login-form sms-box">
                                <label class="login-label transition" >
                                    <input id="reg_username"  class="login-input" placeholder="用户名" v-model="userInfo.username">
                                </label>
                                <label class="login-label">
                                    <input id="reg_password" class="login-input password" type="password" placeholder="输入6～24位密码" v-model="userInfo.password">
                                </label>
                                <label class="login-label transition" >
                                    <input id="reg_nickname"  class="login-input" placeholder="昵称" v-model="userInfo.nickname">
                                </label>
                                <label class="login-label transition" >
                                    <input id="reg_userMail"  class="login-input" placeholder="邮箱" v-model="userInfo.userMail">
                                </label>
                                <a class="js-label-select label-select-box hide login-label-select text-center"><span class="js-country-user">+86</span><i class="icon-modal icon-l-caret"></i></a>
                                <div class="login-operation">
                                    <a href="/user/reset_password" class="js-forget-passward pull-right">忘记密码</a>
                                </div>
                                <button class="js-btn-sms-login btn-login" @click="registerConfirm">注&nbsp;册</button>
                            </div>
                            <div class="js-user-login register-text" @click="handleForm(0)">已有账号，立即登录</div></div>
                        </div>
                        <a href="#" class="cd-close-form " @click="closeForm">关闭</a>
                </div>
            </div> 
        </header>
  </section>
</template>
<script>
import {requestLogin, requestRegister,getAllType} from '../api/api.js'

export default {
    props:['isLogined','userInfo','isLoginShow','isRegisterShow','isSearchShow'],
	name: "VHeader",
	data(){
		return {
            // userInfo:{},
            // // isLogined:false,
			// isLoginShow: false,
            // isRegisterShow: false
            searchContent: "",
            defaultAvatar: 'this.src="https://img.huxiucdn.com/auth/data/avatar/2.jpg"',
            typeList: []
        }
    },
    mounted(){
         getAllType().then(res=>{
            if(res.status === 1){
                this.typeList = res.result
            }
        })
    },
    methods: {
        handleForm(flag) {
            this.$emit('handleForm',flag)
        },
        closeForm() {
            this.$emit('closeForm')
        },
        loginConfirm () {
            this.$emit('loginConfirm')
        },
        registerConfirm () {
            this.$emit('registerConfirm')
        },
        logout () {
           this.$emit('logout')
        },
        handleSearch(flag){
            this.$emit('handleSearch', flag)
        },
        requestSearch(){
            this.$emit('handleSearch', 0)
            this.$emit('requestSearch', this.searchContent)
            this.$router.push({name:'search',params: { searchContent: this.searchContent}})
        },
        flush(){
            this.$router.push({name:'home'})
        },
        goToType(){
            this.$router.go(0)
        }
    }
}
</script>
<style>
@import '../assets/bootstrap/css/bootstrap.min.css';
@import '../assets/css/build.css';
@import '../assets/css/login.css';
@import '../assets/css/dlzc.css';
@import '../assets/css/zzsc.css';

#index{
    font-size: 14px;
}
li.nav-news.js-show-menu ul{position: absolute; visibility: hidden; background:#fff; width:250px;  top:60px; left:-50px; z-index:9999; box-shadow:0 1px 15px rgba(18,21,21,.2);padding:10px 5px;}
li.logined-info ul{
    position: absolute; 
    visibility: hidden; 
    background:#fff; 
    width:150px;  
    top:40px; 
    left:0; 
    z-index:9999; 
    box-shadow:0 1px 15px rgba(18,21,21,.2);
    padding:10px 15px;
    text-align: center;
}

#jsddm ul li{ float:left; width:105px; padding-left:20px; line-height:40px;}
.logined-info ul li{ float:left; width:105px; padding-left:10px; line-height:30px;}

</style>

