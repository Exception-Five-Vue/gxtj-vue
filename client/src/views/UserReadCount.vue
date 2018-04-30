<template>
  <section id="userReadCount">
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
<div class="edit-warp" id="per_center" style="text-align:left">
    <div class="user-container" style="min-height: 700px;">
        <div class="go-back"><router-link :to="`/`"><i class="icon icon-go-back"></i>返回主站</router-link></div>

        <div class="nav-warp">
            <ul>
                <li class=""><a href="#"></a></li>
                <li class="active"><a href="#">阅读时间统计</a></li>
                <li class=""><a href="#"></a></li>
            </ul>
        </div>
        <div class="section-box">
            <div class="user-face-box">
                <!-- <img src="https://img.huxiucdn.com/auth/data/avatar/2.jpg"> -->
                <img :src="`${userInfo.userImageUrl}`" :onerror="defaultAvatar">
            </div>
            <!-- <a class="edit-face" href="/user/setting/account.html#mdf_head">点击更换头像</a> -->
        </div>

<!-- 兴趣模型 -->
<div class="echarts-wrapper">
  <div style="display:table-cell;vertical-align:middle" :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">
  </div>
</div>

</div>
    <div style="height: 60px">
    </div>
</div>
<div style="clear:both;"></div>
<VFooter></VFooter>
  </section>
</template>
<script>
import {getUserInfoById,requestLogin, requestRegister,getUserMod,getAllType,getUserReadTime} from '../api/api.js'
import echarts from 'echarts'
import VFooter from '@/components/Footer.vue'

import VHeader from '@/components/Header.vue'
import VueNotifications from 'vue-notifications'

