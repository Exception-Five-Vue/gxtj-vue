<template>
  <section id="type-article-list">
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
    <div class="container" id="index">
    <!--顶部通栏广告-->
    
    <div class="wrap-left pull-left">
        <div class="column-wrap">
            <span>{{typeName}}</span>
        </div>
        <!--文章列表-->
        <div class="mod-info-flow">
            <div class="msgAlert" :class="{'active': isMsgAlert}">
                <p class="msgAlert-text">{{isMsgAlertText}}</p>
            </div>
            <div class="mod-b mod-art clearfix" v-for="(info,index) in displayInfoList" v-if="!info.isRemove">
                <div class="mod-angle" v-show="info.reads>0">热</div>
                        <!--栏目链接-->
                <div class="mod-thumb pull-left ">
                    <router-link class="transition" :title="info.title" :to="`article/${info.infoId}`">
                        <img class="lazy" :src="`${info.infoImage.image}`" :onerror="defaultImg" style="display: inline;">
                    </router-link>
                </div>
                <div class="column-link-box not-interest" @click="notInterest(index)">
                 	<!-- <a href="#" class="column-link" target="_blank"> -->
                         不感兴趣
                         <i class="icon-not-interest" style="background-size: 15px 15px;"></i>
                     <!-- </a> -->
                 </div>
                <div class="mob-ctt channel-list-yh">
                    <h2>
                        <router-link :to="`/article/${info.infoId}`" class="transition msubstr-row2">{{info.title}}</router-link>
                    </h2>
                    <div class="mob-author">
                        <div class="author-face">
                            <router-link :to="`/article/${info.infoId}`">
                            <img :src="`${info.infoImage.image}`" :onerror="defaultImg">
                            </router-link>
                        </div>
                        <router-link :to="`article/${info.infoId}`">
                            <span class="author-name">{{info.author}}</span>
                        </router-link>
                        <a href="/vip" target="_blank"></a>
                        <span class="time">{{info.publishDate|formatDateDiff}}</span>
                        <i class="icon icon-cmt"></i><em>0</em>
                        <i class="icon icon-fvr"></i><em>{{info.likes}}</em>
                        <i class="icon icon-no-like" style="margin-left:20px" @click="" ></i><em>0</em>
                    </div>

                    <div class="mob-sub">{{info.description}}</div>
                </div>
            </div>
        </div>

            <div class="get-mod-more js-get-channel-more-list transition" @click="loadMore()">
                点击加载更多
            </div>
                <!--底部通栏广告-->
        
    </div>

    <div class="wrap-right pull-right">
        <!--公共右侧部分-->
        
            <!-- <div class="box-moder hot-tag">
                <h3>专题</h3>
                <span class="span-mark"></span>
                <div class="zt-article">
                        <div class="zt-article-img">
                            <a href="/special/2800.html" target="_blank" title="霍金时间简史">
                                <img src="https://img.huxiucdn.com/special/201803/14/122154736347.jpg">
                            </a>
                        </div>
                                        <ul>
                                                    <li>
                                <a href="/special/2800.html">
                                    <span class="title"> # 霍金时间简史  #</span>
                                    <span class="time pull-right">22小时前</span>
                                </a>
                            </li>
                                                    <li>
                                <a href="/special/2789.html">
                                    <span class="title"> # 卖身活命的“当当”  #</span>
                                    <span class="time pull-right">2天前</span>
                                </a>
                            </li>
                                                    <li>
                                <a href="/special/2772.html">
                                    <span class="title"> # 抖音快手终有一战  #</span>
                                    <span class="time pull-right">3天前</span>
                                </a>
                            </li>
                                                    <li>
                                <a href="/special/2418.html">
                                    <span class="title"> # 比特币的车你赶上了吗  #</span>
                                    <span class="time pull-right">2018-03-07</span>
                                </a>
                            </li>
                                                    <li>
                                <a href="/special/2768.html">
                                    <span class="title"> # 小米IPO在即  #</span>
                                    <span class="time pull-right">2018-03-05</span>
                                </a>
                            </li>
                                                    <li>
                                <a href="/special/2447.html">
                                    <span class="title"> # 中国无人车第一案  #</span>
                                    <span class="time pull-right">2018-03-05</span>
                                </a>
                            </li>
                                            </ul>
                </div>
            </div>
        
        
            <div class="placeholder"></div> -->
            <div class="box-moder hot-tag">
        		<h3>热门标签</h3>
        		<span class="pull-right project-more">
					  <!-- <a href="#" class="transition" target="_blank">全部</a> -->
				</span>
        		<span class="span-mark"></span>
        		<div class="search-history search-hot">
            		<ul>
                   	<li class="transition" v-for="item in hotKeyWords"><a href="#" target="_blank">{{item}}</a></li>
            		</ul>
        		</div>
    		</div>
            <!-- <div class="placeholder"></div>
            <div class="box-moder hot-tag">
                <h3>专栏</h3>
                <span class="span-mark"></span>
                <ul class="wj-wrap">
                                    <li>
                        <a href="/collection/55.html">
                            <img src="https://img.huxiucdn.com/article/cover/201701/03/161103077371.png">
                            <div class="tag-name">
                                品牌放大镜                            </div>
                        </a>
                    </li>
                                    <li>
                        <a href="/collection/54.html">
                            <img src="https://img.huxiucdn.com/article/cover/201701/03/161103077371.png">
                            <div class="tag-name">
                                环球商业地理                            </div>
                        </a>
                    </li>
                                    <li>
                        <a href="/collection/53.html">
                            <img src="https://img.huxiucdn.com/article/cover/201701/03/161103077371.png">
                            <div class="tag-name">
                                回忆杀                            </div>
                        </a>
                    </li>
                                    <li>
                        <a href="/collection/42.html">
                            <img src="https://img.huxiucdn.com/article/cover/201701/03/161103077371.png">
                            <div class="tag-name">
                                行业地图                            </div>
                        </a>
                    </li>
                                </ul>
            </div> -->
                <div class="placeholder"></div>
            <!--右侧热文部分-->
        <!-- <div class="wrap-right pull-right">
            <div class="box-moder hot-article">
    <h3>电商消费-热文</h3>
    <span class="span-mark"></span>
    <ul>
                <li>
            <div class="hot-article-img">
                <a href="/article/235687.html" target="_blank">
                                            <img src="https://img.huxiucdn.com/article/cover/201708/18/074450495391.jpg?imageView2/1/w/280/h/210/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                                    </a>
            </div>
            <a href="/article/235687.html" class="transition" target="_blank">京东有央视“国家品牌”护体，315还会上榜？</a>
        </li>
                <li>
            <div class="hot-article-img">
                <a href="/article/235746.html" target="_blank">
                                            <img src="https://img.huxiucdn.com/article/cover/201803/14/190635426274.jpg?imageView2/1/w/280/h/210/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                                    </a>
            </div>
            <a href="/article/235746.html" class="transition" target="_blank">是什么让H&amp;M、ZARA们慢了下来？</a>
        </li>
                <li>
            <div class="hot-article-img">
                <a href="/article/235508.html" target="_blank">
                                            <img src="https://img.huxiucdn.com/article/cover/201803/13/095417897867.jpg?imageView2/1/w/280/h/210/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                                    </a>
            </div>
            <a href="/article/235508.html" class="transition" target="_blank">吴晓波：谢谢李国庆</a>
        </li>
                <li>
            <div class="hot-article-img">
                <a href="/article/235524.html" target="_blank">
                                            <img src="https://img.huxiucdn.com/article/cover/201803/13/112309634245.jpg?imageView2/1/w/280/h/210/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                                    </a>
            </div>
            <a href="/article/235524.html" class="transition" target="_blank">在三四线城市做餐饮，怎么做才赚钱？（上）</a>
        </li>
                <li>
            <div class="hot-article-img">
                <a href="/article/235728.html" target="_blank">
                                            <img src="https://img.huxiucdn.com/article/cover/201803/14/161907651188.jpg?imageView2/1/w/280/h/210/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                                    </a>
            </div>
            <a href="/article/235728.html" class="transition" target="_blank">史努比都68岁了，这个IP为何仍如此受欢迎？</a>
        </li>
                <li>
            <div class="hot-article-img">
                <a href="/article/235497.html" target="_blank">
                                            <img src="https://img.huxiucdn.com/article/cover/201803/13/083100934554.jpg?imageView2/1/w/280/h/210/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                                    </a>
            </div>
            <a href="/article/235497.html" class="transition" target="_blank">91岁的法国时装大师辞世，奥黛丽·赫本曾说：是纪梵希创造了我</a>
        </li>
                <li>
            <div class="hot-article-img">
                <a href="/article/235586.html" target="_blank">
                                            <img src="https://img.huxiucdn.com/article/cover/201803/13/172228820715.jpg?imageView2/1/w/280/h/210/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                                    </a>
            </div>
            <a href="/article/235586.html" class="transition" target="_blank">在三四线城市做餐饮，怎么做才赚钱？（下）</a>
        </li>
                <li>
            <div class="hot-article-img">
                <a href="/article/235456.html" target="_blank">
                                            <img src="https://img.huxiucdn.com/article/cover/201803/12/202749259689.jpg?imageView2/1/w/280/h/210/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                                    </a>
            </div>
            <a href="/article/235456.html" class="transition" target="_blank">想夸麦当劳？别让汉堡王看见</a>
        </li>
                <li>
            <div class="hot-article-img">
                <a href="/article/221449.html" target="_blank">
                                            <img src="https://img.huxiucdn.com/article/cover/201711/10/062427356288.jpg?imageView2/1/w/280/h/210/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                                    </a>
            </div>
            <a href="/article/221449.html" class="transition" target="_blank">咱这智商，基本告别双十一了</a>
        </li>
                <li>
            <div class="hot-article-img">
                <a href="/article/235113.html" target="_blank">
                                            <img src="https://img.huxiucdn.com/article/cover/201803/09/095334614016.jpg?imageView2/1/w/280/h/210/|imageMogr2/strip/interlace/1/quality/85/format/jpg">
                                    </a>
            </div>
            <a href="/article/235113.html" class="transition" target="_blank">初创公司如何获得有效用户？这个没资源的公司2年作出3亿规模</a>
        </li>
            </ul>
