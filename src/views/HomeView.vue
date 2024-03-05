<template>
  <div style="">
    <AppNav @getSearchVal="setSearchVal"></AppNav>
    <blogList :list="list"></blogList>

    <bookLoading v-show="isLoading && total !== list.length"></bookLoading>
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

      total: 0,
      title: "",
    };
  },

  mounted() {
    this.getList();
    window.addEventListener("scroll", this.scrollBottmo);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollBottmo);
    clearTimeout(this.tiemOut);
  },

  methods: {
    getList() {
      GetBlogPosts({
        addNum: this.addNum,
        title: this.title,
      }).then((res) => {
          this.list = res.data;
          console.log(this.list, "lb");
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
          }, 800);
        } else {
          // 没有更多数据可加载，不需要发起请求
          console.log("没有更多数据可加载");
        }
       
      }
    },

    setSearchVal(SVal) {
      this.isLoading = false; // 停止自动加载更多数据
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

<style>
</style>