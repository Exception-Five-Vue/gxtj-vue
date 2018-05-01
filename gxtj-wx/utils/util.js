const Promise = require('./Promise')
const { formatDate, GetDateDiff} = require('./DateUtil')

const REGX_HTML_DECODE = /&\w{1,};|&#\d{1,};/g;
const HTML_DECODE = {
        "&lt;"  : "<", 
        "&gt;"  : ">", 
        "&amp;" : "&", 
        "&nbsp;": " ", 
        "&quot;": "\"", 
        "&copy;": "©"
   };


function login(){
  return new Promise((resolve,reject) => wx.login({
    success:resolve,
    fail:reject
  }))
}

function getUserInfo(){
  return login().then(res => new Promise((resolve,reject) => 
    wx.getUserInfo({
      success:resolve,
      fail:reject
    })
  ))
}

function decodeHtml(str){
  return (typeof str != "string") ? str :
    str.replace(REGX_HTML_DECODE,function($0){
      var c  = HTML_DECODE[$0]
      if(c === undefined){
          var m = $0.match(/\d{1,}/);
          if(m){
              var cc = m[0];
              cc = (cc === 0xA0) ? 0x20 : cc;
              c = String.fromCharCode(cc);
          }else{
              c = $0;
          }
      }
      return c;
    }) 
}

function makeArray(num,val){
  var arr = []
  for(var i = 0; i < num ; i++){
    arr.push(typeof val !== 'undefined' ? val : i)
  }
  return arr
}
const commentList = require('../mock/comment.js')
function getCommentList() {
  return new Promise((resolve, reject) => {
    var comments = commentList.result
    resolve(comments)
  })
}
const searchInfoList = require('../mock/getInfoBySearchBar')
function getInfoBySearchBar() {
  return new Promise((resolve, reject) => {
    var searchInfos = searchInfoList.result
    resolve(searchInfos)
  })
}


const pushInfoList = require('../mock/pushInfoByTypeId')
function pushInfoByTypeId() {
  return new Promise((resolve, reject) => {
    // [{id:1,order:2...}]
    // var liked = wx.getStorageSync('USER_COLLECT') || [];
    var pushInfos = pushInfoList.result
    resolve(pushInfos)
  })
}
const searchHotWords = require('../mock/searchHotWords')
function getSearchHotWords() {
  return new Promise((resolve, reject) => {
    let result = searchHotWords.result
    resolve(result)
  })
}
const categorysJson = require('./categorys')
function getCategorys(){
  return new Promise((resolve,reject) => {
    // [{id:1,order:2...}]
    // var liked = wx.getStorageSync('USER_COLLECT') || [];
    var categorys = categorysJson.result
    resolve(categorys)
  })
}

const typeJson = require('../mock/type')
function getTypes() {
  return new Promise((resolve, reject) => {
    var typeList = typeJson.result
    resolve(typeList)
  })
}

const userReadTime = require('../mock/getUserReadTime')
function getUserReadTime() {
  return new Promise((resolve, reject) => {
    var readTime = userReadTime.result
    resolve(readTime)
  })
}
const informationJson = require('../mock/information')
function getInfos() {
  // console.log("dashdkjashdkajsh")
  // return requstGet(`/public/information//findInfoByDate`,{}).then(res=>{
  //   console.log(res)
  // })
  return new Promise((resolve, reject) => {
    // console.log(informationJson)
    var infoList = informationJson.result.filter(item => {
      return item.publishDate = formatDate(item.publishDate)
    })
    resolve(infoList)
  })
}
const detailJson = require('../mock/detail')
function getDetail() {
  console.log(detailJson)

  return new Promise((resolve, reject) => {
    detailJson.result.publishDate = formatDate(detailJson.result.publishDate)
    var detail = detailJson.result
    resolve(detail)

  })
}


const userModJson = require('../mock/userMod')
function getUserMod() {
  return new Promise((resolve, reject) => {
    var userMod = userModJson.result
    resolve(userMod)

  })
}

