<template>
  <section id="index">
    <body style="">
    <div id="wx_pic" style="margin:0 auto;display:none;">
            <img src="https://img.huxiucdn.com/article/cover/201703/11/175600370063.png">
    </div>

    <div id="qr_code_pc" class="qr_code_pc">
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
        <a class="active" href="/">资讯</a>
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
                <router-link class="login-link b1" :to="`/register`">极速注册</router-link>
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

        <button class="input-sm-search js-search" @click="handleSearch"><i class="icon icon-sm-search"></i>
        </button>
        <input type="search" name="s" id="top-search" class="search-input" placeholder="输入关键词" v-model="searchContent">
        <a class="close-box js-search-cancel" @click="searchBoxShow = false">取消</a>
    </div>
    <div class="search-act search-history-act">
        搜索历史
    </div>
    <ul class="search-ul search-history">
        <li><a href="/search.html?s=数码">数码</a></li>
        <li><a href="/search.html?s=互联网">互联网</a></li>
        <li><a href="/search.html?s=数码">数码</a></li>
        <li><a href="/search.html?s=数互联网码">互联网</a></li>
    </ul>
            <div class="search-act search-hot">
            热搜词
        </div>
        <ul class="search-ul search-hot">
                    <li v-for="item in searchHotWords"><a href="">{{item}}</a></li>
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
       <div class="msgAlert" :class="{'active': isMsgAlert}">{{isMsgAlertText}}</div>

</header>
<div class="modal-message" v-show="modalMsgShow">
    <span class="title">{{modalMsg}}</span>
</div>
    <div class="list-content" id="list-content">
                    <div class="swipe-index-top swiper-pagination-clickable swiper-pagination-bullets" style="margin-left: -0.375rem;"><span class="swiper-pagination-bullet"></span><span class="swiper-pagination-bullet"></span><span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span></div>
            <div id="slider" class="swipe swiper-container-horizontal" v-if="displayInfoList != null">
                <ul class="swipe-wrap swiper-wrapper" id="swipeWrap" style="transform: translate3d(-1125px, 0px, 0px); transition-duration: 0ms;">
                    <li class="figure swiper-slide swiper-slide-duplicate" data-swiper-slide-index="2" style="width: 375px;">
                            <div class="wrap">
                                <section class="article-big-box">
                                    <a href="/article/237357.html">
                                            <div class="article-big-title-box">
                                                <h1 class="head-article-title">{{displayInfoList[0].title}}</h1>
                                            </div>
                                            <img class="image" :src="`${displayInfoList[0].infoImage.image}`" :onerror="defaultImg" :alt="displayInfoList[0].title">
                                            <!-- <div class="image" style="background:url('https://img.huxiucdn.com/article/cover/201803/26/185852382725.jpg?imageView2/1/w/1350/h/1011/|imageMogr2/strip/interlace/1/quality/85/format/jpg') center no-repeat;background-size: cover"></div> -->
                                    </a>
                                </section>
                            </div>
                        </li>
                    <li class="figure swiper-slide" data-swiper-slide-index="0" style="width: 375px;">
                        <div class="wrap">
                            <section class="article-big-box">
                                <a href="/article/237397.html">
                                    <div class="article-big-title-box">
                                        <h1 class="head-article-title">{{displayInfoList[0].title}}</h1>
                                    </div>
                                     <img class="image" :src="`${displayInfoList[0].infoImage.image}`" :onerror="defaultImg" :alt="displayInfoList[0].title">

                                    <!-- <div class="image" style="background:url('https://img.huxiucdn.com/article/cover/201803/27/081101101769.jpg?imageView2/1/w/1350/h/1011/|imageMogr2/strip/interlace/1/quality/85/format/jpg') center no-repeat;background-size: cover"></div> -->
                                </a>
                            </section>
                        </div>
                    </li>

                    <!--带广告（ok）-->
                                            <li class="figure swiper-slide swiper-slide-prev" data-swiper-slide-index="1" style="width: 375px;">
                            <div class="wrap">
                                <section class="article-big-box">
                                    <a href="/article/237376.html">
                                            <div class="article-big-title-box">
                                                <h1 class="head-article-title">{{displayInfoList[0].title}}</h1>
                                            </div>
                                                                                                                            <div class="image" style="background:url('https://img.huxiucdn.com/article/cover/201803/26/231352298623.jpg?imageView2/1/w/1350/h/1011/|imageMogr2/strip/interlace/1/quality/85/format/jpg') center no-repeat;background-size: cover"></div>
                                    </a>
                                </section>
                            </div>
                        </li>
                        <li class="figure swiper-slide swiper-slide-active" data-swiper-slide-index="2" style="width: 375px;">
                            <div class="wrap">
                                <section class="article-big-box">
                                    <a href="/article/237357.html">
                                    <div class="article-big-title-box">
                                        <h1 class="head-article-title">{{displayInfoList[0].title}}</h1>
                                    </div>
                                    <img class="image" :src="`${displayInfoList[0].infoImage.image}`" :onerror="defaultImg" :alt="displayInfoList[0].title">

                                     <!-- <div class="image" style="background:url('https://img.huxiucdn.com/article/cover/201803/26/185852382725.jpg?imageView2/1/w/1350/h/1011/|imageMogr2/strip/interlace/1/quality/85/format/jpg') center no-repeat;background-size: cover"></div> -->
                                    </a>
                                </section>
                            </div>
                        </li>
                                    <li class="figure swiper-slide swiper-slide-duplicate swiper-slide-next" data-swiper-slide-index="0" style="width: 375px;">
                        <div class="wrap">
                            <section class="article-big-box">
                                <a href="/article/237397.html">
                                    <div class="article-big-title-box">
                                        <h1 class="head-article-title">贸易战里的套路和陷阱</h1>
                                    </div>
                                    <div class="image" style="background:url('https://img.huxiucdn.com/article/cover/201803/27/081101101769.jpg?imageView2/1/w/1350/h/1011/|imageMogr2/strip/interlace/1/quality/85/format/jpg') center no-repeat;background-size: cover"></div>
                                </a>
                            </section>
                        </div>
                    </li></ul>
            </div>
                <div class="placeholder-line"></div>

        <!-- <div class="article-wrap">
            <div class="related-article-wrap">
                <ul class="rec-article-feed-ul  article-hp-feed">
                
                                    <li>
                                                <div class="article-hp-info">
                                                            <a href="/article/237362.html" class="rec-article-pic fr">
                                    <img class="lazy" data-original="https://img.huxiucdn.com/article/cover/201803/26/232958024616.jpg?imageView2/1/w/522/h/396/|imageMogr2/strip/interlace/1/quality/85/format/jpg" style="display: inline;" src="https://img.huxiucdn.com/article/cover/201803/26/232958024616.jpg?imageView2/1/w/522/h/396/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                                </a>
                            
                            <div class="rec-article-info">
                                <a href="/article/237362.html">
                                    <h2>
                                        <span>《绝地求生》接下来如何求生？</span>
                                    </h2>
                                </a>

                                <div class="rec-article-time clearfix">

                                                <span class="rec-author fl">
