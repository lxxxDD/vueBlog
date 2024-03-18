<template>
  <div style="">
    <AppNav @getSearchVal="setSearchVal"></AppNav>
    <el-carousel :interval="4000" type="card" style="margin-bottom: 50px;" height="350px">
    <el-carousel-item v-for="item in imgList" :key="item">
      <div class="medium">{{ item.a}}</div>
    </el-carousel-item>
  </el-carousel>
  <div class="haea" v-if="list.length>0"><span>Blog</span></div>
    <blogList :list="list" :status="status"></blogList>
    <bookLoading v-show="isLoading"></bookLoading>
<transition name="fade">
    <backToTop @scrollToTop="scrollToTop" v-show="showButton"></backToTop>
        </transition>
  </div>
</template>

<script>
import { GetBlogPosts, GetBlogPostsTotal } from "@/request/api/home.js";
import blogList from "../components/blogList.vue";

export default {
  name: "home",
  components: {
    blogList,
  },
  comments: {},
  data() {
    return {
      list: [],
      addNum: 0,
      isLoading: false,
      tiemOut: null,
      showButton:false,
      total: 0,
      title: "",
      status:0,
      imgList:[ {
          a:'DreamBlog',
        },
        {
          a:'明日复明日',
        },
        {
          a:'明日何其多',
        },
       
      ]
       
      
    };
  },

  mounted() {
    this.getList();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.scrollBottmo);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("scroll", this.scrollBottmo);
    clearTimeout(this.tiemOut);
  },

  methods: {
    handleScroll() {
      // 当滚动位置超过页面底部200px时显示按钮
      // console.log(window.scrollY);
       if(window.scrollY==0){
        this.showButton=false
       }else{
        this.showButton = window.innerHeight + window.scrollY >= document.body.offsetHeight -1000;
       }
      console.log(this.showButton);
    },
 
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth" // 平滑滚动
      });
    },
    getList() {
      this.status=0
      GetBlogPosts({
        addNum: this.addNum,
        title: this.title,
      }).then((res) => {
          this.list = res.data;
         this.status=res.status
          console.log(this.list, "文章列表");
          GetBlogPostsTotal()
            .then((res) => {
              this.total = res.data;
            })
            .catch((res) => {
              console.log("错误捕抓", res);
            });
          this.isLoading = false;
          // 关闭计时器
          clearTimeout(this.tiemOut);
        })
        .catch((res) => {});
    },

    scrollBottmo() {
      var scrollHeight = document.documentElement.scrollHeight;
      var scrollTop = document.documentElement.scrollTop
      var clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight-1) {
        
        if (!this.isLoading && this.total !== this.list.length) {
          // 只有在不处于加载状态且列表未加载完毕时才进行加载
          this.isLoading = true;
          setTimeout(() => {
            if (this.isLoading) {
              // 如果在2秒内isLoading仍然为true，则请求数据
              this.addNum += 3;
              this.getList(); // 获取更多数据
            }
          }, 300);
        } else {
         
          // 没有更多数据可加载，不需要发起请求
          console.log("没有更多数据可加载");
        }
       
      }
    },

    setSearchVal(SVal) {
      this.isLoading = false; // 停止自动加载更多数据
      console.log(  this.isLoading);
      this.title = SVal;
      window.removeEventListener("scroll", this.scrollBottmo); // 移除滚动事件监听器
      clearTimeout(this.tiemOut);
      this.getList();
      if (SVal == "") {
        this.getList();
        window.addEventListener("scroll", this.scrollBottmo);
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.medium{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 5vw;
  font-family: var(--almm);
  color: var(--淡黑井五);
  text-shadow: 0 0 5px #fff;
}
.haea {
  /* text-align: center; */
  padding: 20px;
  font-size: 2.5rem;
  position: relative;
  font-family:"Crotah free version";
  /* margin-bottom:50px; */

}
.haea>span{
  /* border-bottom: 1px solid #999999a3; */
  /* padding: 0 100px; */
  padding-bottom: 20px;
  padding-left: 5%;
}
.haea>span::after{
  content: 'Hot';
  color: #ff3333;
  font-family:"Crotah free version";
  font-size: 1rem;
  position: absolute;
  top: 20%;
}

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    /* line-height: 200px; */
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(1) {
  background-color: #000000; /* 第一个轮播项背景色 */
}
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>