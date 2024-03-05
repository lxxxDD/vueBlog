import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import blogList from '../components/blogList.vue'
import login from '../components/login/login.vue'
import userInfo from '../components/user/userInfo.vue'
import myBloglist from '../components/myBlogList/myBloglist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
   
  },
  //文章列表
  
  {
    path: '/blogList',
    name:'blogList',
    component: blogList,
  },
  // 登录页
  {
    path: '/login',
    name:'login',
    component: login,
  },
  // 个人中心
  {
    path: '/userInfo',
    name:'userInfo',
    component: userInfo,
  },
  //我的文章
  {
    path: '/myBloglist',
    name:'myBloglist',
    component: myBloglist,
  },

]

const router = new VueRouter({
  routes
})

export default router
