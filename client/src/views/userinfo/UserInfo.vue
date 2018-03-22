<template>
    <section id="search">
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
        @requestSearch="requestSearch"
        ></VHeader>
<div class="placeholder-height"></div>
<div class="edit-warp" id="per_center">
    <div class="user-container" style="min-height: 700px;">
        <div class="go-back"><a href="/member"><i class="icon icon-go-back"></i>返回首页</a></div>

        <div class="nav-warp">
            <ul>
                <li class=""><a href="/user/setting/base.html"></a></li>
                <li class="active"><a href="/user/setting/account.html">账户信息</a></li>
                <li class=""><a href="/user/setting/bind.html"></a></li>
            </ul>
        </div>
        <div class="acnt-item-box">
            <div class="acnt-item">

                <i class="icon acnt-item-icon icon-round-ok"></i>
                <label class="acnt-item-label">昵称:</label>

                <div class="control-box under-control account" >{{userInfo.nickname}}</div>

                <div class="btn-group  btn-group-box pull-right js-edit-user-info " @click="extendContent(0)">
                    <span class="btn btn-default  btn-dropdown-show js-edit-user-name" v-if="!contentShowFlags[0]">修改</span>
                    <span class="btn btn-default  btn-dropdown-show js-edit-user-name" v-else>收起</span>
                    <button type="button" class="btn btn-default dropdown-toggle">
                        <span class="icon" :class="{'icon-add': !contentShowFlags[0],'icon-del': contentShowFlags[0]}"></span>
                    </button>
                </div>
            </div>
            <div class="acnt-item acnt-item-content " v-show="contentShowFlags[0]">
                <ul class="under-ul">
                    <div class="form-warp">
                        <label class="control-label">新昵称：</label>
                        <input style="width: 345px;" class="control-input" id="nickname" placeholder="新昵称" v-model="userInfo.newNickname">
                    </div>
                    <button class="btn btn-blue js-reset-username" @click="updateUserInfo(0)">完成</button>
                </ul>
            </div>
        </div>
        <div class="acnt-item-box">
            <div class="acnt-item">
                <i class="icon acnt-item-icon icon-round-ok"></i>
                <label class="acnt-item-label">头&nbsp;&nbsp;&nbsp;像：</label>

                <div class="control-box under-control account">
                    <div class="face-box">
                        <img :src="`${userInfo.userImageUrl}`" :onerror="defaultAvatar">
                    </div>
                </div>
                <div class="btn-group  btn-group-box pull-right js-edit-user-info " @click="extendContent(1)">
                    <span class="btn btn-default  btn-dropdown-show js-edit-user-name" v-if="!contentShowFlags[1]">修改</span>
                    <span class="btn btn-default  btn-dropdown-show js-edit-user-name" v-else>收起</span>
                    <button type="button" class="btn btn-default dropdown-toggle">
                        <span class="icon" :class="{'icon-add': !contentShowFlags[1],'icon-del': contentShowFlags[1]}"></span>
                    </button>
                </div>
            </div>
            <div class="acnt-item acnt-item-content" v-show="contentShowFlags[1]">
                <ul class="under-ul">
                    <vueCropper
                  ref="cropper"
                  :img="option.img"
                  :outputSize="option.size"
                  :outputType="option.outputType"
                  :info="option.info"
                  :canScale="option.canScale"
                  :autoCrop="option.autoCrop"
                  :autoCropWidth="option.width"
                  :autoCropHeight="option.height"
                  :fixed="option.fixed"
                  :fixedNumber="option.fixedNumber"
                  :original = "option.original"
                  @submitAvatar = "submitAvatar"
               ></vueCropper>
                    <!-- <li><span class="span-color-a2">仅支持JPG、PNG格式的图片文件，小于2MB</span></li>
                    <li>
                        <div style="margin: 0 auto;">
                            <object type="application/x-shockwave-flash" id="swf" name="swf" data="/static_2015/js/fullAvatarEditor.swf" width="750" height="340"><param name="menu" value="true"><param name="scale" value="noScale"><param name="allowFullscreen" value="true"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"><param name="flashvars" value="id=swf&amp;upload_url=%2Fuser%2Fchange_avatar%3Fis_ajax%3D1%26huxiu_hash_code%3Dfd0f8941fa8f00b25749ae12ca30e643&amp;src_upload=2&amp;tab_visible=false&amp;browse_box_width=204&amp;browse_box_height=204&amp;browse_button=请上传您的头像&amp;checkbox_visible=false&amp;avatar_sizes=200*200|150*150|40*40&amp;avatar_sizes_desc=200*200像素|150*150像素|40*40像素&amp;avatar_tools_visible=false&amp;browse_box_align=left"></object>
                        </div>

                        <button id="upload" class="btn btn-blue-user disabled">上传头像</button>

                    </li> -->
                </ul>
            </div>
        </div>
        <div class="acnt-item-box">
            <div class="acnt-item">
                <i class="icon acnt-item-icon icon-round-ok"></i>
                <label class="acnt-item-label">密&nbsp;&nbsp;&nbsp;码：</label>

                <div class="control-box under-control account">

                </div>
                <div class="btn-group  btn-group-box pull-right js-edit-user-info  disabled" @click="extendContent(2)">
                    <span class="btn btn-default  btn-dropdown-show js-edit-user-name" v-if="!contentShowFlags[2]">修改</span>
                    <span class="btn btn-default  btn-dropdown-show js-edit-user-name" v-else>收起</span>
                    <button type="button" class="btn btn-default dropdown-toggle">
                        <span class="icon" :class="{'icon-add': !contentShowFlags[2],'icon-del': contentShowFlags[2]}"></span>
                    </button>
                </div>
            </div>
            <div class="acnt-item acnt-item-content" >
                <ul class="under-ul" v-show="contentShowFlags[2]">
                    <div class="form-warp">
                        <label class="control-label">密&nbsp;&nbsp;&nbsp;码：</label>
                        <input class="control-input" type="password" id="oldpassword" placeholder="密码" v-model="inputPwd">
                    </div>
                    <div class="form-warp">
                        <label class="control-label">新密码：</label>
                        <input class="control-input" type="password" id="password1" placeholder="新密码" v-model="userInfo.newPwd">
                    </div>
                    <div class="form-warp">
                        <label class="control-label">确认密码：</label>
                        <input class="control-input" type="password" id="password2" placeholder="确认密码" v-model="userInfo.confirmPwd">
                    </div>
                    <button class="btn btn-blue js-reset-pw" @click="updateUserInfo(2)">完成</button>
                </ul>

            </div>
        </div>
            </div>
    <div style="height: 60px">

    </div>
