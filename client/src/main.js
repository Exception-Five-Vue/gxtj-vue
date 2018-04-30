import Vue from 'vue'
import App from './App'
import store from './store.js'
import router from './router'
import {getIp,requestLogin} from './api/api.js'
import VueMeta from 'vue-meta'
import VueNotifications from 'vue-notifications'
import Noty from 'noty'
import './assets/css/noty.css'
import vueCropper from './components/cropper/vueCropper.vue'
Vue.use(VueMeta)
Vue.config.productionTip = false

getIp().then(res=>{
  let param = {}
  param.username = res.data.result.username
  param.password = res.data.result.password

  requestLogin(param).then(res2=>{
    if(res2.data.status === 1){
      console.log("获取ip",res2)
    }
  })

})

function toast ({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return new Noty({text: message, timeout, type}).show()
}
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
