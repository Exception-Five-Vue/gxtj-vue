
<template>
  <section id="search">
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


<div class="htmlBox">
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
                    <div class="login-user-wrap">
                <div class="user-face-box">
                    <span class="icon-b"></span>
                    <img src="https://img.huxiucdn.com/auth/data/avatar/002/02/04/25_1521432927.jpg?imageView2/1/w/150/h/150/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                </div>
                <div class="login-user-info-wrap">
                                            <a class="author-name">
                            嗅友SVtwI                                                    </a>
                                    </div>
                <a class="exit-wrap" href="/user_action/logout">退出账号</a>
            </div>
            </div>

</div>
<!--搜索框-->
<div class="search-wrap" v-show="searchBoxShow">
    <div class="search-input-box">

        <button class="input-sm-search js-search"><i class="icon icon-sm-search"></i>
        </button>
        <input type="search" name="s" id="top-search" class="search-input" placeholder="输入关键词" v-model="searchContent">
        <a class="close-box js-search-cancel"  @click="searchBoxShow = false">取消</a>
    </div>
    <div class="search-act search-history-act" style="display: block;">
        搜索历史
    </div>
    <ul class="search-ul search-history" style="display: block;"><li class="transition"><a href="/search.html?s=库克&amp;f=history_search">库克</a></li></ul>
            <div class="search-act search-hot">
            热搜词
        </div>
        <ul class="search-ul search-hot">
                    <li><a href="/search.html?s=抖音&amp;f=hot_search">抖音</a></li>
                    <li><a href="/search.html?s=特朗普&amp;f=hot_search">特朗普</a></li>
                    <li><a href="/search.html?s=春节档&amp;f=hot_search">春节档</a></li>
                    <li><a href="/search.html?s=互联网医疗&amp;f=hot_search">互联网医疗</a></li>
                    <li><a href="/search.html?s=A股&amp;f=hot_search">A股</a></li>
                    <li><a href="/search.html?s=独角兽&amp;f=hot_search">独角兽</a></li>
                    <li><a href="/search.html?s=库克&amp;f=hot_search">库克</a></li>
                    <li><a href="/search.html?s=影评&amp;f=hot_search">影评</a></li>
                    <li><a href="/search.html?s=孙宏斌&amp;f=hot_search">孙宏斌</a></li>
                </ul>
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
<div class="search-wrap-show active">
        <div class="search-input-box">
                <button type="submit" class="input-sm-search" @click="requestSearch"><i class="icon icon-sm-search"></i></button>
                <input class="search-input" type="search" id="search-s" name="s" placeholder="输入关键词" v-model="searchContent">
        </div>
    </div>

        <div class="recommended-box">
            <ul class="search-feed-ul search-article search-append">
                <li v-for="info in searchList">
                    <div class="author-info">
                        <div class="name">
                            <a href="/article/237620.html" v-html="info.title"></a>
                        </div>
                        <div class="info" v-html="info.description"></div>
                    </div>
                    <div class="time">
                        <span>{{info.author}}</span><span>{{info.publishDate | formatDate}}</span>
                    </div>
                </li>
            </ul>
        </div>
                        <div class="bottom-more js-more-search" data-cur_page="1">
                点击加载更多
            </div>
                        <VFooter></VFooter>
</div>

<audio controls="controls" style="display: none;"></audio></body>
  </section>
</template>

<script>
import {requestLogin ,getUserInfoById,getInfoBySearchBar} from '../api/api.js'

import VTypeList from '@/components/TypeList.vue'
import VFooter from '@/components/Footer.vue'
import {formatDate} from '../utils/date.js';

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
            searchBoxShow:false,
            isLogined: false,
            searchContent: "",
            searchList:[],
                        modalMsg: "",
            modalMsgShow: false,

        }
    },
    components:{
        VTypeList,VFooter
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
        let p = this.$route.params.searchContent
        if(p!=undefined && p!=""){
            this.searchContent = p
        }
        this.init()
    },
    methods:{
        toggleHeaderBox(){
            console.log("大三大四的")
            this.isHeaderBoxShow = !this.isHeaderBoxShow
        },
        requestSearch(){
            this.init()
        },
        init(){
            let param = new FormData()
            param.append("searchContent", this.searchContent)
            getInfoBySearchBar(param).then(res=>{
                if(res.status === 1){
                    this.searchList = res.result
                    // for(let item of this.searchList){
                    //     item.description = item.description.replace(new RegExp(this.searchContent,'gm'),`<em>${this.searchContent}</em>`)
                    // }
                    console.log(this.searchList)
                } 
            })
        }
    },
      filters: {
		formatDate(time) {
			var date = new Date(time);
			return formatDate(date, "yyyy-MM-dd");
		}
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
   .recommended-box .info{
        display: -webkit-box;   
        -webkit-box-orient: vertical;   
        -webkit-line-clamp: 2;   
        overflow: hidden;  
   }
       
</style>