</div>
<div style="height: 60px">

</div>
</div>
<div style="clear:both;"></div>
<VFooter></VFooter>
    <dialogs-wrapper tag="div" transition-name="fade" @enter="transitionEnter"></dialogs-wrapper>
    <!-- <confirm></confirm> -->
    <button class="md-button" @click="ask">Ask me</button>
  </section>
</template>
<script>
import {requestLogin, requestRegister,updateUser,uploadAvatar,getUserInfoById} from '../../api/api.js'
import VHeader from '@/components/Header.vue'
import VFooter from '@/components/Footer.vue'
import VueNotifications from 'vue-notifications'
import vueCropper from './vueCropper.vue'
 import { messageBox } from './dialogs'
export default {
    data(){
        return{
            userInfo: {
                userId:1,
                username: "",
                password: "",
                newPwd: "",
                confirmPwd:"",
                nickname: "",
                newNickname:"",
                userMail: "",
                userGroupId: 1,
                userImageUrl: "",
                newUserImageUrl: ""
            },
            inputPwd: "",
            defaultAvatar: 'this.src="https://img.huxiucdn.com/auth/data/avatar/2.jpg"',
            isLogined: false,
            isLoginShow: false,
            isRegisterShow: false,
            isSearchShow: false,

            contentShowFlags: [false,false,false,false],

            //头像
            model: false,
            modelSrc: '',
            crap: false,
            previews: {},
            option: {
                img: '',
                info: true,
                size: 1,
                outputType: 'jpeg',
                canScale: true,
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
                width: 200,
                height: 200,
                fixed: true,
                original: false
            },
            downImg: '#',
            filters: {
                searchName: 'nickname',
                search:'a',
                groupValue: ''
            },
            isModelShow: false
        }
    },
    components: {VHeader,VFooter,vueCropper},
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
    },
    methods: {
        transitionEnter () {
            console.log('`enter` event of the `transition-group` component has been fired.')
        },
        async ask () {
            // call dialog function with data in the arguments
            if (await this.$confirm({ title: 'Oh my user', content: '😊 Would you like to star vue-modal-dialogs?' })) {
            // call dialog function with data in one object
            if (await this.$confirm({ title: 'That is great!', content: '😀 Go to github page now?' })) {
                window.location = 'https://github.com/hjkcai/vue-modal-dialogs'
            } 
            }
        },
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
                    this.showSuccessMsg({title:"成功",message:"已成功向您的邮箱发送帐号激活邮件,请确认"})
                }else{
                    this.showErrorMsg({title:"失败",message:"发送邮件失败"})
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
        requestSearch(...data){
            this.searchContent = data[0]
            this.init()
        },
        submitAvatar(...data){
            let param = new FormData()
            param.append("file",(data[0]))
            uploadAvatar(param).then(res=>{
                if(res.status === 1){
                    // let path = res.result.replace('/public/download?filename=',``)
                    this.userInfo.newUserImageUrl = res.result
                    this.updateUserInfo(1)
                }
            })
        },
        
        extendContent(index){
            this.contentShowFlags.forEach((ele,eIndex) => {
                console.log(index,eIndex)
                console.log(index === eIndex)
                if(index === eIndex){
                    this.contentShowFlags.splice(index, 1, !this.contentShowFlags[index])
                }else{
                    this.contentShowFlags.splice(eIndex, 1, false)
                }
            })
            console.log(this.contentShowFlags)
            switch(index){
                case 0:
                    
                break;
                case 1:break
                case 2:break
                case 3:break
            }
        },
        async updateUserInfo(flag){
            let param = {
                userId: this.userInfo.userId,
                username: this.userInfo.username
            }
            switch(flag){
                case 0: 
                    param.nickname = this.userInfo.newNickname
                    if(await this.$confirm({ title: '提示', content: '您确定要修改昵称吗?' })){
                        updateUser(param).then(res=>{
                            if(res.data.status === 1){
                                this.contentShowFlags.splice(0, 1, false)
                                getUserInfoById(this.userInfo.userId).then(res=>{
                                    this.showSuccessMsg({title:"成功",message:"修改成功"})
                                    this.userInfo.nickname = res.result.nickname
                                })
                            }
                        })
                    }
                    break
                case 1:
                    param.userImageUrl = this.userInfo.newUserImageUrl
                    if(await this.$confirm({ title: '提示', content: '您确定要修改头像吗?' })){
                        updateUser(param).then(res=>{
                            if(res.data.status === 1){
                                this.contentShowFlags.splice(1, 1, false)
                                getUserInfoById(this.userInfo.userId).then(res=>{
                                    this.showSuccessMsg({title:"成功",message:"修改成功"})
                                    this.userInfo.userImageUrl = res.result.userImageUrl
                                })
                            }
                        })
                    }
                    break
                case 2:
                    let loginParam = {
                        username: this.userInfo.username,
                        password: this.userInfo.password
                    }
                    if(await this.$confirm({ title: '提示', content: '您确定要修改密码吗?' })){
                        requestLogin(loginParam).then(res=>{
                            if(res.data.status !== 1){
                                this.showErrorMsg({title:"失败",message:"修改失败,密码输入不正确"})
                                return
                            }else{
    
                                if(this.userInfo.newPwd !== this.userInfo.confirmPwd){
                                    this.showErrorMsg({title:"失败",message:"修改失败,两次密码输入不一致"})
                                    return
                                }
                                param.password = this.userInfo.newPwd

                                updateUser(param).then(res=>{
                                    if(res.data.status === 1){
                                        this.contentShowFlags.splice(2, 1, false)
                                        getUserInfoById(this.userInfo.userId).then(res=>{
                                            this.showSuccessMsg({title:"成功",message:"修改成功"})
                                            this.userInfo.password = res.result
                                        })
                                    }
                                })

                            }
                        })
                    }
                    break 
            }
        }
    },
    /* 头像 */
    startCrop () {
      this.crop = true
      // console.log('开始截图')
    },
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    clearCrop () {
      this.$refs.cropper.clearCrop()
    },
    finish (type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            var img = window.URL.createObjectURL(data)
            this.model = true
            this.modelSrc = img
          })
      } else {
          this.$refs.cropper.getCropData((data) => {
            this.model = true
            this.modelSrc = data
          })
      }
    },
    // 实时预览函数
    realTime (data) {
      this.previews = data
    },
    finish2 (type) {
      this.$refs.cropper2.getCropData((data) => {
          this.model = true
          this.modelSrc = data
      })
    },
    finish3 (type) {
      this.$refs.cropper3.getCropData((data) => {
          this.model = true
          this.modelSrc = data
      })
    },
    down (type) {
      // event.preventDefault()
      var aLink = document.createElement('a')
      aLink.download = 'demo'
      // 输出
      if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            this.downImg = window.URL.createObjectURL(data)
            aLink.href = window.URL.createObjectURL(data)
            aLink.click()
          })
      } else {
          this.$refs.cropper.getCropData((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
      }
    },
    uploadImg (e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.option.img = data
          } else if (num === 2) {
            this.option.img = data
          }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
      this.$refs.cropper.changeScale(200)
      this.startCrop()
    },
    realTime (data) {
      this.previews = data
    },
    confirm(){
      this.model = false
      this.$emit('transfer',this.option.img)
      this.$emit("isModelShow",this.isModelShow)
    },
    //通知插件
    notifications: {
        showSuccessMsg: {
        type: VueNotifications.types.success,
        title: 'Hello there',
        message: 'That\'s the success!'
        },
        showInfoMsg: {
        type: VueNotifications.types.info,
        title: 'Hey you',
        message: 'Here is some info for you'
        },
        showWarnMsg: {
        type: VueNotifications.types.warn,
        title: 'Wow, man',
        message: 'That\'s the kind of warning'
        },
        showErrorMsg: {
        type: VueNotifications.types.error,
        title: 'Wow-wow',
        message: 'That\'s the error'
        }
    },
    metaInfo () {
        const title = ""
        return {
            title: "用户中心",
            meta:[{
                vmid: 'referrer',
                name: 'referrer',
                content: 'never'
            }]
        }
    },
}
</script>
<style>
@import '../../assets/bootstrap/css/bootstrap.min.css';
@import '../../assets/css/build.css';
@import '../../assets/css/login.css';
@import '../../assets/css/dlzc.css';
@import '../../assets/css/zzsc.css';
@import '../../assets/css/userinfo.css';

#index{
    font-size: 14px;
}
li.nav-news.js-show-menu ul{position: absolute; visibility: hidden; background:#fff; width:250px;  top:60px; left:-50px; z-index:9999; box-shadow:0 1px 15px rgba(18,21,21,.2);padding:10px 5px;}
#jsddm ul li{ float:left; width:105px; padding-left:20px; line-height:40px;}


</style>

