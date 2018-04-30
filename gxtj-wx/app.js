//app.js
const utils = require('./utils/util.js')

App({
  onLaunch: function () {
    this.getUserInfo()

  },
  
  getTypeList(){},
  genChartDate(){
    let timeList = ["", "", "", "", "", "", ""]
    let nowTime = new Date()
    let nowDay = nowTime.getDate()
    let nowMonth = nowTime.getMonth()
    nowMonth += 1
    let dateStr = ''
    timeList[0] = '今天'
    timeList[1] = '昨天'
    timeList[2] = '前天'
    nowDay -= 2
    for (let i = 3; i < 7; i++) {
      if (nowDay === 1) {
        nowDay = 30, nowMonth -= 1
      } else {
        nowDay -= 1
      }
      dateStr = `${nowMonth}-${nowDay}`
      timeList[i] = dateStr
    }

    timeList.reverse()
    this.globalData.timeList = timeList
    // console.log("时间数组:", timeList)
  },
  initReadTimeData(){
    this.genChartDate()
    return new utils.Promise((resolve, reject) => {
      utils.get('public/type/getAllType').then(res1 => {
        this.globalData.typeList = res1.result
        utils.post(`api/user/getUserReadTime`).then(res => {
          console.log("用户阅读时间:",res)
          // getUserReadTime().then(res => {
          let threshold = 30000
          let readTimeData = []
          for (let date of this.globalData.timeList) {
            let oneDayTime = []
            for (let Type of this.globalData.typeList) {
              let obj = {}
              obj.typeId = Type.typeId
              obj.readTimeTotal = 0
              obj.readTimeAvg = 0
              obj.count = 0
              oneDayTime.push(obj)
            }
          
            readTimeData[date] = oneDayTime
          }
          console.log("展示数组:", readTimeData)
          // let readTimeAvg = [...Array(7)].map(_ => 0);
          // let readTimeTotal = [...Array(7)].map(_ => 0);
          for (let o in res.result) {
            let obj = {}
            obj.typeId = parseInt(o)

            for (let log of res.result[o]) {
              let endDay = new Date(log.logInfo.endTime).getDate()
              let endMonth = new Date(log.logInfo.endTime).getMonth() + 1
              let nowTime = new Date()
              let nowDay = nowTime.getDate()
              let nowMonth = nowTime.getMonth() + 1
              if (log.logInfo.infoId === 30258) {
                console.log("test:", endDay, endMonth)
              }
              // for (let i in this.timeList) {
              // let dayMonArr = this.timeList[i].split('-')
              for (let j = 0; j < 7; j++) {
                // console.log(nowDay,endDay,nowMonth,endMonth)
                if (nowDay === endDay && nowMonth === endMonth) {//今天
                  console.log("这是第几天" + j)
                  let typeId = parseInt(log.typeId)
                  let d = null
                  switch (j) {
                    case 0://今天
                      d = readTimeData['今天'][typeId - 1]
                      d.count += 1
                      d.readTimeTotal += log.timeDifference / 1000
                      d.readTimeAvg = d.readTimeTotal / d.count
                      break;
                    case 1://昨天
                      if (log.logInfo.infoId === 30258) {
                        console.log("test:", endDay, endMonth)
                      }
                      d = readTimeData['昨天'][typeId - 1]
                      d.count += 1
                      d.readTimeTotal += log.timeDifference / 1000
                      d.readTimeAvg = d.readTimeTotal / d.count
                      break;
                    case 2://前天
                      d = readTimeData['前天'][typeId - 1]
                      d.count += 1
                      d.readTimeTotal += log.timeDifference / 1000
                      d.readTimeAvg = d.readTimeTotal / d.count
                      break;
                    case 3:
                      d = readTimeData[this.globalData.timeList[3]][typeId - 1]
                      d.count += 1
                      d.readTimeTotal += log.timeDifference / 1000
                      d.readTimeAvg = d.readTimeTotal / d.count
                      break
                    case 4:
                      d = readTimeData[this.globalData.timeList[2]][typeId - 1]
                      d.count += 1
                      d.readTimeTotal += log.timeDifference / 1000
                      d.readTimeAvg = d.readTimeTotal / d.count
                      break
                    case 5:
                      d = readTimeData[this.globalData.timeList[1]][typeId - 1]
                      d.count += 1
                      d.readTimeTotal += log.timeDifference / 1000
                      d.readTimeAvg = d.readTimeTotal / d.count
                      break
                    case 6:
                      d = readTimeData[this.globalData.timeList[0]][typeId - 1]
                      d.count += 1
                      d.readTimeTotal += log.timeDifference / 1000
                      d.readTimeAvg = d.readTimeTotal / d.count
                      break
                  }
                }
                if (nowDay === 1) {
                  nowDay = 30, nowMonth -= 1
                } else {
                  nowDay -= 1
                }

              }
            }
          }
          this.globalData.readTimeData = readTimeData
          console.log(readTimeData)
        })
        resolve(this.globalData.readTimeData = readTimeData)

      })
    })
  },
  getMod(){
    return new utils.Promise((resolve, reject) => {
      if (this.globalData.userMod) {
        resolve(this.globalData.userMod)
      }
      utils.get('api/userMod/getUserMod').then(res => {
        console.log(res)
        resolve(this.globalData.userMod = res.result)
      })
    })
  },
  getUserInfo() {
    
    return new utils.Promise((resolve, reject) => {
      if (this.globalData.userInfo) {
        resolve(this.globalData.userInfo)
      }
      return utils.getUserInfo().then(res => {
        let userInfo = this.globalData.userInfo = res.userInfo
        if (wx.getStorageSync('userId')) {
          this.getMod()
          this.initReadTimeData()
          return
        }
        let userName = "" + new Date().getTime() + parseInt(Math.random() * 1000)
        let param = {
          "username": userName,
          "password": "123456",
          "nickname": userInfo.nickName,
          "userMail": "849723885@qq.com",
          "userGroupId": 1,
          "userStatus": 1,
          "userImageUrl": userInfo.avatarUrl
        }
        utils.post('public/addUserInfo',param).then(res1 => {
          // console.log(res)
          if(res1.status === 1){
            let param1 = {
              "username": userName,
              "password": "123456"
            }
            utils.post('public/login', param1).then(res2 => {
              // 
              if(res2.status === 1){

                this.globalData.token = wx.getStorageSync('token')
                
                this.getMod()
                this.initReadTimeData()
                // this.globalData.userInfo.userId = 
                wx.setStorageSync('userId', res2.result.userId)
              }
            })
          }
          // resolve(this.globalData.userMod = res)
        })
      })
    })
  },
  toastShow: function (that, str, icon) {
    that.setData({
      isShow: true,
      txt: str,
      iconClass: icon
    });
    setTimeout(function () {
      that.setData({
        isShow: false
      });
    }, 1500);
  }, 
  globalData: {
    userInfo: null,
    categoryChanged: true,
    userMod: null,
    token: null,
    timeList: [],
    typeList: [],
    readTimeData: {}
  },

  cacheSubscibe: [],

  utils
})