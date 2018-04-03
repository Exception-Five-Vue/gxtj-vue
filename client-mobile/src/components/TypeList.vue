<template>
  <div>
     <ul class="subclass-ul">
         <li v-for="item in typeList"><router-link :to="{path:'/type/'+item.typeId}" class="transition">{{item.typeName}}</router-link></li>
      </ul>
  </div>
</template>

<script>
import {getAllType} from '../api/api.js'

export default {
  data(){
     return{
        typeList: []
     }
  },
  mounted(){
      getAllType().then(res=>{
         if(res.status === 1){
               this.typeList = res.result
         }
      })
  }
}
</script>

