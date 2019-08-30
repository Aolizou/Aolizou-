import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import './assets/common.js';
import store from './store';
import routes from './router';
// import Footer from './components/footer.vue'
import './assets/css/reset.css';
import './assets/css/common.css';
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(VueRouter);

const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
  mode: 'history', // 基于h5得history模式
});

router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.requireAuth === true && !store.state.userId){
    next({path: '/login'});
    return;
  }
  next();
});

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
