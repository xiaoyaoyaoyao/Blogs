import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {}
  },
  mutations: {
    updateUserInfo(state, data){
      state.userInfo = data
    },
    updateUserName(state, name){
      state.userInfo.user = name
    }
  },
  actions: {
  },
  modules: {
  }
})