</div>

        </div> -->
        <div class="placeholder"></div>
    </div>

</div>
   <VFooter></VFooter>
   <div class="push-wrapper" :class="{'fadeIn':isReceiveInfo ,'fadeOut': !isReceiveInfo}"   v-if="receiveInfo!=null">
        <router-link :to="`/article/${receiveInfo.infoId}`">
            <div class="title">
                <p>{{receiveInfo.title}}</p>
            </div>
            <div class="content">
                <p>{{receiveInfo.description}}</p>
                <!-- 推荐的资讯正文推荐的资讯正文推荐的资讯正文推荐的资讯正文
                推荐的资讯正文推荐的资讯正文推荐的资讯正文推荐的资讯正文 -->
            </div>
        </router-link>
        <i class="icon icon-close" @click="closePushInfo"></i>
    </div>
  </section>
</template>
<script>
import {getTypeById,getUserInfoById,requestLogin, requestRegister,getInfoByDate,pushInfoByTypeId} from '../api/api.js'
import VHeader from '@/components/Header.vue'
import VFooter from '@/components/Footer.vue'
import VueNotifications from 'vue-notifications'
import {GetDateDiff} from '../utils/date.js'
import {mapActions, mapGetters} from 'vuex'

export default {
    data () {
        return {
            typeId:"",
            typeName:"",
            userInfo: {
                username: "",
                password: "",
                nickname: "",
                userMail: "",
                userGroupId: 1
            },
            isLogined: false,
            isLoginShow: false,
            isRegisterShow: false,
            isSearchShow: false,

            isMsgAlert: true,
            isMsgAlertText: '',
            defaultImg: 'this.src="' + require('../assets/sy-img/150611228857.jpg') + '"',
            infoList: [],
            displayInfoList: [],
            receiveInfo: null,
            isReceiveInfo: false,
            page: 1,
            hotKeyWords: ['李彦宏', '电影','人工智能','自动','女性','社会','退休','SUV','收购','香港','中国','微博']

        }
    },
    computed:mapGetters(['getReceiveInfoList']),

    components:{
        VHeader,VFooter
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
                this.isMsgAlert = false
                this.isMsgAlertText = `为您推荐了${this.displayInfoList.length}条文章`
                setTimeout(()=>{
                    this.isMsgAlert = true
                },3000)
                console.log(res)
            }
        })
    },
    methods:{
        closePushInfo(){
			this.isReceiveInfo = false
		},
        webSocketConnect(){
            let token = window.localStorage.getItem("token")
            let ws = null
                if ('WebSocket' in window){
                    ws = new WebSocket("ws://localhost:8000/socketServer/"+token);    
                }    
                else if ('MozWebSocket' in window){
                    ws = new MozWebSocket("ws://localhost:8000/socketServer/"+token);    
                }
                else{
                    alert("该浏览器不支持websocket");    
                }
                let _this = this
                ws.onmessage = function(evt) {   
                    console.log(this)
                    // this.receiveInfoId = evt.data 
                    // _this.$store.commit('change', evt.data )
                    let infoId = null;
                    let index = null;
                    for(let i in _this.getReceiveInfoList){
                        if(!_this.getReceiveInfoList[i].hasPushed){
                            infoId = _this.getReceiveInfoList[i].receiveInfoId
                            index = i
                            break
                        }
                    }
                    console.log("id:"+infoId)
                    if(infoId != null){
                        console.log("id:"+infoId)
                        setTimeout(()=>{
                            getInfoByInfoId(infoId).then(res=>{
                                if(res.status === 1){
                                    console.log(res.result)
                                    _this.receiveInfo = res.result
                                    //为了有动画效果
                                    setTimeout(()=>{
                                        _this.isReceiveInfo = true
                                    },200)
                                    _this.getReceiveInfoList[index].hasPushed = true
                                }
                            })
                        },5000)
                    }
                };
                    
                ws.onclose = function(evt) {    
                    // alert("连接中断");    
                };    
                    
                ws.onopen = function(evt) {    
                    alert("连接成功");    
                };  
            
        },
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
                    this.showSuccessMsg({title:"成功",message:"已成功向您的邮箱发送帐号激活邮件,请确认"})
                }else{
                    this.showErrorMsg({title:"失败",message:"发送邮件失败"})
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
        notInterest(index){
            if(!this.isLogined){
				this.showSuccessMsg({message: "此操作需要登录"});
				return
			}
            this.displayInfoList[index].isRemove = true
            this.showSuccessMsg({title:"成功",message:"将减少推荐类似内容"})
        },
        loadMore(){
            let infoLength = this.infoList.length
            if(infoLength <= 10){
                this.displayInfoList = this.displayInfoList.concat(this.infoList)
                this.infoList.splice(0,infoLength)
                this.showInfoMsg({title:"信息",message:"休息一下吧,暂时没有更多资讯了"})
            }else{
                let length = this.displayInfoList.length
                for(let i=0; i<10;i++){
                    this.displayInfoList.push( this.infoList[i])
                }
                this.infoList.splice(0,10)
            }
        }
    },
    //通知插件
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
    metaInfo () {
        const title = ""
        return {
            title: "首页",
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
@import '../assets/bootstrap/css/bootstrap.min.css';
@import '../assets/css/build.css';
@import '../assets/css/activity.css';
@import '../assets/css/login.css';
@import '../assets/css/dlzc.css';
@import '../assets/css/zzsc.css';
@import '../assets/css/nanoscroller.css';

#index{
    font-size: 14px;
}
li.nav-news.js-show-menu ul{position: absolute; visibility: hidden; background:#fff; width:250px;  top:60px; left:-50px; z-index:9999; box-shadow:0 1px 15px rgba(18,21,21,.2);padding:10px 5px;}
#jsddm ul li{ float:left; width:105px; padding-left:20px; line-height:40px;}

</style>
