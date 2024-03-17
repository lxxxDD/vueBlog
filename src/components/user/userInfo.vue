<template>
  <div
    :class="`BOX ${isSkeleton ? '' : 'hide'} ${
      UserBlogList.length > 0 ? '' : 'hide'
    }`"
  >
    <!-- 左边 -->
    <div class="left wow animate__bounceIn">
      <!-- 头像 -->
      <div>
        <div class="picture">
          <el-skeleton
            v-if="!isSkeleton"
            style="
              aspect-ratio: 1/1;
              height: auto;
              width: auto;
              display: flex;
              align-items: center;
            "
            animated
          >
            <template slot="template">
              <el-skeleton-item
                variant="image"
                style="aspect-ratio: 1/1; width: 100%; height: 100%"
              />
            </template>
          </el-skeleton>
          <el-upload
            v-else
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChangeUpload"
          >
            <div
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 10rem;
                opacity: 0;
              "
            >
              +
            </div>
            <el-image
              :src="$BASEURL + imageUrl"
              v-if="imageUrl"
              style="aspect-ratio: 1/1; width: 100%; height: 100%"
            />
            <el-image v-else>
              <div slot="error" class="image-slot">
               
               <el-skeleton
         
            style="
              aspect-ratio: 1/1;
              height: auto;
              width: auto;
              display: flex;
              align-items: center;
            "
            animated
          >
            <template slot="template">
              <el-skeleton-item
                variant="image"
                style="aspect-ratio: 1/1; width: 100%; height: 100%"
              />
            </template>
          </el-skeleton>
              </div>
            </el-image>
          </el-upload>
        </div>
        <el-skeleton :rows="3" animated v-show="!isSkeleton" />
        <div class="userName" v-show="isSkeleton">
          {{ userInfo.username }}
        </div>
      </div>
      <!-- 头像end -->
      <div
        class="updateUserInfoBox wow animate__bounceInLeft"
        @mouseover="isUpdateBtn = true"
        @mouseout="isUpdateBtn = false"
        v-show="isSkeleton"
      >
        <div style="max-width: 100%; max-height: 100%; word-wrap: break-word">
          <span class="userInfoText">📫Email:</span> <br /><span
            class="userInfoTextNUM"
            >{{ userInfo.email }}</span
          >
        </div>
        <div>
          🔐<span class="userInfoText">Password:</span>
          <br />
          <span class="userInfoTextNUM" v-show="passwordShow">
            {{ userInfo.password }}</span
          >
          <span class="userInfoTextNUM">
            <span v-show="!passwordShow" style="user-select: none"
              >··· ··· ··· ···</span
            >
            <span style="cursor: pointer" @click="passwordShow = !passwordShow">
              <span v-show="!passwordShow" style="user-select: none">🙄</span>
              <span v-show="passwordShow" style="user-select: none">😎</span>
            </span></span
          >
        </div>
        <transition name="fade">
          <el-button
            @click="ShowDrawerDialog"
            type="warning"
            plain
            style="
              font-size: 1vw;
              margin-top: 150px;
              position: absolute;
              bottom: 10%;
            "
            v-show="isUpdateBtn"
            ><span>🚧🚧修改信息🚧🚧</span></el-button
          >
        </transition>
        <div></div>
      </div>
    </div>
    <!-- 左边end -->
    <!-- 右边 -->
    <div class="right">
      <div class="right_a wow animate__zoomInDown">
        <el-skeleton :rows="4" animated v-show="loadShow" />
        <div
          class="right_a_text1 wow animate__zoomInDown"
          v-show="!loadShow"
          data-wow-delay="1s"
        >
          加入<span class="right_a_logo">Dream</span>共<span
            class="right_a_logo"
            >{{ days }}</span
          >天啦~
        </div>
        <div
          class="right_a_text2 wow animate__zoomInUp"
          v-show="!loadShow"
          data-wow-delay="1s"
        >
          共发布文章
          <span class="right_a_num">{{
            UserBlogTotal != "1" ? UserBlogTotal.totalPosts : 0
          }}</span
          >获得点赞
          <span class="right_a_num">
            {{
              UserBlogTotal != "1"
                ? formatNumber(parseInt(UserBlogTotal.totalLikes))
                : 0
            }}</span
          >观看次数<span class="right_a_num">{{
            UserBlogTotal != "1"
              ? formatNumber(parseInt(UserBlogTotal.totalViews))
              : 0
          }}</span>
        </div>
      </div>
      <div class="right_b wow animate__zoomInUp" data-wow-delay="0.5s">
        <el-skeleton animated v-show="!isSkeleton">
          <template slot="template">
            <div
              style="
                width: 100%;
                height: 20px;
                display: flex;
                justify-content: flex-end;
              "
            >
              <div
                style="
                  width: 30%;
                  display: flex;
                  justify-items: space-between;
                  align-items: center;
                "
              >
                <el-skeleton-item variant="text" style="margin-right: 16px" />
                <el-skeleton-item variant="text" style="width: 30%" />
              </div>
            </div>

            <el-skeleton-item
              variant="crea"
              style="width: 100%; height: 300px"
            />
          </template>
        </el-skeleton>
        <div :class="`block ${togglexx(0)}` ">
          <div class="srot" v-show="UserBlogList.length">
            <div class="srot-btn">
              <el-button
                size="mini"
                class="hot srotBtn"
                @click="getUserBlogPostLstiFun(1)"
                >最热</el-button
              >
              <el-button
                size="mini"
                class="new srotBtn"
                @click="getUserBlogPostLstiFun(2)"
                >最新</el-button
              >
              <el-button
                size="mini"
                class="default srotBtn"
                @click="getUserBlogPostLstiFun(0)"
                >默认</el-button
              >
            </div>
          </div>
       
           <transition name="fade1">
<div style="position: relative; display: flex; justify-content: center;" v-show="isqh">
  <span style="
  position: absolute;
  top: 250px;
  vertical-align: bottom;
  font-size: 3vw;
  font-family: var(--drfont);
  color: var(--Maintextcolor);"> DreamBlog 

  <span style="color: var(--淡黑井五);  font-size: 2vw; ">loading...</span>
 </span>
</div>
</transition>
         <!--动画 -->
          <el-timeline v-if="UserBlogList.length > 0" :class="{tagg:isqh}">
            <el-timeline-item
            
              v-for="(item, index) in UserBlogList"
              :key="index"
            
              :timestamp="item.createdAt"
              placement="top"
             
            >
              <el-card
              @mouseover="checkHeight(index)" 
                class="cardA"
                :id="'card-' + index"
                style="margin-bottom: 50px"
              >
                <div
                  class="head"
                  style="height: 80px; display: flex; align-items: center"
                >
                  <span style="font-size: 2vw; flex: 2"> {{ item.title }}</span>
                  <div
                    style="
                      flex: 1;
                      position: relative;
                      display: flex;
                      height: 80px;
                      justify-content: flex-end;
                      align-items: center;
                      color: var(--淡黑井五);
                    "
                  >
                    <span
                      class="categoryText"
                      :style="`color: ${getColor(item.categoryId)} `"
                      >{{ getCname(item.categoryId) }}</span
                    >
                  </div>
                </div>

                <div
                  :id="'content-' + index"
                  class="content-wrapper"
                  v-html="item.content"
                ></div>
                <div
                  v-show="showCard[index]"
                  class="show-more-button"
                  :id="`show-more-button-${index}`"
                  @click="toggleContent(index)"
                >
                  <div class="show-more-button-btn">
                    <svg
                      t="1710237539534"
                      class="icon"
                      v-show="!svg[index]"
                      style="transform: rotate(180deg)"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="1743"
                      data-spm-anchor-id="a313x.search_index.0.i2.7f6d3a81U9SSoJ"
                      width="40"
                      height="40"
                    >
                      <path
                        d="M140.3 598.4l346.8-392.8c14.3-16.2 39.5-16.2 53.8 0l346.8 392.8c20.4 23.2 4 59.6-26.9 59.6H167.2c-30.9 0-47.3-36.4-26.9-59.6z"
                        fill="#cdcdcd"
                        p-id="1744"
                        data-spm-anchor-id="a313x.search_index.0.i3.7f6d3a81U9SSoJ"
                        class=""
                      ></path>
                      <path
                        d="M883.8 736.7H144.2c-7.1 0-12.9 5.8-12.9 12.9v70.3c0 7.1 5.8 12.9 12.9 12.9h739.7c7.1 0 12.9-5.8 12.9-12.9v-70.3c-0.1-7.1-5.9-12.9-13-12.9z"
                        fill="#e6e6e6"
                        p-id="1745"
                        data-spm-anchor-id="a313x.search_index.0.i1.7f6d3a81U9SSoJ"
                        class=""
                      ></path>
                    </svg>

                    <svg
                      t="1710237539534"
                      class="icon"
                      v-show="svg[index]"
                      style="transform: rotate(0deg)"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="1743"
                      data-spm-anchor-id="a313x.search_index.0.i2.7f6d3a81U9SSoJ"
                      width="40"
                      height="40"
                    >
                      <path
                        d="M140.3 598.4l346.8-392.8c14.3-16.2 39.5-16.2 53.8 0l346.8 392.8c20.4 23.2 4 59.6-26.9 59.6H167.2c-30.9 0-47.3-36.4-26.9-59.6z"
                        fill="#cdcdcd"
                        p-id="1744"
                        data-spm-anchor-id="a313x.search_index.0.i3.7f6d3a81U9SSoJ"
                        class=""
                      ></path>
                      <path
                        d="M883.8 736.7H144.2c-7.1 0-12.9 5.8-12.9 12.9v70.3c0 7.1 5.8 12.9 12.9 12.9h739.7c7.1 0 12.9-5.8 12.9-12.9v-70.3c-0.1-7.1-5.9-12.9-13-12.9z"
                        fill="#e6e6e6"
                        p-id="1745"
                        data-spm-anchor-id="a313x.search_index.0.i1.7f6d3a81U9SSoJ"
                        class=""
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="categoryBox">
                  <img
                    src="@/assets/科技.png"
                    alt=""
                    v-if="item.categoryId == 1"
                  />
                  <img
                    src="@/assets/生活.png"
                    alt=""
                    v-if="item.categoryId == 2"
                  />
                  <img
                    src="@/assets/旅游.png"
                    alt=""
                    v-if="item.categoryId == 3"
                  />
                  <img
                    src="@/assets/健康.png"
                    alt=""
                    v-if="item.categoryId == 4"
                  />
                  <img
                    src="@/assets/娱乐.png"
                    alt=""
                    v-if="item.categoryId == 5"
                  />
                  <img
                    src="@/assets/教育.png"
                    alt=""
                    v-if="item.categoryId == 6"
                  />
                  <img
                    src="@/assets/美食.png"
                    alt=""
                    v-if="item.categoryId == 7"
                  />
                  <img
                    src="@/assets/体育.png"
                    alt=""
                    v-if="item.categoryId == 8"
                  />
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>

          <div
            style="
              position: relative;
              height:60vh;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            v-else-if="!UserBlogList.length && isSkeleton"
          >
            <img src="@/assets/页面为空.png"   width="45%"  alt="" />
            <span
              style="
                font-size: 3vw;
                color: var(--淡黑井五);
                font-family: var(--almm);
                position: absolute;
                bottom: 0%;
              "
            >
              还没有发布文章~
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 右边end -->

    <el-dialog
      title="图片剪裁"
      :visible.sync="isShowDialog"
      class="crop-dialog"
      width="80%"
      :append-to-body="true"
      @close="clearImgHandle"
    >
      <div class="cropperBox">
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          @cropMoving="cropMoving"
        />
        <div class="imgPreview">
          <img :src="previewImg" alt="" />
        </div>
      </div>
      <div class="imgBtn">
        <el-button @click="finish"><i class="el-icon-crop"></i>裁剪</el-button>
        <el-button @click="changeScaleHandle(-10)"
          ><i class="el-icon-zoom-in"></i>缩小</el-button
        >
        <el-button @click="changeScaleHandle(+10)"
          ><i class="el-icon-zoom-out"></i> 放大</el-button
        >
        <el-button @click="rotateLeftHandle"
          ><i class="el-icon-refresh-left"></i> 左旋转</el-button
        >
        <el-button @click="rotateRightHandle"
          >右旋转<i class="el-icon-refresh-right"></i
        ></el-button>
        <el-button
          @click="downloadHandle"
          v-show="previewImg"
          type="success"
          plain
          ><i class="el-icon-download"></i>下载</el-button
        >
        <el-button @click="submitImg" v-show="previewImg" icon="el-icon-upload"
          >上传</el-button
        >
      </div>
    </el-dialog>

    <!--修改信息 -->
    <el-drawer
      title="修改You的信息"
      :before-close="handleClose"
      :visible.sync="drawerDialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <el-form
        label-position="top"
        style="padding: 50px"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="">
          <span><i class="ii"></i>名称Name</span>
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="">
          <span><i class="ii"></i>邮箱Email</span>
          <el-input :disabled="true" v-model="formLabelAlign.email"></el-input>
        </el-form-item>
        <el-form-item label="">
          <span><i class="ii"></i>密码Password</span>
          <el-input
            @input="chckPwd"
            v-model="formLabelAlign.password"
            :disabled="isUpdatePwdBtn"
          >
            <template slot="append">
              <el-button
                v-if="isUpdatePwdBtn"
                @click="isUpdatePwdBtn = !isUpdatePwdBtn"
                >🚨改密码</el-button
              >
              <el-button v-else @click="isUpdatePwdBtn = !isUpdatePwdBtn"
                >⚡不改啦</el-button
              >
            </template></el-input
          >
        </el-form-item>

        <el-form-item label="">
          <transition name="fade">
            <span v-show="isPwd && !isUpdatePwdBtn"
              ><i class="ii"></i>确认密码Password</span
            >
          </transition>
          <transition name="fade">
            <el-input
              v-show="isPwd && !isUpdatePwdBtn"
              v-model="formLabelAlign.password2"
            ></el-input>
          </transition>
        </el-form-item>
      </el-form>
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding-right: 50px;
          align-items: center;
        "
      >
        <el-button
          type="info"
          plain
          @click="drawerDialog = false"
          style="margin-right: 10px"
          >取消</el-button
        >

        <el-popconfirm
          confirm-button-text="好的"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确定修改个人信息吗？"
          @confirm="submitUserInfo"
        >
          <el-button slot="reference" type="warning" plain>确定</el-button>
        </el-popconfirm>
      </div>
    </el-drawer>
    <!-- 修改信息end -->
    <transition name="fade">
      <div class="gifImg" v-show="isFixed">
        <img src="@/assets/透明背景-二次元_猫耳2_爱给网_aigei_com.gif" alt="" />
      </div>
    </transition>

    <transition name="fade">
      <backToTop @scrollToTop="scrollToTop" v-show="showButton"></backToTop>
    </transition>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
import { uploadImgs, updateUrl } from "@/request/api/uploadImg";
import {
  GetUserBlogPostLikeAndViews,
  GetUserBlogPostlist,
  GetBlogPost,
} from "@/request/api/home";
import { PutUser } from "@/request/api/login";
import { WOW } from "wowjs";

export default {
  name: "userInfo",
  components: {
    VueCropper,
  },
  data() {
    return {
      isqh:false,
      duration: 2000, //弹出消息时间而已
      showButton: false,
      isUpdatePwdBtn: true,
      isSkeleton: false, //骨架显示
      isFixed: false, //滚动条显示二次元跳舞(((((ી(･◡･)ʃ)))))
      svg: [], //下拉按钮组
      heights: [], //所有文章的高度装进来~
      showCard: [], //显示下拉按钮啦
      UserBlogList: [], //用户文章组
      userInfo: {},
      isShowDialog: false,
      passwordShow: false,
      isUpdateBtn: false,
      drawerDialog: false,
      isPwd: false, //显示确认密码
      formLabelAlign: {
        password: null,
        userName: null,
        password2: null,
      },
      loadShow: false,
      imageUrl: "",
      days: null,
      UserBlogTotal: {},
      previewImg: "", // 预览图片地址
      uploadImg: null, // 上传图片
      // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        canMoveBox: true, // 截图框能否拖动
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      // 防止重复提交
      loading: false,
      putdata: {
        userId: 0,
        username: "",
        password: "",
        imgUrl: "",
        email: "",
        createdAt: "",
      },
      emojiData: require("@/emoji.json"),
    };
  },

  mounted() {
    new WOW().init();
    this.getUserInfo();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.handleScrollTopBtn);
  },
  beforeUpdate(){
   
  },
  updated() {
    
 
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("scroll", this.handleScrollTopBtn);
  },
  watch: {
  
  },
  methods: {

    togglexx(i){
     console.log(i,'iiiiiii');
if(i==0){
  return ''
}else{
  return 'block2'
}
    },

    handleScrollTopBtn() {
      // 当滚动位置超过页面底部200px时显示按钮
      // console.log(window.scrollY);
      if (window.scrollY == 0) {
        this.showButton = false;
      } else if (window.scrollY > 500) {
        this.showButton = true;
        // this.showButton =
        //   window.innerHeight + window.scrollY >=
        //   document.body.offsetHeight - 10;
      }

      console.log(this.showButton);
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // 平滑滚动
      });
    },

    handleScroll() {
      // console.log(window.scrollY);
      const twentyPercentHeight = window.innerHeight * 1; // 计算页面高度的20%
      if (window.scrollY > twentyPercentHeight) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
checkHeight(index) {
      const content = document.getElementById(`content-${index}`);
      if (content.scrollHeight > 300) {
        console.log(`元素 ${index} 的高度超过 300px`);
        // 进行相应的处理
      } else {
        console.log(`元素 ${index} 的高度不超过 300px`);
        // 进行相应的处理
      }
    },
    // 在获取用户文章列表数据后执行的方法
    handleUserBlogList() {
      this.heights=[]
      this.showCard=[]
      this.svg=[]
  this.$nextTick(()=>{
        // 遍历所有文章元素，判断是否需要显示 "点击显示更多" 的按钮
        this.UserBlogList.forEach((item, index) => {
          this.svg.push(false);
          const content = document.getElementById(`content-${index}`);
          content.style.height = ""; // 将最大高度设置为 300px
        content.style.overflow = "";
          this.heights.push(content.scrollHeight.toString());
          this.showCard.push(content.scrollHeight > 300);
          if (content.scrollHeight > 300) {
            content.style.height = "300px"; // 将最大高度设置为 300px
            content.style.overflow = "hidden";
          }
        });
        console.log(this.heights, "this.heights文章元素的原始高度 保存下来");
        console.log(this.showCard, "this.showCard元素高度大于300px的判断显示");
  })

      // this.$forceUpdate()
    },
    // 展开文章收起
    toggleContent(index) {
      const content = document.getElementById(`content-${index}`); //获取当前的点击的卡片元素
      if (content) {
        content.classList.toggle("expanded");
        const showMoreButton = document.getElementById(
          `show-more-button-${index}`
        );
        if (showMoreButton) {
          this.$set(this.svg, index, content.classList.contains("expanded")); //小箭头按钮显示
          content.style.transition = ".3s";
          content.style.height = content.classList.contains("expanded")
            ? this.heights[index] + "px"
            : "300px"; //点击展开到原来的高度 再点回到300px
        }
      }
    },
    getCname(i) {
      if (i == 1) {
        return "科学";
      } else if (i == 2) {
        return "生活";
      } else if (i == 3) {
        return "旅游";
      } else if (i == 4) {
        return "健康";
      } else if (i == 5) {
        return "娱乐";
      } else if (i == 6) {
        return "教育";
      } else if (i == 7) {
        return "美食";
      } else if (i == 8) {
        return "体育";
      }
    },
    getColor(i) {
      switch (i) {
        case 1:
          return "#3366CC"; // 科学: 深蓝色
        case 2:
          return "#33CC33"; // 生活: 绿色
        case 3:
          return "#FF9900"; // 旅游: 橙色
        case 4:
          return "#9933CC"; // 健康: 紫色
        case 5:
          return "#FF3333"; // 娱乐: 红色
        case 6:
          return "#FFCC00"; // 教育: 黄色
        case 7:
          return "#CC6633"; // 美食: 棕色
        case 8:
          return "#3399FF"; // 体育: 淡蓝色
        default:
          return "#000000"; // 默认颜色
      }
    },

    // 获取文章
    getUserBlogPost(id) {
      console.log(id);
    },
    getUserInfo() {
      
      // this.emojiData=this.emojiData.data.split(',')

      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(this.userInfo);
      this.imageUrl = this.userInfo.imgUrl;
      this.loadShow = true;
      //获取用户所有的浏览量和点赞api
      GetUserBlogPostLikeAndViews(this.userInfo.userId)
        .then((res) => {
          this.UserBlogTotal = res.data;
          // 用户创建的时间
          const userCreationTime = new Date(this.userInfo.createdAt);
          // 当前时间
          const now = new Date();
          // 计算时间间隔（毫秒数）
          const timeDiff = now.getTime() - userCreationTime.getTime();
          // 将毫秒数转换为天数
          this.days = Math.floor(timeDiff / (1000 * 3600 * 24));
          this.loadShow = false;
        })
        .catch((error) => {});
      this.getUserBlogPostLstiFun(0);
    },

    getUserBlogPostLstiFun(sort) {
      //动画切换
    this.isqh= true
    setTimeout(()=>{
      this.isqh= false
    },500)
      GetUserBlogPostlist(this.userInfo.userId, sort)
        .then((res) => {
          if (res.status == 200) {
            this.isSkeleton = true;
            
          }
          this.UserBlogList = res.data;
          // this.isqh= false
          this.handleUserBlogList(); // 在获取到文章列表后执行显示更多按钮的逻辑
        })
        .catch((error) => {});
    },

    //确认密码显示
    chckPwd() {
      if (this.formLabelAlign.password.length) {
        this.isPwd = true;
      } else {
        this.isPwd = false;
      }
    },
    ShowDrawerDialog() {
      this.drawerDialog = true;
      this.formLabelAlign = {
        userId: this.userInfo.userId,
        username: this.userInfo.username,
        email: this.userInfo.email,
        password: this.userInfo.password,
      };
    },
    // 上传按钮 限制图片大小和类型
    handleChangeUpload(file, fileList) {
      const isJPG =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      console.log(file.raw, "图片");
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(async () => {
        // base64方式
        // this.option.img = await fileByBase64(file.raw)
        this.option.img = URL.createObjectURL(file.raw);
        this.loading = false;
        this.isShowDialog = true;
      });
    },
    //上传
    submitImg() {
      uploadImgs(this.uploadImg)
        .then((res) => {
          if (res.status == 200) {
            this.$message.success("更换头像成功");
            this.isShowDialog = false;
            console.log(this.url, "上传参数");
            // 获取到后端图片路径后 再使用这个接口改用户头像地址 报错？？
            this.putdata.userId = this.userInfo.userId;
            this.putdata.imgUrl = res.data.msg;
            console.log(this.putdata, 11515);
            this.upUrl();
          }
        })
        .catch((res) => {
          this.$message.error("上传失败");
        });
    },

    upUrl() {
      // 发送请求
      updateUrl(this.putdata).then((res) => {
        if (res.status == 200) {
          console.log(res.data, "更改图片路径成功");
          this.imageUrl = res.data.imgUrl;

          localStorage.setItem("userInfo", JSON.stringify(res.data));
        }
      });
    },

    // 放大/缩小
    changeScaleHandle(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 左旋转
    rotateLeftHandle() {
      this.$refs.cropper.rotateLeft();
    },
    // 右旋转
    rotateRightHandle() {
      this.$refs.cropper.rotateRight();
    },
    // 下载
    downloadHandle(type) {
      let aLink = document.createElement("a");
      aLink.download = "DreamBlogImg";
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          let downImg = window.URL.createObjectURL(data);
          aLink.href = window.URL.createObjectURL(data);
          aLink.click();
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          let downImg = data;
          aLink.href = data;
          aLink.click();
        });
      }
    },
    // 清理图片
    clearImgHandle() {
      this.option.img = "";
      this.previewImg = "";
    },
    // 截图框移动回调函数
    cropMoving(data) {
      // 截图框的左上角 x，y和右下角坐标x，y
      // let cropAxis = [data.axis.x1, data.axis.y1, data.axis.x2, data.axis.y2]
      // console.log(cropAxis)
    },
    finish() {
      // 获取截图的 blob 数据
      this.$refs.cropper.getCropBlob((blob) => {
        this.loading = true;
        // this.isShowDialog = false;
        const file = this.blobToFile(blob, "croppedImage.png"); // 将Blob对象转换为文件对象
        this.uploadImg = file; // 将文件对象赋值给uploadImg
        console.log("裁剪之后", blob);
        this.previewImg = URL.createObjectURL(blob);
        this.isPreview = true;
      });
      // 获取截图的 base64 数据
      // this.$refs.cropper.getCropData(data => {
      //     console.log(data)
      // })
    },
    // 将Blob对象转换为File对象
    blobToFile(blob, fileName) {
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    },
    //计算数字
    formatNumber(num) {
      if (num >= 1000 && num < 10000) {
        return (num / 1000).toFixed(1) + "K";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "W";
      } else {
        return num.toString();
      }
    },
    // 修改信息弹窗
    //关闭回调
    handleClose(done) {
      this.drawerDialog = false;
      this.formLabelAlign = {};
      this.isPwd = false;
      this.isUpdatePwdBtn = !this.isUpdatePwdBtn;
      this.$notify({
        title: "叮DDD",
        dangerouslyUseHTMLString: true,
        message: "<strong>取消修改思密达😅😅🤐</strong>",
        position: "top-left",
        type: "warning",
        duration: this.duration,
      });
    },
    submitUserInfo() {
      if (
        this.formLabelAlign.username == "" ||
        this.formLabelAlign.username == null
      ) {
        return this.$notify({
          title: "叮DDD",
          dangerouslyUseHTMLString: true,
          message: "<strong><h3>名字只是个代号<br>你咋没有代号😥</h3></strong>",
          position: "top-left",
          type: "warning",
          duration: this.duration,
        });
      }
      if (this.formLabelAlign.username.length > 6) {
        return this.$notify({
          title: "叮DDD",
          dangerouslyUseHTMLString: true,
          message: "<strong><h3>🧙‍♂️神说:<br>只能六字🙏</h3></strong>",
          position: "top-left",
          type: "warning",
          duration: this.duration,
        });
      }

      if (!this.isUpdatePwdBtn) {
        if (
          this.formLabelAlign.password == null ||
          this.formLabelAlign.password == ""
        ) {
          return this.$notify({
            title: "叮DDD",
            dangerouslyUseHTMLString: true,
            message:
              "<strong><h3>密码呢！<br> 我问你密码呢？😅😑😡</h3></strong>",
            position: "top-left",
            type: "warning",
            duration: this.duration,
          });
        }

        if (
          this.formLabelAlign.password2 == null ||
          this.formLabelAlign.password2 == ""
        ) {
          return this.$notify({
            title: "叮DDD",
            dangerouslyUseHTMLString: true,
            message: "<strong><h3>确认密码没有啊 兄弟！😫</h3></strong>",
            position: "top-left",
            type: "warning",
            duration: this.duration,
          });
        }

        if (this.formLabelAlign.password.length > 6) {
          return this.$notify({
            title: "叮DDD",
            dangerouslyUseHTMLString: true,
            message: "<strong><h3>太长了！！6位数😤</h3></strong>",
            position: "top-left",
            type: "warning",
            duration: this.duration,
          });
        }
        if (this.formLabelAlign.password2 != this.formLabelAlign.password) {
          return this.$notify({
            title: "叮DDD",
            dangerouslyUseHTMLString: true,
            message: "<strong><h3>两次密码不一致🤣</h3></strong>",
            position: "top-left",
            type: "warning",
            duration: this.duration,
          });
        }
      }

      PutUser(this.formLabelAlign)
        .then((res) => {
          if (res.status == 200) {
            this.$message.success("已修改");
            this.isUpdatePwdBtn = true;
            this.drawerDialog = false;
            this.userInfo = res.data;
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.formLabelAlign = {};
          }
        })
        .catch((error) => {
          this.$message.error("系统异常");
          this.drawerDialog = false;
        });
    },
  },
};
</script>

<style scoped>
.block{
  position: relative;
 top: 0;
 transition: .3s;
}
.block2{
  top: -200px;
  transition: .3s;
}
.srotBtn {
  position: relative;
  font-family: var(--almm);

}
.srotBtn::after {
  /* opacity: 0; */
  position: absolute;
  top: -8%;
  right: -5%;
  transition: 0.1s;
}

.new::after {
  content: "New";

  color: darkgreen;
}
.hot::after {
  content: "Hot";

  color: rgb(186, 0, 0);
}
.default::after {
  content: "Def";

  color: rgb(133, 133, 133);
}
.srotBtn:hover::after {
  opacity: 1;
  top: -30%;
  right: -5%;
  transition: 0.1s;
}
/*排序 */
.srot {
  display: flex;
  justify-content: flex-end;
}
/* 没数据就100vh */
.hide {
  overflow: hidden;
}
.categoryBox img {
  width: 100%;
  height: 100%;
  user-select: none;
}
.categoryBox {
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;
  height: 100px;
  opacity: 0.1;
  transition: 0.3s;
  /* background-color: aliceblue; */
}
.cardA:hover .categoryBox {
  right: -5%;
  z-index: 1;
  transition: 0.3s;
  opacity: 1;
}
.categoryText {
  opacity: 1;
  font-size: 1.5vw;
  transition: 0.5s;
  font-family: "阿里妈妈刀隶体";
}
.cardA:hover .categoryText {
  /* display: none; */
  opacity: 0.1;
  font-size: 5vw;
  transition: 0.5s;
  position: absolute;
}
.gifImg {
  position: fixed;
  left: 10%;
  user-select: none;
}
.gifImg img {
  width: 300px;
  height: 300px;
}
.content-wrapper {
  /* background-color: antiquewhite; */
}

.el-card .el-timeline-item div:last-child {
  display: none;
}

.el-card .el-timeline-item div:last-child.visible {
  display: block;
}

body {
  /* height: 100vh; */
  width: 100%;
}
.crop-dialog {
  display: flex;
}

.vue-cropper {
  width: auto;
  height: 100%;
  flex: 2;
}

.cropperBox {
  height: 50vh !important;
  display: flex;
}
.imgPreview {
  /* flex: 1; */

  margin: 0 5px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgPreview::after {
  content: "预览";
  display: block;
  position: absolute;
  /* top: 0;
  left: 0; */
  transform: translate(0, -50%);
}

.imgPreview img {
  border-radius: 100%;
  border: 1px solid var(--淡黑井五);
}
.imgBtn {
  display: flex;
  /* justify-content: space-between; */
  margin-top: 50px;
}
.BOX {
  width: 80%;
  /* background-color: wheat; */
  height: 100vh;
  margin: 0 auto;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  position: relative;
}

.left {
  /* border: 1px solid #000; */
  height: 100%;
  width: 20%;
  padding: 20px;
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 60px;
}
.right {
  /* border: 1px solid #e80000; */
  height: 100%;
  width: 80%;
  padding: 30px;
  /* display: flex; */
}
.picture {
  /* 1/1 */
  aspect-ratio: 1/1;
  /* background-color: #d90505; */
  border-radius: 100%;
  overflow: hidden;
  position: relative;
}

.avatar-uploader {
  background-color: #f0f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: auto;
  width: auto;
  aspect-ratio: 1/1 !important;
  /* background-color: red; */
  /* opacity: 0; */
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
/* 名字 */
.userName {
  display: flex;
  font-size: 2vw; 
  justify-content: center;
  align-items: center;
  height: 30%;
  /* background-color: aqua; */
  color: var(--Maintextcolor);
  font-family: var(--almm);
  

}


.updateUserInfoBox {
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: flex-start;
  position: relative;
  min-height: 50%;
}
.updateUserInfoBox > div {
  margin: 20px 0;
}
.updateUserInfoBox_btn {
  position: absolute;
  bottom: -50px;
  left: 0;
}

.right_a {
  /* border: 1px solid #555; */
  height: 30%;
  background-color: var(--bgColor);
  padding: 1vw;
  color: var(--淡黑井五);
  font-family: var(--almm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right_a_logo {
  color: var(--Maintextcolor);
  font-family: "Crotah free version";
  font-size: 4.5vw;
  margin: 0 20px;
}
.right_a_text1 {
  font-size: 3cqw;
  resize: both; /* 设置容器可以在水平和垂直方向上调整大小。 */
  container-type: size; /* 容器查询属性*/
}
.right_a_text2 {
  font-size: 1vw;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  resize: none; /* 设置容器可以在水平和垂直方向上调整大小。 */
  container-type: size; /* 容器查询属性*/
  padding-bottom: 20px;
}
.right_a_num {
  font-size: 5cqw;
  font-family: "Crotah free version";
  color: var(--黄色突出);
  margin: 0 10px;
}
.right_b {
  /* border: 1px solid #555; */

  margin-top: 20px;
  background-color: var(--bgColor);
  color: var(--淡黑井五);
  padding: 20px;
}

.userInfoText {
  font-family: "Crotah free version";
  font-size: 1vw;
  color: var(--淡黑井五);
 
  
}
.userInfoTextNUM {
  width: 100%;
  font-family: "Crotah free version";
  font-size: 1.2vw;
  color: var(--黄色突出);
  
}

@keyframes flicker {
  0% { text-shadow: 2px 2px 2px  var(--黄色突出); }
  50% { text-shadow: 2px 2px 5px  rgba(251, 251, 251, 0.5); }
  100% { text-shadow: 2px 2px 2px var(--黄色突出); }
}

.fade1-enter-active {
  animation: flicker .5s ease;
  
}
.fade1-leave-active {
  transition: all .8s ease;
}
.fade1-enter,
.fade1-leave-to {
  opacity: 0;
  transform: translateY(-100%);

}
.cardA {
  position: relative;
  overflow: inherit;
  /* border-bottom-left-radius: 0; */
  /* border-bottom-right-radius: 0; */
}
.show-more-button {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: end;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 255, 255, 0.119); */

  top: 0;
  left: 0;
}
.show-more-button-btn {
  position: relative;
  z-index: 1;
  bottom: 20px;
  display: flex;
  justify-content: center;
  color: #fff;
  width: 99.35%;
  height: 0px;
  border-bottom-right-radius: 100%;
  border-bottom-left-radius: 100%;
  background: linear-gradient(
    180deg,
    rgb(255, 255, 255) 20%,
    rgba(128, 128, 128, 0.237) 80%
  );
  transition: all 0.3s ease-in-out 0s;
  box-shadow: rgba(193, 244, 246, 0.698) 0px 0px 0px 0px;
  align-items: center;
  /* left: 0; */
  /* transform: translate(50%,100%); */
}

.show-more-button-btn svg {
  height: 0;
  transition: 0.3s;
  position: relative;
  top: -50px;
  /* color: red; */
}
.show-more-button:hover .show-more-button-btn {
  transform: scale(1.01);
  animation: 1.2s cubic-bezier(0.8, 0, 0, 1) 0s infinite normal none running
    pulse;
  height: 50px;
  bottom: -40px;
}
.show-more-button:hover .show-more-button-btn svg {
  height: 50px;
  transition: 1s;
  top: 0px;
}
@keyframes pulse {
  100% {
    box-shadow: 0 0 0 15px rgba(255, 106, 0, 0.025);
  }
}
.tagg{
  animation:.5s wipe-in-up ease-in-out 1 ;
}
/* 动画 */

@keyframes wipe-in-up {
  from {
    clip-path: inset(100% 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}



@keyframes wipe-out-down {
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(100% 0 0 0);
  }
}


</style>