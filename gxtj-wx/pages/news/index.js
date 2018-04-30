//index.js
//获取应用实例
const $vm = getApp()

const cache = Object.create(null)

const { getInfos, getTypes, decodeHtml, parseNews, getCategorys} = $vm.utils

const { formatDate, GetDateDiff } = require('../../utils/DateUtil')

Page({
    _isLoading:false,
    data: {
        swiperList:[],
        articles:[],
        categoryTabs:[],
        currentTab:0,
        Type:{},
        isMsgAlert: true,
        displayInfoList: [],
        infoList: [],
        alertMsg:"",
        commentList: [],
        page: 1
    },
    onShow(){
        this.getTypeList()
        this.getInfoList()
    },
    onReady(){

    },
    onLoad: function() {

    },
    handleSearch(){
      wx.navigateTo({
        url: '/pages/news/search'
      })
    },
    getTypeList(){
      $vm.utils.get('public/type/getAllType').then(res => {
        console.log(res)
        $vm.globalData.typeList = res.result
        this.setData({
          typeList: res.result
        })
      })
    },
    getInfoList() {
      this.data.page = 1
      this.data.infoList = []
      this.data.displayInfoList = []
      this.data.swiperList = []
      $vm.utils.get('/public/comment/all').then(res1 => {
        console.log("获取评论:",res1)
        if(res1.status === 1){
          this.commentList = res1.result
          if (wx.getStorageSync('token')){
            $vm.utils.post('/api/push/pushUserByLogInfo').then(res => {
              // console.log(res)
              if (res.status === 1) {

                // $vm.toastShow(this, "休息一会吧", "icon-correct");  
                // wx.showToast({ title: '休息一会吧,暂无新的资讯', duration: 2000 })      
                let infoList = res.result.filter(item => {
                  return item.publishDate = formatDate(item.publishDate)
                })
                this.infoList = infoList
                for (let info of this.infoList) {
                  info.commentCount = 0
                  for (let c of this.commentList) {
                    if (info.infoId === c.infoId) {
                      info.commentCount += 1
                    }
                  }
                  console.log("此篇文章评论量:", info.commentCount)
                }
                
                this.data.swiperList.push(infoList[0])
                this.data.swiperList.push(infoList[1])
                this.data.swiperList.push(infoList[2])
                infoList.splice(0, 3)
                let length = this.infoList.length

                if (length <= 10) {
                  this.data.displayInfoList = this.infoList
                  this.infoList.splice(0, length)

                } else {

                  for (let i = 0; i < 10; i++) {
                    this.data.displayInfoList.push(this.infoList[i])
                  }
                  this.infoList.splice(0, 10)
                }
                console.log("!!!:", this.data.displayInfoList)
                this.alertMsg = `为您推荐了${this.data.displayInfoList.length}条新闻`

                this.setData({
                  displayInfoList: this.data.displayInfoList,
                  swiperList: this.data.swiperList,
                  isMsgAlert: this.isMsgAlert,
                  alertMsg: this.alertMsg
                })
                setTimeout(() => {
                  this.isMsgAlert = false
                  this.setData({
                    isMsgAlert: this.isMsgAlert,
                  })
                }, 2000)

              }
            })
          }else{
            console.log("没有登录!!!!")
            $vm.utils.get(`/public/information/findInfoByDate/${this.data.page}`).then(res => {
              // console.log(res)
              if (res.status === 1) {

                let infoList = res.result.filter(item => {
                  return item.publishDate = formatDate(item.publishDate)
                })
                this.infoList = infoList


                this.data.swiperList.push(infoList[0])
                this.data.swiperList.push(infoList[1])
                this.data.swiperList.push(infoList[2])
                infoList.splice(0, 3)
                let length = this.infoList.length

                if (length <= 10) {
                  this.data.displayInfoList = this.infoList
                  this.infoList.splice(0, length)
                } else {

                  for (let i = 0; i < 10; i++) {
                    this.data.displayInfoList.push(this.infoList[i])
                  }
                  this.infoList.splice(0, 10)
                }

                console.log("!!!:", this.data.displayInfoList)
                this.alertMsg = `为您推荐了${this.data.displayInfoList.length}条新闻`

                this.setData({
                  displayInfoList: this.data.displayInfoList,
                  swiperList: this.data.swiperList,
                  isMsgAlert: this.isMsgAlert,
                  alertMsg: this.alertMsg
                })
                setTimeout(() => {
                  this.isMsgAlert = false
                  this.setData({
                    isMsgAlert: this.isMsgAlert,
                  })
                }, 2000)

              }
            })
          }

        }
        
      })
    },
    // 页面相关事件处理函数--监听用户下拉动作，下拉刷新
    onPullDownRefresh(){
        // 刷新页面，清空当前的缓存，重新获取
        var chid = this.data.currentTab
        // 命中缓存
        if(cache[chid]){
            cache[chid] = {slides:[],news:[],page:0,time:Date.now()}
        }
        this.getNewsList(chid)
    },
    // 到达底部，重新加载
    onReachBottom(){
      if(wx.getStorageSync("token")){
        let length = this.infoList.length
      
        if (length <= 10) {
          this.data.page += 1
          let page = this.data.page
          console.log("当前页数:",page)
          
          $vm.utils.get(`/public/information/findInfoByDate/${page}`).then(res => {
            // console.log(res)
            if (res.status === 1) {

              let infoList = res.result.filter(item => {
                return item.publishDate = formatDate(item.publishDate)
              })
              console.log(this.infoList,infoList)
              this.data.displayInfoList = this.data.displayInfoList.concat(infoList)

              this.setData({
                displayInfoList: this.data.displayInfoList,
              })

            }
          })
          // this.data.displayInfoList = this.data.displayInfoList.concat(this.infoList)
          // this.infoList.splice(0, length)
          // $vm.toastShow(this, "休息一会吧", "icon-correct");
        } else {
          for (let i = 0; i < 10; i++) {
            this.data.displayInfoList.push(this.infoList[i])
          }
          this.infoList.splice(0, 10)
        }
        this.setData({
          displayInfoList: this.data.displayInfoList
        })

      }else{//没有登录
        console.log("没有登录!!!")
        this.data.page += 1
        let page = this.data.page
        $vm.utils.get(`/public/information/findInfoByDate/${page}`).then(res => {
          // console.log(res)
          if (res.status === 1) {

            let infoList = res.result.filter(item => {
              return item.publishDate = formatDate(item.publishDate)
            })
            this.data.displayInfoList = this.data.displayInfoList.concat(infoList)
           
            this.setData({
              displayInfoList: this.data.displayInfoList,
            })

          }
        })
      }
      
    },
    //切换到推荐
    changeToRecommond(event){
      wx.navigateTo({
        url: `/pages/news/index`
      })
    },
    // 切换当前选择的分类
    changeType(event){
        var Type = JSON.stringify(event.target.dataset.type)
        wx.navigateTo({
          url: `/pages/news/type?type=${Type}`
        })
        // 获取ccurrentTab.没有切换分类
        // if(this.data.currentTab === chid){
        //     return false
        // }
        // this.setData({ currentTab:chid })
        // this.getNewsList(chid,0)
    },
    changeData(e){
      console.log("改变数据了",e)
    },
    manageTabs(){
        wx.navigateTo({
            url:'/pages/news/manage'
        })
    }
})