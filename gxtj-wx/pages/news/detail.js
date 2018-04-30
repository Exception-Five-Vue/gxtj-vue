const $vm = getApp()

const { post, getDetail, getCommentList} = $vm.utils

// const HtmlToJson = require('../../utils/wxParse/html2json.js').html2json;
// const strDiscode = require('../../utils/wxParse/wxDiscode.js').strDiscode

const WxParse = require('../../utils/wxParse/wxParse.js');
const { formatDate, GetDateDiff } = require('../../utils/DateUtil')


Page({
    data:{
        wxParseData:[],
        article:{},
        commentList: [],
        style:0,
        relatedInfos: [],
        infoId: null,
        timer: null,
        timer2: null,
        logInfo: []
    },
    onUnload(){
      clearInterval(this.timer)
      clearTimeout(this.timer2)

    },
    onLoad:function(options){
        // if(options.tag.toLowerCase() === 'h5'){
        //     return wx.showModal({
        //         title:'无法打开H5',
        //         content:'小程序目前不能跳转外链，此H5页面无法打开！',
        //         confirmText:'我晓得了',
        //         confirmColor:'#d81e06',
        //         showCancel:false,
        //         success(){
        //             wx.navigateBack()
        //         }
        //     })
        // }
        // this.setData({style:options.style})
        this.infoId = options.id
        this.getArticleDetail(options)
        this.getComments()
        this.getRelatedInfos(options)
    },
    imageError(e){
      var _errImg = e.target.dataset.img
      console.log(_errImg)
      var _errObj = {}
      _errObj[_errImg] = "https://img.huxiucdn.com/auth/data/avatar/2.jpg"
      this.setData(_errObj) //注意这里的赋值方式,只是将数据列表中的此项图片
    },
    updateUserRead(){
      $vm.utils.get(`/api/logInfo/getLogInfos`).then(res => {
        if(res.status === 1){
          this.logInfo = res.result
          let logId
          for(let log of this.logInfo){
            if (log.infoId !== parseInt(this.infoId)){continue}
            logId = log.logId
          }
          this.timer = setInterval(() => {
            let nowDate = new Date().getTime()
            let param = {
              logId: logId,
              endTime: nowDate
            }
            $vm.utils.post(`/api/logInfo/getNewEndTime`,param).then(res2 => {
              if(res2.status === 1){
                console.log("更新成功")
              }
            })
          },5000)

          this.timer2 = setTimeout(()=>{
            let param = {
              "userId": wx.getStorageSync('userId'),
              "infoId": this.infoId
            }
            console.log("userId!!:", wx.getStorageSync('userId'))
            $vm.utils.post(`/api/userMod/updateUserModForRead`,param).then(res => {
              console.log("模型是否更新:",res)
              if (res.status === 1) {
                console.log("模型更新成功")
              }
            })

            let param2 = {
              "infoId": this.infoId
            }
            $vm.utils.post(`/api/userRead/makeUserRead`, param2).then(res => {
              if (res.status === 1) {
                console.log("阅读记录更新成功")
              }
            })

              
          },5000)
        }
      })

    },
    getComments(){
      $vm.utils.get(`/public/information/${this.infoId}/comment`).then(res => {
        if(res.status === 1){
          this.commentList = res.result.filter(item => {
            return item.createTime = GetDateDiff(new Date(item.createTime))
          })
          for(let c of this.commentList){
            if (!c.userInfo.userImageUrl) {
              return
            }
            if (c.userInfo.userImageUrl.search("wx.qlogo.cn") == -1) {
              console.log("!!!1:", c)

              c.userInfo.userImageUrl = `http://www.yannyao.top:8000/${c.userInfo.userImageUrl}`
            }
          }
          this.setData({
            commentList: this.commentList
          })
        }
      })
    },
    addComment(event){
      let content = event.detail.value
      let param = {}
      param.userId = parseInt(wx.getStorageSync('userId'))
      console.log('userId', wx.getStorageSync('userId'))
      param.parentCommentId = null
      param.replyUserId = null
      param.content = content
      $vm.utils.post(`/public/information/${this.infoId}/comment`, param).then(res => {
        if (res.status === 1) {

          console.log("评论结果:", res)
          this.getComments()
          this.setData({
            commentInput: ""
          })
        }
      })

    },
    getRelatedInfos(options){
      // let param = new FormData()
      // param.append("infoId", options.id)
      let param = {
        infoId: options.id
      }
      $vm.utils.post(`/api/push/pushInfoByKeyword`,param).then(res => {
        if (res.status === 1) {
          res.result.splice(0,1)
          for(let i=0;i<5;i++){
            this.data.relatedInfos.push(res.result[i])
          }
          this.setData({
            relatedInfos: this.data.relatedInfos,
          })
          console.log("相关新闻:", this.data.relatedInfos)

        }
      })

    },
    getArticleDetail(options){
      let id = options.id
      
      $vm.utils.post(`/public/information/getInfoByInfoId/${id}`).then(res=>{
        if(res.status === 1){
          this.updateUserRead()
          this.article = res.result
          this.article.publishDate = formatDate(this.article.publishDate)
          let content = this.article.infoContent.content;
          // content = HtmlToJson(content)
          // this.setData({ wxParseData: content})
          var that = this;
          WxParse.wxParse('content', 'html', content, that, 5)
          this.setData({
            article: this.article
          })
        }
      })
    },
    likeArticle(event) {
      let infoId = event.target.dataset.id
      // console.log(infoId)
    },
    // getArticleDetail(opt){
    //     post('/news/detail.html',{news_id:opt.id,chid:opt.chid}).then(res => {

    //         var data = res.newsDetail
    //         var {news_title:title,news_date:date,news_praise_count:praise,news_comment_count:comment,news_source:tag} = data
    //         // 专题页面
    //         if(data.news_blocks && data.news_blocks.length){
    //              this.setData({
    //                 article:{ title,date,praise,comment,tag}
    //             })
    //             return wx.showToast({title:'目前不支持解析专题页面'})
    //         }

    //         // var article = data = strDiscode(data.news_content);
    //         // var json = HtmlToJson(article)
    //         // this.setData({wxParseData:json})
    //         WxParse.wxParse('html',data.news_content,this)
    //         this.setData({
    //             article:{ title,date,praise,comment,tag}
    //         })
            
    //     }).catch(err => console.log(err))
    // }
})