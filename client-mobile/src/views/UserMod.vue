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
    <VTypeList></VTypeList>
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
       <div class="text-center" v-if="!isLogined">
            <router-link class="login-link c3" :to="`/login`">登录</router-link>
            <a class="login-link b1" href="/user/register">极速注册</a>
        </div>
        <div class="login-user-wrap" v-else>
            <div class="user-face-box">
                <span class="icon-b"></span>
                <img :src="`${userInfo.userImageUrl}`" :onerror="defaultAvatar">
            </div>
            <div class="login-user-info-wrap">
                <a class="author-name">{{userInfo.nickname}}</a>
            </div>
            <a class="exit-wrap" @click="logout">退出账号</a>
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
<div>
   <!-- 兴趣模型 -->
   <div class="echarts-wrapper">
    <div style="display:table-cell;vertical-align:middle" :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">
   </div>
</div>
</div>
<VFooter></VFooter>
</div>

<audio controls="controls" style="display: none;"></audio></body>
  </section>
</template>
<script>
import {getUserInfoById,requestLogin, requestRegister,getUserMod} from '../api/api.js'
import echarts from 'echarts'
import VFooter from '@/components/Footer.vue'
import VTypeList from '@/components/TypeList.vue'

export default {
   props: {
      className: {
            type: String,
            default: 'yourClassName'
      },
      id: {
            type: String,
            default: 'yourID'
      },
      width: {
            type: String,
            default: '500px'
      },
      height: {
            type: String,
            default: '500px'
      }
   },
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
            isLogined: false,
            isHeaderBoxShow: false,
            searchBoxShow: false,
            userMod: '',
            chart: null,
            echartsData: [],
            defaultAvatar: 'this.src="https://img.huxiucdn.com/auth/data/avatar/2.jpg"',
            modalMsg: "",
            modalMsgShow: false,

            isMsgAlert: false,
            isMsgAlertText: "",
        }
    },
    components: {
        VFooter,VTypeList
    },
    mounted(){
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
        }
        getUserMod().then((res)=>{
            console.log(res)
    //娱乐','法律','体育','财经','科技','互联网','政治','生活', '国际
            let userMod = res.result
            this.echartsData.push({
                value:userMod.entertainment, name:'娱乐'
            })
            this.echartsData.push({
                value:userMod.law, name:'法律'
            })
            this.echartsData.push({
                value:userMod.business, name:'金融',
            })
            this.echartsData.push({
                value:userMod.technology, name:'科技',
            })
            this.echartsData.push({
                value:userMod.internet, name:'互联网',
            })
            this.echartsData.push({
                value:userMod.politics , name:'政治',
            })
            this.echartsData.push({
                value:userMod.life, name:'生活',
            })
            this.initChart();
        })
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods:{
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
        initChart() {
            this.chart = echarts.init(this.$refs.myEchart);
            // 把配置和数据放这里
            let echartsData = this.echartsData
            this.chart.setOption({
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:['娱乐','法律','体育','财经','科技','互联网','政治','生活', '国际']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: false},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'面积模式',
                        type:'pie',
                        radius : [40, 130],
                        center : ['50%', '50%'],
                        roseType : 'area',
                        // data:[
                        //     {value:10, name:'rose1'},
                        //     {value:5, name:'rose2'},
                        //     {value:15, name:'rose3'},
                        //     {value:25, name:'rose4'},
                        //     {value:20, name:'rose5'},
                        //     {value:35, name:'rose6'},
                        //     {value:30, name:'rose7'},
                        //     {value:40, name:'rose8'}
                        // ]
                        data: this.echartsData
                    }
                ]
            })
        },
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
   
   .echarts-wrapper{
    display: table;
    width: 100%;
}
</style>
