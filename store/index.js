import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let userId = sessionStorage.getItem('userId') || "";

// 这里面是存了全局的一些变量，这个应用登陆的区分标识就是是否有userId
// 所以你要获取当前登陆账户的userId应该是this.$store.state.userId
const store = new Vuex.Store({
  state: {
    userId,
  },
  mutations: {
    setUserId(state, payload) {
      sessionStorage.setItem("userId", payload);
      state.userId = payload;
    },
  }
})

export default store;