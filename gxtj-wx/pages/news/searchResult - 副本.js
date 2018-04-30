//index.js
//获取应用实例
const $vm = getApp()

const cache = Object.create(null)

const { getInfoBySearchBar, getInfos, getTypes, decodeHtml, parseNews, getCategorys } = $vm.utils

const WxParse = require('../../utils/wxParse/wxParse.js');

Page({
  _isLoading: false,
  data: {
    swiperList: [],
    articles: [],
    categoryTabs: [],
    currentTab: 0,
    Type: {},
    searchInfoList: []
  },
  onShow() {

  },
  onReady() {
  },
  onLoad: function () {
    this.getSearchInfos()
  },
  handleSearch() {
    wx.navigateTo({
      url: '/pages/news/search'
    })
  },
  getSearchInfos() {
    getInfoBySearchBar().then(res => {
      var that = this; 
      var titleArr = [];
      for (let i in res) {
        titleArr.push(res[i].title)
        WxParse.wxParse(`title${i}`, 'html', titleArr[i], that, 0)     
      }
      for(let j in titleArr){
        console.log("adsa:"+titleArr.length)
        if(parseInt(j) === titleArr.length - 1){
          console.log("dsajdklasdklas")
          WxParse.wxParseTemArray(`parseTitleArr`, 'title', titleArr.length, that)
        }
      }
      this.setData({
        searchInfoList: res
      })
    })
  },
  // 页面相关事件处理函数--监听用户下拉动作，下拉刷新
  onPullDownRefresh() {

  },
  // 到达底部，重新加载
  onReachBottom() {
  }
})