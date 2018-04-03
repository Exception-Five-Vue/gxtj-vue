import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 这里定义初始值
let state ={
    receiveInfoList: [{
        receiveInfoId: 28919,
        hasPushed: false
    },{
        receiveInfoId: 28251,
        hasPushed: false
    },{
        receiveInfoId: 28257,
        hasPushed: false
    },]
}
const mutations = {
    change(context, id){
        context.receiveInfoId = id
    }
};

// 事件触发后的逻辑操作
// 参数为事件函数
const actions = {
   //  add(add){
   //      add.commit('add')
   //  },
   //  decrease(decrease){
   //      decrease.commit('decrease')
   //  },
   //  oddAdd({commit,state}){
   //      if (state.count % 2 === 0) {
   //          commit('add')
   //      }
   //  }
};

// 返回改变后的数值
const getters = {
    getReceiveInfoList(context){
        return context.receiveInfoList
    },
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})