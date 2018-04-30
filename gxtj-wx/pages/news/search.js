//index.js
//获取应用实例
const $vm = getApp()

const cache = Object.create(null)

const { getInfos, getTypes, decodeHtml, parseNews, getCategorys} = $vm.utils


Page({
    _isLoading:false,
    data: {
      searchHotWords:[],
      listData: [
        {"text": "text1", "type": "type1" },
        {"text": "text2", "type": "type2" },
        {"text": "text3", "type": "type3" },
        { "text": "text4", "type": "type4" }
      ]
    },
    onShow(){

    },
    onReady(){
    },
    onLoad: function() {
      $vm.utils.post('public/searchLog/getSearchWords').then(res => {
        if(res.status === 1){
          this.searchHotWords = res.result
          this.setData({
            searchHotWords: this.searchHotWords
          })
        }
      })
    },
    back(){
      wx.navigateBack({
        delta:1
      })
    },
    handleSearch(){
      wx.navigateTo({
        url: '/pages/news/search'
      })
    },
    requestSearch(event){
      let searchContent = event.detail.value
      wx.navigateTo({
        url: `/pages/news/searchResult?content=${searchContent}`
      })
    },
    // 页面相关事件处理函数--监听用户下拉动作，下拉刷新
    onPullDownRefresh(){

    },
    // 到达底部，重新加载
    onReachBottom(){
    },

})