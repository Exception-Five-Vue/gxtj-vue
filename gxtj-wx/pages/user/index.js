import * as echarts from '../../ec-canvas/echarts';

var $vm = getApp()
const utils = require('../../utils/util.js')

// const { getUserMod } = $vm.utils

let chart = null;

Page({
  data:{
    text:"Page user",
    userInfo: {},
    // userMod: {},
    // ec: {
    //   onInit: initChart
    // }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
  	//调用应用实例的方法获取全局数据

    this.setData({ userInfo: $vm.globalData.userInfo });
  },
  onReady:function(){
    // 页面渲染完成

  },
  onShow:function(){
    // $vm.getMod()
    this.getMod()

  },
  getMod() {
      // if ($vm.globalData.userMod) {
      //   resolve($vm.globalData.userMod)
      // }
      utils.get('api/userMod/getUserMod').then(res => {
      $vm.globalData.userMod = res.result        
      this.chartComponent = this.selectComponent('#mychart-dom-bar');
        this.initC()
      })
  },
  onHide:function(){
    console.log(2)
    // 页面隐藏
  },
  onUnload:function(){
    console.log(3)
    // 页面关闭
  },
  initC: function(){
    this.chartComponent.init((canvas, width, height) => {
      // 初始化图表
      console.log("hahaha")
      // $vm.getMod()
      console.log(this)
      this.userMod = $vm.globalData.userMod
      let dataArr = []
      dataArr.push(this.userMod.internet)
      dataArr.push(this.userMod.sports)
      dataArr.push(this.userMod.health)
      dataArr.push(this.userMod.military)
      dataArr.push(this.userMod.education)
      dataArr.push(this.userMod.culture)
      dataArr.push(this.userMod.travel)
      dataArr.push(this.userMod.car)
      dataArr.push(this.userMod.life)
      dataArr.push(this.userMod.business)
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      console.log("兴趣摩西", dataArr)
      canvas.setChart(chart);
      var option = {
        color: ['#37a2da', '#32c5e9', '#67e0e3'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          // data: ['热度', '正面', '负面']
        },
        grid: {
          left: 20,
          right: 20,
          bottom: 15,
          top: 40,
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#666'
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['互联网', '体育', '健康', '军事', '教育', '文化', '旅游', '汽车', '生活', '财经'],
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#666'
            }
          }
        ],
        series: [
          // {
          //   name: '热度',
          //   type: 'bar',
          //   label: {
          //     normal: {
          //       show: true,
          //       position: 'inside'
          //     }
          //   },
          //   data: [300, 270, 340, 344, 300, 320, 310],
          //   itemStyle: {
          //     // emphasis: {
          //     //   color: '#37a2da'
          //     // }
          //   }
          // },
          {
            // name: '正面',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true
              }
            },
            data: dataArr,
            itemStyle: {
              // emphasis: {
              //   color: '#32c5e9'
              // }
            }
          },
          // {
          //   name: '负面',
          //   type: 'bar',
          //   stack: '总量',
          //   label: {
          //     normal: {
          //       show: true,
          //       position: 'left'
          //     }
          //   },
          //   data: [-20, -32, -21, -34, -90, -130, -110],
          //   itemStyle: {
          //     // emphasis: {
          //     //   color: '#67e0e3'
          //     // }
          //   }
          // }
        ]
      };

      chart.setOption(option);
      return chart;
    });
  }
})


function initChartc(canvas, width, height) {
  console.log("hahaha")
  // $vm.getMod()
  console.log(this)
  this.userMod = $vm.globalData.userMod
  let dataArr = []
  dataArr.push(this.userMod.internet) 
  dataArr.push(this.userMod.sports) 
  dataArr.push(this.userMod.health) 
  dataArr.push(this.userMod.military) 
  dataArr.push(this.userMod.education) 
  dataArr.push(this.userMod.culture) 
  dataArr.push(this.userMod.travel)
  dataArr.push(this.userMod.car)
  dataArr.push(this.userMod.life)
  dataArr.push(this.userMod.business) 
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  console.log("兴趣摩西",dataArr)
  canvas.setChart(chart);
  var option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      // data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['互联网', '体育', '健康', '军事', '教育', '文化', '旅游', '汽车', '生活', '财经'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      // {
      //   name: '热度',
      //   type: 'bar',
      //   label: {
      //     normal: {
      //       show: true,
      //       position: 'inside'
      //     }
      //   },
      //   data: [300, 270, 340, 344, 300, 320, 310],
      //   itemStyle: {
      //     // emphasis: {
      //     //   color: '#37a2da'
      //     // }
      //   }
      // },
      {
        // name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: dataArr,
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      // {
      //   name: '负面',
      //   type: 'bar',
      //   stack: '总量',
      //   label: {
      //     normal: {
      //       show: true,
      //       position: 'left'
      //     }
      //   },
      //   data: [-20, -32, -21, -34, -90, -130, -110],
      //   itemStyle: {
      //     // emphasis: {
      //     //   color: '#67e0e3'
      //     // }
      //   }
      // }
    ]
  };

  chart.setOption(option);
  return chart;
}
