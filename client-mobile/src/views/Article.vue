<template>
  <section id="article">

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


<div class="htmlBox bgW" id="article">

   <!-- <a class="guide-box bgw js-open-app">
   <div class="pull-left guide-logo-box">
       <img src="https://static.huxiucdn.com/m/image/guide-logo.png?v=201706161525">
   </div>
   <div class="pull-left">虎不咬你，你来咬我？</div>
   <div class="pull-right btn-open c3">
       好啊
   </div>
</a>     -->
<input id="openAppType" type="hidden" value="article">
   <input type="hidden" id="vipColumnDetectionSign" value="资讯">
   <div class="placeholder-box"></div>
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
   <input hidden="" id="about-reward">
   <div id="m-article-detail-page" class="reward-page-wrap">
       <!--新版通栏大图广告  （普通文章有，视频没有）-->
                           
       
           <!--普通文章头部（标题 作者 时间 头图 ）-->
           <div class="article-content-title-box" id="article">
               <div class="title">{{information.title}}</div>
               <div class="article-author-box clearfix">
                                           <a class="author-intro-wrap fl" href="/member/1816236.html">
                           <div class="face-box fl">
                          <span class="icon-v" style="line-height: 1.8;">
                                                           </span>
                               <img class="lazy" data-original="https://img.huxiucdn.com/auth/data/avatar/001/81/62/36_1504576090.jpg" src="https://img.huxiucdn.com/auth/data/avatar/001/81/62/36_1504576090.jpg" style="display: inline;">
                           </div>
                           <span class="username fl">{{information.author}}</span>
                           <span class="icon-author fl">
                                                   </span>
                       </a>
                                       <span class="fr">{{information.publishDate|formatDateDiff}}</span>
               </div>
           </div>
           <!--头图-->
           <div class="article-content-img">
               <span class="bg-gradient"></span>
               <img class="lazy" data-original="https://img.huxiucdn.com/article/cover/201803/28/012738543020.jpg?imageView2/1/w/600/h/450/|imageMogr2/strip/interlace/1/quality/85/format/jpg" src="https://img.huxiucdn.com/article/cover/201803/28/012738543020.jpg?imageView2/1/w/600/h/450/|imageMogr2/strip/interlace/1/quality/85/format/jpg" style="display: block;">
                           </div>
       
       <!--编辑转推-->
                           
       <div cellpadding="0" cellspacing="0" class="article-box">
           <div id="article_content">
               <!--内容-->
               <div class="article-content" v-html="information.infoContent.content">
                                                   <br>
                           <div class="neirong-shouquan">
                               <span class="c2">*文章为作者独立观点，不代表Oreo网立场<br></span>
                                                           </div>
                                               <br>
                                   </div>
           </div>
       </div>

                   <!-- <div class="neirong-shouquan-public">
               <p><b>未来面前，你我还都是孩子，还不去<a href="/app.html" target="_blank">下载OreoApp</a>猛嗅创新！</b></p>
           </div> -->
       
                   <div class="art-sc-wrap">
               <!-- <h2>本文已被收藏在:</h2> -->
               <ul class="art-sc-list">
             <li v-for="(item,index) in infoKeyWord" v-if="index<=2">
                <a href="" class="column-link">{{item}}</a>
            </li>
         </ul>
           </div>
               <!--打赏-->
           <input type="hidden" class="isAuthor" value="0">
   <div class="author-reward-wrap">
       <!--关闭赞赏时 把类名open换成类名close -->
       <span class="reward-btn-wrap open js-reward-btn" data-id="237560"></span>
       <span class="reward-text-wrap">别打CALL，打钱</span>

       <div class="reward-user-wrap">
           <!--无人赞赏时 reward-user-ul加类名hide -->
           <ul class="reward-user-ul hide" id="reward-user">
                           </ul>
           <!--赞赏人数超过9时  reward-placeholder-img 去掉类名hide -->
           <div class="reward-placeholder-img hide" id="reward-placeholder-img">
               <img src="https://img.huxiucdn.com/article/cover/201801/23/195907691348.png">
           </div>
       </div>
       <!--无人赞赏时 reward-num加类名hide -->
       <div class="reward-num hide" id="reward-num-wrap"><span id="reward-num">0</span>人已赞赏</div>
   </div>
       <!--作者卡-->
           <div class="author-dy-wrap">
       <!--点击跳个人中心页-->
       <a href="/member/1816236/article">
           <div class="author-info-wrap">
               <span class="author-img-wrap">
                   <img src="https://img.huxiucdn.com/auth/data/avatar/001/81/62/36_1504576090.jpg?imageView2/1/w/150/h/150/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
               </span>
               <span class="dy-author-name">{{information.author}}</span>
               <!--vip标识-->
                               <!--认证标志 （放在作者下边）-->
                           </div>
           <!-- <div class="author-position">负能量孵化器</div> -->
       </a>
   </div>


                   <!-- <div class="share-box article-content-share">
               <div class="title fl wx-hide">
                   分享至：
                   <ul class="share-ul">
                       <li class="nativeShare js-share-detection" data-f="?f=article_weibo" data-detection="文章互动,微博,点击" data-app="sinaWeibo">
                           <i class="icon-a icon-wb"></i>
                       </li>
                       <li class="nativeShare js-share-detection" data-f="?f=article_QQZone" data-detection="文章互动,QQ空间,点击" data-app="QZone">
                           <i class="icon-a icon-qqZone"></i>
                       </li>
                   </ul>
               </div>
               <div class="article-btn-group fr">
                   <ul>
                       <li class="js-article-praise js-hmt-detection" data-detection="文章末尾,点赞,点击">
                           <i class="icon-a icon-md-praise "></i>
                           <span class="article-praise-number js-number">15</span>
                       </li>
                       <li class="js-article-collection js-hmt-detection" data-detection="文章互动,收藏,点击">
                           <i class="icon-a icon-collection "></i>
                       </li>
                   </ul>
               </div>
           </div>
           <div class="placeholder-line"></div>
           <div class="article-ad-box">
               <a href="http://analyzer.huxiu.com/event/jump?id=6&amp;source=2">
                   <img src="https://static.huxiucdn.com/m/image/ad_banner.png">
               </a>
           </div> -->

           <!--新版大图广告  （普通文章有，视频没有）-->
                                       
           <!--新版小图广告（软文）（普通文章有，视频没有）-->
                                       
           <div id="related-article-wrap">
               <!--热文推荐-->
   <div class="placeholder-line"></div>
   <div class="article-recommend-wrap">
       <h2 class="title">热&nbsp;文&nbsp;推&nbsp;荐</h2>
   </div>
   <div class="recommend-info-wrap js-recommend-info">
        <ul class="recommend-ul">
            <li v-for="info in hotInfoList">
                <a class="js-recommend-open-app js-hmt-detection">
                    <img class="recommend-article-img lazy" :src="`${info.infoImage.image}`" :onerror="defaultImg" :alt="info.title">
                    <p class="recommend-info-title">
                        <!-- <span class="recommend-open-app-text c3">打开APP阅读</span> -->
                        {{info.title}}                       </p>
                   </a>
            </li>
        </ul>
   </div>
           </div>

           <!--新版大图广告  （普通文章有，视频没有）-->
                                       
           <!--新版小图广告（软文）（普通文章有，视频没有）-->
                                                   <!-- 新版评论 (普通文章)-->
           <div class="pl-wrap">
                               <div>
   <div class="placeholder-line"></div>
   <h2 class="title">最&nbsp;新&nbsp;评&nbsp;论</h2>
   <ul class="pl-article-ul-box">
               <li class="pl-ul-li" data-id="1094467">
           <div class="praise js-pl-praise">
               <span class="praise-num"></span>
               <i class="icon-a icon-pl-praise"></i>
           </div>

           <a class="pl-content-wrap js-open-app js-pl-detection" data-type="pl-content">
               <div class="pl-face-box">
                   <img class="lazy" data-original="https://img.huxiucdn.com/auth/data/avatar/001/90/02/83_1509416057.jpg" src="https://static.huxiucdn.com/m/image/bg.png">
               </div>

               <div class="pl-article-info">
                   <div class="name">
                       <span class="fl">阿让归来</span>
                       <!-- vip认证 -->
                       
                       <!-- 团队认证 -->
                       
                   </div>

                   <div class="title">
                                               我以为会有新se呢…哎                    </div>

                   <div class="time">
                       <span class="fl">37分钟前</span>
                       <span class="pl-hf-text fr">回复</span>
                   </div>

               </div>

                           </a>
       </li>
               <li class="pl-ul-li" data-id="1094428">
           <div class="praise js-pl-praise">
               <span class="praise-num"></span>
               <i class="icon-a icon-pl-praise"></i>
           </div>

           <a class="pl-content-wrap js-open-app js-pl-detection" data-type="pl-content">
               <div class="pl-face-box">
                   <img class="lazy" data-original="https://img.huxiucdn.com/auth/data/avatar/1.jpg" src="https://static.huxiucdn.com/m/image/bg.png">
               </div>

               <div class="pl-article-info">
                   <div class="name">
                       <span class="fl">Larry.c</span>
                       <!-- vip认证 -->
                       
                       <!-- 团队认证 -->
                       
                   </div>

                   <div class="title">
                                               没新意，没惊喜，略失望                    </div>

                   <div class="time">
                       <span class="fl">1小时前</span>
                       <span class="pl-hf-text fr">回复</span>
                   </div>

               </div>

                           </a>
       </li>
           </ul>
