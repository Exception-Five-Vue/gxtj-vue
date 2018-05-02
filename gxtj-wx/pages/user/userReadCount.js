import * as echarts from '../../ec-canvas/echarts';

var $vm = getApp()

// const { getUserReadTime} = $vm.utils
const utils = require('../../utils/util.js')

let chart = null;

Page({
  data:{
    text:"Page user",
    userInfo: {},
    userMod: {},
    typeList: [],
    timeList: [],
    // ec: {
    //   onInit: initChart
    // }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  	//调用应用实例的方法获取全局数据
    // this.genChartDate()//生成图标日期数组
    this.typeList = $vm.globalData.typeList
    this.setData({ userInfo: $vm.globalData.userInfo});
    // this.initDisplayData()
  },
  onReady:function(){
  },
  onShow:function(){
    // $vm.initReadTimeData()
    this.initReadTimeData().then(res=>{
      console.log("出来了")
      this.chartComponent = this.selectComponent('#mychart-dom-line');
      this.initC()
    })
    // this.globalData.readTimeData = readTimeData



  },
  onHide:function(){
    console.log(2)
    // 页面隐藏
  },
  onUnload:function(){
    console.log(3)
    // 页面关闭
  },
  initC: function () {
    this.chartComponent.init((canvas, width, height) => {
      // haha()
      console.log("hha", $vm.globalData.readTimeData)
      this.typeList = $vm.globalData.typeList
      let readTimeData = $vm.globalData.readTimeData
      let series = []
      let typeData = []
      for (let i in this.typeList) {
        typeData.push(this.typeList[i].typeName)
        let obj = {}
        let oneLineData = []
        obj.name = this.typeList[i].typeName
        obj.type = 'line'
        obj.smooth = true
        console.log(readTimeData)
        for (let o in readTimeData) {
          for (let m in readTimeData[o]) {
            if (this.typeList[i].typeId === readTimeData[o][m].typeId) {
              oneLineData.push(readTimeData[o][m].readTimeAvg)
            }
            // else if (readTimeData[o][m].typeId === -1){
            //   oneLineData.push(readTimeData[o][m].readTimeAvg)
            // }
          }
        }
        obj.data = oneLineData
        series.push(obj)
      }
      let obj = {}
      obj.name = "阈值"
      obj.type = "line"
      obj.smooth = true
      obj.data = []
      for (let i = 0; i < 7; i++) {
        obj.data.push(30)
      }
      series.push(obj)
      typeData.push("阈值")
      wx.startPullDownRefresh({
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      console.log("serial:", series)
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);

      var option = {
        backgroundColor: "#fff",
        color: ["#FF8080", "#FFFF80", "#0080FF", "#FF80C0", "#FF0000", "#0080C0", "#804040", "#8000FF", "#000000", "#008080", "#5BD07B"],

        tooltip: {
          trigger: 'axis'
        },
        legend: {

          data: typeData
        },
        grid: {
          containLabel: true
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: $vm.globalData.timeList
        },
        yAxis: {
          x: 'center',
          type: 'value'
        },
        // series: [{
        //   name: 'A商品',
        //   type: 'line',
        //   smooth: true,
        //   data: [18, 36, 65, 30, 78, 40, 33]
        // }, {
        //   name: 'B商品',
        //   type: 'line',
        //   smooth: true,
        //   data: [12, 50, 51, 35, 70, 30, 20]
        // }, {
        //   name: 'C商品',
        //   type: 'line',
        //   smooth: true,
        //   data: [10, 30, 31, 50, 40, 20, 10]
        // }]
        series: series
      };

      chart.setOption(option);
      return chart;
    })
  },
  genChartDate() {
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
    $vm.globalData.timeList = timeList
    // console.log("时间数组:", timeList)
  },
  initReadTimeData() {
    this.genChartDate()
    return new utils.Promise((resolve, reject) => {

      utils.get('public/type/getAllType').then(res1 => {
        $vm.globalData.typeList = res1.result
        utils.post(`api/user/getUserReadTime`).then(res => {
          console.log("用户阅读时间:", res)
          // getUserReadTime().then(res => {
          let threshold = 30000
          let readTimeData = []
          for (let date of $vm.globalData.timeList) {
            let oneDayTime = []
            for (let Type of $vm.globalData.typeList) {
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
          $vm.globalData.readTimeData = readTimeData
          resolve()

        })
      })
    })
  }

})

function initChart(canvas, width, height) {
  // haha()
  console.log("hha", $vm.globalData.readTimeData)
  this.typeList = $vm.globalData.typeList
  let readTimeData = $vm.globalData.readTimeData
  let series = []
  let typeData = []
  for (let i in this.typeList){
    typeData.push(this.typeList[i].typeName)
    let obj = {}
    let oneLineData = []
    obj.name = this.typeList[i].typeName
    obj.type = 'line'
    obj.smooth = true
    console.log(readTimeData)
    for (let o in readTimeData){
      for (let m in readTimeData[o]){
        if (this.typeList[i].typeId === readTimeData[o][m].typeId){
          oneLineData.push(readTimeData[o][m].readTimeAvg)
        } 
        // else if (readTimeData[o][m].typeId === -1){
        //   oneLineData.push(readTimeData[o][m].readTimeAvg)
        // }
      }
    }
    obj.data = oneLineData
    series.push(obj)
  }
  let obj = {}
  obj.name = "阈值"
  obj.type = "line"
  obj.smooth = true
  obj.data = []
  for(let i=0;i<7;i++){
    obj.data.push(1000)
  }
  series.push(obj)
  typeData.push("阈值")
      wx.startPullDownRefresh({
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
  console.log("serial:", series)
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#fff",
    color: ["#FF8080", "#FFFF80", "#0080FF", "#FF80C0", "#FF0000", "#0080C0", "#804040", "#8000FF", "#000000", "#008080", "#5BD07B"],
    
    tooltip: {
      trigger: 'axis'
    },
    legend: {

      data: typeData
    },
    grid: {
      containLabel: true
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: $vm.globalData.timeList
    },
    yAxis: {
      x: 'center',
      type: 'value'
    },
    // series: [{
    //   name: 'A商品',
    //   type: 'line',
    //   smooth: true,
    //   data: [18, 36, 65, 30, 78, 40, 33]
    // }, {
    //   name: 'B商品',
    //   type: 'line',
    //   smooth: true,
    //   data: [12, 50, 51, 35, 70, 30, 20]
    // }, {
    //   name: 'C商品',
    //   type: 'line',
    //   smooth: true,
    //   data: [10, 30, 31, 50, 40, 20, 10]
    // }]
    series: series
  };

  chart.setOption(option);
  return chart;
}

