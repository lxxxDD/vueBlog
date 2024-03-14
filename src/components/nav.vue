<template>


  <div id="nav" :class="{ fixed: isFixed}" @mouseover="isFixed2=true" @mouseout="isFixed2=false" >
    <div class="logo">Dream</div>
    <div class="rightBox" >
   
      <div class="search">
        <div class="restSearch" v-if="SearchVal" @click="SearchFun1">❌</div>
        <div class="input-container">
          <input
            placeholder=" 你是不是在搜索 蔡徐坤 ..."
            class="input"
            name="text"
            type="text"
            v-model="SearchVal"
         @input="SearchFun"
         @keyup="SearchFun"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon"
          >
            <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              id="SVGRepo_tracerCarrier"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <rect fill="white"></rect>
              <path
                d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <div class="btn" :class="{btnFill:isFixed||isFixed2}">
        <el-button type="success"  @click="$router.push('/login')" plain v-if="userInfo==null">去登录</el-button>
    
        <el-dropdown trigger="click"  v-else  >
      <div class="el-dropdown-link UserImgBox">
       <img :src="$BASEURL+userInfo.imgUrl" alt="" width="100%" style="border-radius: 100%;">
      </div>
      <el-dropdown-menu slot="dropdown"    >
      
        <el-dropdown-item >  <el-button icon="el-icon-user-solid"  @click="$router.push('/userInfo')" type="text" style="width: 100%;"  >个人中心</el-button></el-dropdown-item>
        <el-dropdown-item>  <el-button icon="el-icon-s-order"  type="text" style="width: 100%;"  @click="$router.push('/myBloglist')">我的文章</el-button></el-dropdown-item>
        <el-dropdown-item   >
          <el-button icon="el-icon-s-release" @click="rest" type="text" style="width: 100%;color: #555555a3;" >注销账号</el-button>
        </el-dropdown-item>
        <el-dropdown-item   >
          <el-button icon="el-icon-error" @click="$router.push('/login')" type="text" style="width: 100%;color: red;" >退出登录</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
        <transition name="fade">
          <el-button  type="primary" class="xie"  plain v-show="isFixed||isFixed2"> 写文章</el-button>
    </transition>
       
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "AppNav",

  data() {
    return {
      isFixed: false,
      isFixed2: false,
      userInfo:JSON.parse(localStorage.getItem('userInfo'))||null,
      SearchVal:"",
      
    };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.scrollBottmo);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("scroll", this.scrollBottmo);
  },
  methods: {
    handleScroll() {
      // console.log(window.scrollY);
      const twentyPercentHeight = window.innerHeight * 3; // 计算页面高度的20%
      if (window.scrollY > 50) {
        this.isFixed = true;
      
    
      } else {
        this.isFixed = false;
        
      }

      if (window.scrollY > twentyPercentHeight) {
    // 如果滚动高度超过页面高度的20%，则收起导航栏
    this.isFixed = false;
    // console.log("滚动，导航栏收起");
  }
    },
    SearchFun1(){
      this.SearchVal=""
      this.$emit('getSearchVal',this.SearchVal)
    },
    SearchFun(){
      this.$emit('getSearchVal',this.SearchVal)
      console.log(this.SearchVal);
    },
    rest(){
      this.$router.push('/login')
      
      localStorage.removeItem('userInfo')
    }
  },
};
</script>

<style  scoped>

.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  /* transform: translateY(-100%); */
}
#nav {
  /* position: sticky;
  top: 0; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 30px 80px;
  margin-bottom: 50px;
  transition: all .5s;
  border-bottom:1px solid  #54545410;
  

}
.UserImgBox{
  background-color: darkorchid;

  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.fixed {
  width: 100%;
  padding: 30px 50px;
  position: sticky;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.774);
  transition: all .5s;
  z-index: 9999999;
 
}
.logo {
  font-size: 3rem;
  color: var(--Maintextcolor);
  font-family:"Crotah free version";

}
.rightBox {
  display: flex;
  justify-content: space-between;
  /* overflow: hidden; */
  /* background-color: red; */
}
.rightBox>div{
  margin:  auto 30px;
}
.search {

  position: relative;
  
  
}

.restSearch{
  position: absolute;
  right: 10%;
  top: 50%;
  z-index: 9999;
  transform: translate(100%,-50%);
  /* background-color: #fff; */
  padding-right: 5%;
  transition: all .5s;
}
.btn {
  display: flex;
  justify-content: space-between;
  transition: all .5s;
  width: 100px;
  height: 50px;
  padding: 0px 10px;
  /* background-color: #750550; */

}
.btnFill{
  width: 200px;
}
/* 搜索框 */

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  transition: all .5s;
}

.input {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  border: none;
  outline: none;
  padding: 18px 16px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}

.input::placeholder {
  color: transparent;
}

.input:focus::placeholder {
  color: rgb(131, 128, 128);
}

  .input:focus,
.input:not(:placeholder-shown) {
  background-color: #fff;
  border: 1px solid rgb(98, 0, 255);
  width: 500px;

  padding: 18px 16px 18px 40px;
}

.icon {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  width: 40px;
  background-color: #fff;
  border-radius: 10px;
  z-index: -1;
  fill: rgb(98, 0, 255);
  border: 1px solid rgb(98, 0, 255);
}

.input:hover + .icon {
  transform: rotate(360deg);
  transition: 0.2s ease-in-out;
}

.input:focus + .icon,
.input:not(:placeholder-shown) + .icon {
  z-index: 0;
  background-color: transparent;
  border: none;
}
</style>