</div>
               <a class="bottom-more-comment js-open-app js-pl-detection" data-type="pl-to-app">
                                           已有2个评论，等待你的发声
                                       <span class="b1">打开OreoAPP</span>
               </a>
           </div>
           <a class="mod-sidebar" href="/" style="display: none;">
   <div class="goTo go-to-box" style="display: none;"><i class="icon-a icon-goTo"></i></div>
</a>            <!--新版大图底部广告  （普通文章有，视频没有）-->
                                                   </div>

   <!--打赏弹层-->
   

<div class="alert-reward-wrap hide">
   <input type="hidden" id="object_id">
   <input type="hidden" id="object_type" value="1">
   <div class="reward-content-wrap">
       <i class="close-icon icon-a js-close-reward"></i>

       <p class="reward-title">好的内容，值得赞赏</p>
       <p class="reward-remark">您的赞赏金额会直接进入作者的Oreo账户</p>

       <div class="reward-money-wrap">
           <ul class="reward-money-ul js-money"></ul>
           <div class="reward-money-custom money-current js-money-custom">
               <span id="custom-text">自定义</span>
               <div id="custom-input-wrap" class="hide custom-input-wrap">
                   <input type="number" class="custom-inp js-custom-inp">
               </div>
           </div>
       </div>

       <div>
           支付:&nbsp;<span class="reward-sure-money js-reward-money"></span><span class="reward-sure-money">元</span>
       </div>

       <div class="reward-pl-wrap">
           <div class="reward-inp-wrap">
               <input type="text" class="reward-pl-inp js-reward-pl-inp" maxlength="15" placeholder="写的太赞了">
           </div>
           <label>
               <input type="checkbox" class="js-isAnonymity" hidden="">
               <i class="icon-a anonymity-icon js-anonymity-icon"></i>
               匿名赞赏
           </label>
       </div>
       <div class="reward-to-pay-wrap">
           <a class="b1 js-reward-to-pay">支付</a>
       </div>

   </div>
