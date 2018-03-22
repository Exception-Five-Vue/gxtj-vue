<template>
  <section><h1 style="text-align:center;font-size:22px;">{{msg}}</h1></section>
</template>
<script>
import {activate} from '../api/api.js'
export default {
  data(){
    return{
      msg:""
    }
  },
  mounted(){
    let code = this.$route.params.code
    activate(code).then((res)=> {
        if(res.status === 1){
          this.msg = "注册成功!"
        }else{
          this.msg = "注册失败!"
        }
    })
  }
}
</script>