function requstGet(url,data){
  return requst(url,'GET',data)
}

function requstPost(url,data){
  return requst(url,'POST',data)
}

const DOMAIN = 'http://wx.diggid.cn/coverHttps.php'

// 小程序上线需要https，这里使用服务器端脚本转发请求为https
function requst(url,method,data = {}){
  // console.log("要提交的数据:",data instanceof FormData)
  let header = {}
  let p = null
  p = data
  let searchContent, infoId, data1

  if (url.search("pushInfoByKeyword") != -1) {
    header['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    infoId = data.infoId
    data1 = { "id": infoId }
    p = data1
  } else if (url.search("getInfoBySearchBar") != -1) {
    header['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    searchContent = data.searchContent
    data1 = { "searchContent": searchContent }
    p = data1
  } else if (url.search("updateUserModForRead") != -1) {
    header['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    infoId = data.infoId
    let userId = data.userId
    data1 = { "infoId": infoId, "userId": userId }
    p = data1
  } else if (url.search("makeUserRead") != -1) {
    header['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    infoId = data.infoId
    data1 = { "infoId": infoId }
    p = data1
  } 
  // else if (url.search("pushUserByLogInfo") != -1) {
  //   header['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  //   header['page'] = data.infoId

  //   p = {}
  // }
  // if (data instanceof FormData){
  //   header['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  //   if (url.search("getInfoBySearchBar")!=-1){
  //     searchContent = data.get("searchContent")
  //     data1 = {"searchContent":searchContent}
  //   } else if (url.search("pushInfoByKeyword") != -1){
  //     // infoId = data.get("infoId")
  //     // infoId = data.infoId
  //     // data1 = {"id":infoId}
  //   } else if (url.search("updateUserModForRead") != -1){
  //     console.log("url:",url)
  //     infoId = data.get("infoId")
  //     let userId = data.get("userId")
  //     data1 = { "infoId": infoId,"userId": userId }
  //   } else if (url.search("makeUserRead") != -1) {
  //     infoId = data.get("infoId")
  //     data1 = { "infoId": infoId }
  //   }
  //   p = data1
  // }
  wx.showNavigationBarLoading()
  // var rewriteUrl = encodeURIComponent(url)
  var rewriteUrl = url
  data.method = method
  let token = null
  if (wx.getStorageSync('token')){
    token = wx.getStorageSync('token')
    header.token = token
  }
  return new Promise((resove,reject) => {
    wx.request({
      url: 'http://www.yannyao.top:8000/' + rewriteUrl,
      data: p,
      header: header,
      method: method.toUpperCase(), // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        let token = null
        if(res.header.refresh){
          token = res.header.refresh
          wx.setStorageSync('token', token)
        }
        // console.log(res)
        wx.hideNavigationBarLoading()
        resove(res.data)
      },
      fail: function(msg) {
        console.log('reqest error',msg)
        wx.hideNavigationBarLoading()
        reject('fail')
      }
    })
  })
}

function parseNews(newsList){
  return newsList.map(news => {
      var {news_id:id,news_title,news_date:date,news_datetime,news_praise_count:parise,news_comment_count:commont,news_summary:summary,news_icon:icons,news_remark:tag,news_style:style,news_column_id:chid} = news
        if(style === 4){
            style = 1
            tag = 'H5'
        }
        if(parise > 99){
          parise = '99+'
        }
        if(commont > 99){
          commont = '99+'
        }
        return { id,chid,title:decodeHtml(news_title),date:date||news_datetime,parise,commont,summary,icons,style,tag }
  })
}



module.exports = {
  getInfoBySearchBar, getCommentList,
  makeArray, getCategorys, getUserInfo, Promise, getUserReadTime, getSearchHotWords,
  getTypes, getInfos, getDetail, getUserMod, pushInfoByTypeId,
  get:requstGet,post:requstPost,requst,decodeHtml,parseNews
}