蜜蜂观察                                                </span>
                                            <span class="fl">8小时前</span>

                                </div>
                            </div>
                        </div>
                    </li>
                
                                    <li>
                                                <div class="article-hp-info" data-id="">

                                                            <a class="rec-article-pic fr" href="/article/237376.html">
                                    <img class="lazy" data-original="https://img.huxiucdn.com/article/cover/201803/26/231352298623.jpg?imageView2/1/w/522/h/396/|imageMogr2/strip/interlace/1/quality/85/format/jpg" style="display: inline;" src="https://img.huxiucdn.com/article/cover/201803/26/231352298623.jpg?imageView2/1/w/522/h/396/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                                </a>
                            
                            <div class="rec-article-info">
                                <a href="/article/237376.html">
                                    <h2>
                                        <span>寻找币圈“始祖”</span>
                                    </h2>
                                </a>
                                <div class="rec-article-time clearfix">

                                           <span class="rec-author fl">
                                                    一本财经                                                </span>

                                                                                                    <span class="fl">
                                                        9小时前                                                    </span>
                                                <span class="fr">
                                                    <em>85</em>人收藏
                                                </span>
                                </div>
                            </div>
                        </div>
                    </li>
                
                                </ul>
            </div>
            <div class="placeholder-line"></div>
            
            <div class="index-ad-box">
                <a href="http://analyzer.huxiu.com/event/jump?id=7&amp;source=2">
                    <img src="https://static.huxiucdn.com/m/image/moment_ad_banner.png">
                </a>
            </div> -->

            
            <div class="placeholder-line"></div>
            <!--广告下边文章 new-->
            <div class="related-article-wrap">
                <ul class="rec-article-feed-ul article-hp-feed js-article-append-box"  v-if="displayInfoList != null"> 
                    <!--小图广告-->
 
                           
                                                            
                                <li v-for="(info,index) in displayInfoList" v-if="index >= 1 ">
                                <!--转推语-->
                                  <div class="article-hp-info" data-id="">

                                    <router-link class="rec-article-pic fr" :to="`/article/${info.infoId}`">
                                        <img class="lazy" style="display: inline;" :src="`${info.infoImage.image}`" :onerror="defaultImg" :alt="info.title">
                                    </router-link >
                                    
                                    <div class="rec-article-info">
                                        <router-link :to="`/article/${info.infoId}`">
                                            <h2>
                                                <span>{{info.title}}</span>
                                            </h2>
                                        </router-link>
                                        <div class="rec-article-time clearfix">
                                            <!--是赞助文章-->
                                            
                                                <!--是专题开始-->
                                                                                                <!--不是专题开始-->
                                                    <!--收藏数大于0开始-->
                                                          <span class="rec-author fl">
                                                            <!--作者名称展示长度 = 总长度 - 收藏数展示总长度（收藏数大于0）- 5（人收藏 + 两个空格）-->
                                                            {{info.author}}                                                        </span>

                                                        <!--时间展示逻辑 {总长度 - 作者名称展示长度 - 收藏数展示总长度（收藏数大于0）- 5（人收藏 + 两个空格）} 大于等于 5 -->
                                                                                                                    <span class="fl">
                                                                {{info.publishDate|formatDateDiff}}                                                          </span>
                                                                                                                <!-- 收藏展示逻辑： 收藏数大于0 -->
                                                        <span class="fr">
                                                            <em>0</em>人评论
                                                        </span>
                                                    <!--收藏数大于0结束-->

                                                                                                        <!--无收藏数结束-->

                                                                                                <!--不是专题结束-->
                                                                                    </div>
                                    </div>
                                </div>
                            </li>                                                                                                                                         </ul>
            </div>
        </div>
        <div class="bottom-more js-more-article" @click="loadMore">
            {{loadState}}
        </div>
    </div>