</div>


   <VFooter></VFooter>

</div>




<audio controls="controls" style="display: none;"></audio></body>
  </section>
</template>
<script>
import {getInfoByInfoId,getInfoByDate} from '../api/api.js'
import VFooter from '@/components/Footer.vue'
import VTypeList from '@/components/TypeList.vue'
import {GetDateDiff} from '../utils/date.js'

export default {
    data(){
        return{
            userInfo: {},
            isLogined: false,
            isHeaderBoxShow: false,
            infoId:"",
            information: {},
            searchBoxShow:false,
            hotInfoList: null,
            defaultImg: 'this.src="https://img.huxiucdn.com/article/cover/201706/12/193916543047.jpg?imageView2/1/w/522/h/396/|imageMogr2/strip/interlace/1/quality/85/format/jpg"',
            modalMsg: "",
            modalMsgShow: false,
            infoKeyWord: []
        }
    },
    components: {
        VFooter,VTypeList
    },
    mounted(){
        this.infoId  = this.$route.params.id
        getInfoByInfoId(this.infoId).then(res=>{
            if(res.status === 1){
                console.log(res)
                this.information = res.result
                this.infoKeyWord = this.information.keyword.split(",");
            }
        })
        getInfoByDate(1).then(res=>{
			if(res.status === 1){
				console.log("文章:",res.result)
				this.hotInfoList = res.result
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
    },
    metaInfo () {
        const title = ""
        return {
            title: this.information.title,
            meta:[{
                vmid: 'referrer',
                name: 'referrer',
                content: 'never'
            }]
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
   
</style>
