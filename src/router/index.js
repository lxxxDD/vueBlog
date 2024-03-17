import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import blogList from '../components/blogList.vue'
import login from '../components/login/login.vue'
import userInfo from '../components/user/userInfo.vue'
import myBloglist from '../components/myBlogList/myBloglist.vue'
import detailPage from '../components/BlogDetail/detailPage.vue'
import { Message } from 'element-ui'; // 引入 Element UI 的 Message 组件
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
    meta: {
      requiresAuth: true // 设置路由需要用户登录权限
    }
  },
  // 文章详情页
  {
    path: '/detailPage',
    name:'detailPage',
    component: detailPage,
    
  },
  //我的文章
  {
    path: '/myBloglist',
    name:'myBloglist',
    component: myBloglist,
    meta: {
      requiresAuth: true // 设置路由需要用户登录权限
    }
  },

]



const router = new VueRouter({
  routes
})



router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('userInfo'); // 假设用户登录信息存储在本地存储中

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 如果目标路由需要用户登录权限且用户未登录，则弹出提示并重定向到登录页面
    Message.warning('请先登录');
    next('/login');
  } else {
    // 允许路由跳转
    next();
  }
});

export default router