<VFooter></VFooter>
</div>

<audio controls="controls" style="display: none;"></audio>
</body>
  </section>
</template>

<script>
import {getInfoByDate,getUserInfoById,pushUserByLogInfo} from '../api/api.js'
import VTypeList from '@/components/TypeList.vue'
import VFooter from '@/components/Footer.vue'
import {GetDateDiff} from '../utils/date.js'

export default {
    data(){
        return {
            userInfo: {},
            isLogined: false,
            isHeaderBoxShow: false,
            searchBoxShow: false,
            defaultImg: 'this.src="' + require('../assets/image/150611228857.jpg') + '"',
            defaultAvatar: 'this.src="https://img.huxiucdn.com/auth/data/avatar/2.jpg"',
            modalMsg: "",
            modalMsgShow: false,

            isMsgAlert: false,
            isMsgAlertText: "",
            page: 1,
            loadState: "点击加载更多",
            infoList: null,
            displayInfoList: null,
            searchContent: "",
            searchHotWords: ['Uber','科技','健康','AI','检察院','香港','创业','律师','医生','国企','合同法','普京']

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
        this.initData()
        
    },
    methods: {
        initData(){
            if(!this.isLogined){
                getInfoByDate(1).then(res=>{
                    console.log(res.result)
                    if(res.status === 1){
                        this.displayInfoList = res.result
                        this.isMsgAlert = true
                        this.isMsgAlertText = `为您推荐了${this.displayInfoList.length}条文章`
                        setTimeout(()=>{
                            this.isMsgAlert = false
                        },3000)
                    }
                })
            }else{
                pushUserByLogInfo().then((res)=>{
                    if(res.status === 1){
                        console.log("文章:",res.result)
                        /* 设置文章为已读或未读 */
                        let infos = res.result
                        // for(let info of infos){
                        //     info.isRemove = false
                        //     info.isRead = false
                        //     for(let log of this.logInfoList){
                        //         if(log.infoId === info.infoId){
                        //             console.log(info.title+"已经读过")
                        //             info.isRead = true
                        //         }
                        //     }
                        // }
                        console.log(infos)
                        // for(let item of this.infoList){
                        //     item.isRemove = false
                        // }
                        this.infoList = infos
                        let infoLength = this.infoList.length
                        this.displayInfoList = []
                        if(infoLength <= 10){
                            this.displayInfoList = this.infoList
                        }else{
                            for(let i=0; i<10;i++){
                                this.displayInfoList[i] = this.infoList[i]
                            }
                            this.infoList.splice(0,10)
                        }
                        this.isMsgAlert = true
                        this.isMsgAlertText = `为您推荐了${this.displayInfoList.length}条文章`
                        setTimeout(()=>{
                            this.isMsgAlert = false
                        },3000)
                        
                    }
                    
                })
            }
            
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
        handleSearch(){
            if(this.searchContent===""){return}
            this.$router.push({name:'search',params: { searchContent: this.searchContent}})
        },
        displayMsg(msg){
            this.modalMsg = msg
            this.modalMsgShow = true
            setTimeout(()=>{
                this.modalMsgShow = false
            },1500)
        },
        loadMore(){
            // if(!this.isLogined){
                this.page += 1
                this.loadState = "加载中"
                getInfoByDate(this.page).then((res)=>{
                    console.log(res)
                    if(res.status === 1){
                        // for(let obj of res.result){
                        for(let item of res.result){
                            item.isRemove = false
                        }
                        this.displayInfoList = this.displayInfoList.concat(res.result)
                        // }
                        this.loadState = "点击加载更多"
                    }
                })
            }
        // }

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
   
</style>
