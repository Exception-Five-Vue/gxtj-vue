//index.js
//获取应用实例
const $vm = getApp()

const cache = Object.create(null)

const { pushInfoByTypeId, getTypes, decodeHtml, parseNews, getCategorys} = $vm.utils
const { formatDate, GetDateDiff } = require('../../utils/DateUtil')


Page({
    _isLoading:false,
    data: {
        swiperList:[],
        articles:[],
        infoList:[],
        displayInfoList: [],
        commentList: []
    },
    onShow(){

    },
    onReady(){
        // this.getPushInfo()
    },
    onLoad: function(option) {
      let typeId = JSON.parse(option.type).typeId
      $vm.utils.get('/public/comment/all').then(res1 => {
        console.log("获取评论:", res1)
        if (res1.status === 1) {
          this.commentList = res1.result
          $vm.utils.get(`/public/push/pushInfoByTypeId/${typeId}`).then(res=>{
            console.log(res)
            this.infoList = res.result.filter(item => {
              return item.publishDate = formatDate(item.publishDate)
            })
            for (let info of this.infoList) {
              info.commentCount = 0
              for (let c of this.commentList) {
                if (info.infoId === c.infoId) {
                  info.commentCount += 1
                }
              }
              console.log("此篇文章评论量:", info.commentCount)
            }
            let length = this.infoList.length

            if (length <= 10) {
              for (let i = 0; i < length; i++) {
                this.data.displayInfoList.push(this.infoList[i])
              }
              this.infoList.splice(0, length)
            } else {
              for (let i = 0; i < 10; i++) {
                this.data.displayInfoList.push(this.infoList[i])
              }
              this.infoList.splice(0, 10)
            }
            this.setData({
              displayInfoList: this.data.displayInfoList,
              Type: JSON.parse(option.type)
            })
          })
        }
      })
    },
    getTypeList(){
      getTypes().then(res=>{
        this.setData({
            typeList: res
        })
      })
    },
    // 页面相关事件处理函数--监听用户下拉动作，下拉刷新
    onPullDownRefresh(){

    },
    // 到达底部，重新加载
    onReachBottom(){
      let length = this.infoList.length
      if (length <= 10) {
        this.data.displayInfoList = this.data.displayInfoList.concat(this.infoList)
        this.infoList.splice(0, length)
        $vm.toastShow(this, "休息一会吧", "icon-correct");
      } else {
        for (let i = 0; i < 10; i++) {
          this.data.displayInfoList.push(this.infoList[i])
        }
        this.infoList.splice(0, 10)
      }
      this.setData({
        displayInfoList: this.data.displayInfoList
      })
    },
    // 切换当前选择的分类
    changeType(event){
      var Type = event.target.dataset.type
      cosole.log("dasdsad")
      console.log(typeId)
      this.setData({
        Type
      })
        // 获取ccurrentTab.没有切换分类
        // if(this.data.currentTab === chid){
        //     return false
        // }
        // this.setData({ currentTab:chid })
        // this.getNewsList(chid,0)
    },
    getNewsList(chid = 0,page = 0){
        
        // if(!cache[chid]){
        //     // 新内容
        //     cache[chid] = {slides:[],news:[],page:0,time:Date.now()}
        // }
        // var infos = cache[chid]
        // // 获取下一页数据
        // if(page){
        //     // 加载中。无法触发
        //     if(this._isLoading){
        //         return false;
        //     }
        //     infos.page += 1
        // }else{
        //     // 直接从缓存中取出
        //     if(infos.news.length){
        //         this.setData({
        //             swiperList:infos.slides,
        //             articles:infos.news
        //         })
        //         return false
        //     }
        // }

        

        // this._isLoading = true
        
        // $vm.utils.post('v2/news/list.html',{chid:chid,page:infos.page}).then(res => {
        //     this._isLoading = false

        //     var {code,newsList,newsBanner} = res
        //     if(code === 0){
        //         // 新闻管理
        //         // style 3下面三张图，1,下面一张大图，2.普通模式，0.无图模式
        //         if(newsList && newsList.length){
        //             // infos.news = []
        //             var datas = parseNews(newsList)
        //             infos.news.push(...datas)
        //         }
        //         // 轮播管理
        //         if(newsBanner && newsBanner.length){
        //             // infos.slides = []
        //             var banners = newsBanner.map(news => {
        //                 return {
        //                     id:news.news_id,
        //                     title:news.news_title,
        //                     image:news.news_icon.pop(),
        //                     style:news.news_style
        //                 }
        //             })
        //             infos.slides.push(...banners)
        //         }
        //         this.setData({
        //             swiperList:infos.slides,
        //             articles:infos.news
        //         })
        //     }
            
        // }).catch(err =>console.log(err))

    },
    manageTabs(){
        wx.navigateTo({
            url:'/pages/news/manage'
        })
    }
})