export default {
    props: {
        className: {
            type: String,
            default: 'yourClassName'
        },
        id: {
            type: String,
            default: 'yourID'
        },
        width: {
            type: String,
            default: '600px'
        },
        height: {
            type: String,
            default: '600px'
        }
    },
    data(){
	  return{
		userInfo: {
			userId:1,
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
        defaultAvatar: 'this.src="https://img.huxiucdn.com/auth/data/avatar/2.jpg"',

        userMod: '',
        chart: null,
        echartsData: [],
        typeList: [],
        timeList: [],
        readTimeData: []
	  }
  },
  components: {VHeader,VFooter},
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
    }else{
        this.handleForm(0)
    }

    getAllType().then(res1=>{
        this.genChartDate()
        if(res1.status === 1){
            this.typeList = res1.result
            getUserReadTime().then(res=>{
                if(res.status === 1){
                    // getUserReadTime().then(res => {
                    let threshold = 30000
                    let readTimeData = []
                    for (let date of this.timeList) {
                        let oneDayTime = []
                        for (let Type of this.typeList) {
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
                                        d = readTimeData[this.timeList[3]][typeId - 1]
                                        d.count += 1
                                        d.readTimeTotal += log.timeDifference / 1000
                                        d.readTimeAvg = d.readTimeTotal / d.count
                                        break
                                        case 4:
                                        d = readTimeData[this.timeList[2]][typeId - 1]
                                        d.count += 1
                                        d.readTimeTotal += log.timeDifference / 1000
                                        d.readTimeAvg = d.readTimeTotal / d.count
                                        break
                                        case 5:
                                        d = readTimeData[this.timeList[1]][typeId - 1]
                                        d.count += 1
                                        d.readTimeTotal += log.timeDifference / 1000
                                        d.readTimeAvg = d.readTimeTotal / d.count
                                        break
                                        case 6:
                                        d = readTimeData[this.timeList[0]][typeId - 1]
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
                    this.readTimeData = readTimeData
                    console.log("阅读数据:",readTimeData)
                    this.initChart();
                }
            })
        }
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
      
    /* header方法 */
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
                alert("已成功向您的邮箱发送帐号激活邮件,请确认")
            }else{
                alert("发送邮件失败")
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
        this.timeList = timeList
    },
    initChart() {
        let readTimeData = this.readTimeData
        console.log("!!!:",this.readTimeData)
        var _this = this
        let source = []
        let product = ["product"]
        let typeArr = []
        for(let i=0;i<this.typeList.length;i++){
            let type = this.typeList[i].typeName
            let arr = [type]
            typeArr.push(arr)
        }
        for(let p in readTimeData){
            product.push(p)
            for(let item of readTimeData[p]){
                console.log(this.typeList[item.typeId-1].typeId)
                if(item.typeId === this.typeList[item.typeId-1].typeId){
                    typeArr[item.typeId-1].push(item.readTimeAvg)
                }
            }
        }
                    // console.log(product)
        source.push(product)
        source.push(["阈值",30,30,30,30,30,30,30,30,30,30])
        for(let item of typeArr){
            console.log(item)
            source.push(item)
        }
        console.log("source:",source)
        console.log("product:",product)
        setTimeout(()=>{

            this.chart = echarts.init(this.$refs.myEchart);
            // 把配置和数据放这里
            // let d = [
            //     [100,0,0,200,66,77,30],
            //     [33,88,99,0,50,0,51],
            //     [100,130,33,55,0,111,0],
            //     [11,66,90,0,44,44,30],
            //     [100,0,33,110,33,77,144],
            //     [0,11,66,0,111,89,11],
            //     [0,155,0,111,44,89,55]
            // ]

            // let serialData = []

            // let types = ['娱乐','法律','金融','科技','互联网','政治','生活']

            // for(let i in types){
            //     let obj = {}
            //     obj.name = types[i]
            //     obj.type = 'line'
            //     obj.stack = '总量'
            //     obj.data = d[i]
            //     serialData.push(obj)
            // }
            this.chart.setOption({

                legend: {},
                tooltip: {
                    trigger: 'axis',
                    showContent: false
                },
                dataset: {
                    source: source
                    // source: [
                    //     ['product', '10:00~11:00', '11:00~12:00', '13:00~14:00', '14:00~15:00', '15:00~16:00', '16:00~17:00', '17:00-18:00'],
                    //     ['娱乐', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 83.8, 98.7, 53.3],
                    //     ['法律', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1,73.4, 55.1,83.1,],
                    //     ['金融', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5,65.2, 82.5],
                    //     ['科技', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1,69.2, 72.4,67.1,],
                    //     ['互联网', 41.1, 66.4, 99.1, 53.3, 83.8, 66.7, 83.8, 9.7, 53.3],
                    //     ['政治', 86.5, 92.1, 100.7, 33.1, 73.4, 53.1,73.4,88.1,83.1,],
                    //     ['生活', 100.1, 67.2, 55.5, 33.4, 99.2, 82.5,65.2, 82.5]
                    // ]
                },
                xAxis: {type: 'category'},
                yAxis: {gridIndex: 0,name: '平均时间/秒',},
                grid: {top: '55%'},
                series: [
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},

                    {
                        type: 'pie',
                        id: 'pie',
                        radius: '30%',
                        center: ['50%', '25%'],
                        label: {
                            formatter: '{b}: {@2012} ({d}%)'
                        },
                        encode: {
                            itemName: 'product',
                            value: '2012',
                            tooltip: '2012'
                        }
                    }
                ]
            })
            this.chart.on('updateAxisPointer', function (event) {
                var xAxisInfo = event.axesInfo[0];
                if (xAxisInfo) {
                    var dimension = xAxisInfo.value + 1;
                    _this.chart.setOption({
                        series: {
                            id: 'pie',
                            label: {
                                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                            },
                            encode: {
                                value: dimension,
                                tooltip: dimension
                            }
                        }
                    });
                }
            });
        })

    }
  }
}
</script>
<style>
@import '../assets/bootstrap/css/bootstrap.min.css';
@import '../assets/css/build.css';
@import '../assets/css/login.css';
@import '../assets/css/dlzc.css';
@import '../assets/css/zzsc.css';
@import '../assets/css/userinfo.css';

#index{
    font-size: 14px;
}
li.nav-news.js-show-menu ul{position: absolute; visibility: hidden; background:#fff; width:250px;  top:60px; left:-50px; z-index:9999; box-shadow:0 1px 15px rgba(18,21,21,.2);padding:10px 5px;}
#jsddm ul li{ float:left; width:105px; padding-left:20px; line-height:40px;}
.echarts-wrapper{
    display: table;
    width: 100%;
}
</style>

