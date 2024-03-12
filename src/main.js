import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppNav from './components/nav.vue'
import bookLoading from './components/loading/bookLoading.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "animate.css"
import "wowjs/css/libs/animate.css"// 巨坑... 此地方要引入两个css
import wow from 'wowjs'
import "../src/assets/css/backColor.css"
import 'transition-style';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(wow);
Vue.component('AppNav', AppNav);
Vue.component('bookLoading', bookLoading);
Vue.prototype.$BASEURL = 'http://localhost:5297/';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
