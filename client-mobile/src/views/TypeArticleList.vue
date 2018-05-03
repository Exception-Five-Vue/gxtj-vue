<template>
  <section id="typeArticleList">
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


    <!-- <a class="guide-box bgw js-open-app">
    <div class="pull-left guide-logo-box">
        <img src="https://static.huxiucdn.com/m/image/guide-logo.png?v=201706161525">
    </div>
    <div class="pull-left">虎不咬你，你来咬我？</div>
    <div class="pull-right btn-open c3">
        好啊
    </div>
</a> -->
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
            <div class="search-act search-hot">
            热搜词
        </div>
        <ul class="search-ul search-hot">
                    <li><a href="/search.html?s=美国&amp;f=hot_search">美国</a></li>
                    <li><a href="/search.html?s=中国&amp;f=hot_search">中国</a></li>
                    <li><a href="/search.html?s=区块链&amp;f=hot_search">区块链</a></li>
                    <li><a href="/search.html?s=Pornhub&amp;f=hot_search">Pornhub</a></li>
                    <li><a href="/search.html?s=iPhone X&amp;f=hot_search">iPhone X</a></li>
                    <li><a href="/search.html?s=映客&amp;f=hot_search">映客</a></li>
                    <li><a href="/search.html?s=移动支付&amp;f=hot_search">移动支付</a></li>
                    <li><a href="/search.html?s=支付宝&amp;f=hot_search">支付宝</a></li>
                    <li><a href="/search.html?s=比特币&amp;f=hot_search">比特币</a></li>
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
                    <img src="../assets/image/logo.png">
                </a>
            </div>
            <div class="pull-right search-box js-search-cancel js-hmt-detection" @click="searchBoxShow = !searchBoxShow">
                <i class="icon icon-search"></i>
            </div>
        </div>
       
       <div class="msgAlert" :class="{'active': isMsgAlert}">为您推荐了6条新闻</div>

</header><div class="modal-message" v-show="modalMsgShow">
    <span class="title">{{modalMsg}}</span>
</div>
    <div class="general-column-wrap" id="m-zt-list-page">

        <div class="zt-container text-center"><span>{{typeName}}</span></div>

        <div class="zt-article-wrap no-left js-append-box" id="channel-article-box">
            <!--第一张头图-->
                <div class="zt-article-list" v-if="displayInfoList[0]!=undefined && !displayInfoList[0].isRemove">
                    <a href="/article/237487.html">
                            <div class="zt-article-big-pic">
                                <img class="lazy" :src="`${displayInfoList[0].infoImage.image}`" :onerror="defaultImg" :alt="displayInfoList[0].title" style="display: inline;">
                            </div>
                        
                        <h2 class="pd-article-title">{{displayInfoList[0].title}}</h2>

                                                    <div class="zt-article-time clearfix">
                                <span class="fl zt-author">{{displayInfoList[0].author}}</span>
                                <span class="fl">{{displayInfoList[0].publishDate|formatDateDiff}}</span>
                                                                    <span class="fr">
                                        <em>0</em>人评论
                                    </span>
                                                            </div>
                                            </a>
                </div>
            
                                                <!--广告投放开始-->
                                        <!--广告投放结束-->

                    <div class="zt-article-list" v-for="(info,index) in displayInfoList"  v-if="!info.isRemove && index>=1">
                        <router-link :to="`/article/${info.infoId}`">
                           <div class="zt-article-pic fr">
                              <img class="lazy" :src="`${info.infoImage.image}`" :onerror="defaultImg" :alt="info.title">
                           </div>
                            
                            <div class="zt-article-info pd-article-info">
                                <h2>
                                    <span>{{info.title}}</span>
                                </h2>

                                 <div class="zt-article-time clearfix">
                                    <span class="fl zt-author">{{info.author}}</span>
                                    <span class="fl">{{info.publishDate|formatDateDiff}}</span>
                                    <span class="article-pl fr">
                                        <em>0</em>人评论
                                    </span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    </div>
                    <div class="bottom-more js-more-zt-article" @click="loadMore">
                {{loadState}}
            </div>
        
    </div>

<VFooter></VFooter>
</div>

<audio controls="controls" style="display: none;"></audio></body>
  </section>
</template>
<script>
import {getTypeById,getUserInfoById,pushInfoByTypeId } from '../api/api.js'
import {GetDateDiff} from '../utils/date.js'
import VFooter from '@/components/Footer.vue'
import VTypeList from '@/components/TypeList.vue'

export default {
   data(){
        return{
            typeId:"",
            typeName:"",
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
            infoList: [],
            displayInfoList: [],
            defaultImg: 'this.src="https://img.huxiucdn.com/article/cover/201706/12/193916543047.jpg?imageView2/1/w/522/h/396/|imageMogr2/strip/interlace/1/quality/85/format/jpg"',
            defaultAvatar: 'this.src="https://img.huxiucdn.com/auth/data/avatar/2.jpg"',
            
            isMsgAlert: false,
            isMsgAlertText: "",
            modalMsg: "",
            modalMsgShow: false,

            loadState: "点击加载更多"
        }
    },
    components: {
    VFooter,VTypeList
    },
    watch: {  
        '$route' (to, from) {  
            // 如果type改变
            if(to.params.typeId !== from.params.typeId){
                this.$router.go(0)
            } 
            console.log(to,from)
        }  
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

        this.typeId  = this.$route.params.typeId
        getTypeById(this.typeId).then(res=>{
            if(res.status === 1){
                this.typeName = res.result.typeName
            }
        })
        pushInfoByTypeId(this.typeId).then(res=>{
            if(res.status === 1){
                for(let item of res.result){
                    item.isRemove = false
                }
                this.infoList = res.result
                let infoLength = this.infoList.length
                if(infoLength <= 10){
                    this.displayInfoList = this.infoList
                    this.infoList = []
                }else{
                    for(let i=0; i<10;i++){
                        this.displayInfoList[i] = this.infoList[i]
                    }
                    this.infoList.splice(0,10)
                }
                this.isMsgAlert = true
                this.isMsgAlertText = `为您推荐了6条文章`
                setTimeout(()=>{
                    this.isMsgAlert = false
                },3000)
                console.log(this.displayInfoList)
            }
        })
    },
    methods: {
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
        displayMsg(msg){
            this.modalMsg = msg
            this.modalMsgShow = true
            setTimeout(()=>{
                this.modalMsgShow = false
            },1500)
        },
        loadMore(){
            this.loadState = "加载中"
            let infoLength = this.infoList.length
            if(infoLength <= 10){
                this.displayInfoList = this.displayInfoList.concat(this.infoList)
                this.infoList.splice(0,infoLength)
                this.displayMsg("休息一下吧,暂时没有更多资讯了")
            }else{
                let length = this.displayInfoList.length
                for(let i=0; i<10;i++){
                    this.displayInfoList.push( this.infoList[i])
                }
                this.infoList.splice(0,10)
            }
            this.loadState = "点击加载更多"
        }
    },
    filters: {
        formatDateDiff(time) {
            return GetDateDiff(new Date(time));
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
   @import '../assets/css/vip_coulmn.css';

   
</style>
