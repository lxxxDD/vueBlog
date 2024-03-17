<template>
  <div>
    <div
      style="width: 100%; height: 100vh; position: relative; overflow: hidden"
      v-if="list.length > 0"
    >
      <div class="head">
        <div class="logo" @click="$router.push('/')">Dream</div>
        <div class="title" style="flex: 2">{{ title }}</div>
        <div class="userBox">
          <div style="display: flex; align-items: center">
            <img :src="$BASEURL + list[0].user.imgUrl" alt="" width="50px" />
            <span style="font-family: var(--almm)">{{
              list[0].user.username
            }}</span>
          </div>
        
        </div>
      </div>
      <div class="Box">
        <div class="textBox">
          <el-carousel
            :autoplay="false"
            class="custom-carousel"
            trigger="click"
            @change="getThisCard"
            arrow="never"
            type="card"
            indicator-position="none"
            height="80vh"
            ref="carousel"
          >
            <el-carousel-item
              class="el-carousel-item"
              :id="`el-carousel-item-${index}`"
              v-for="(item, index) in list"
              :key="index"
              :setActiveItem="index"
            >
              <el-card class="content-box" ref="contentbox">
                <div
                  class="content"
                  ref="contentContainer"
                  v-html="item.content"
                ></div>
                <el-divider style="margin: 200px auto"
                  >发布时间 {{ item.createdAt }}</el-divider
                >

                <div class="tag" v-show="tags.length">
                  <span
                    style="
                      font-size: 1.5vw;
                      font-family: var(--almm);
                      color: var(--淡黑井五);
                      width: 100px;
                      display: block;
                    "
                  >
                    分类:
                  </span>
                  <div class="cBox">
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
                    <span
                      class="ctagText"
                      :style="`color: ${getColor(item.categoryId)};`"
                      >{{ getCname(item.categoryId) }}</span
                    >
                  </div>
                </div>

                <div class="tag" v-show="tags.length">
                  <span
                    style="
                      font-size: 1.5vw;
                      font-family: var(--almm);
                      color: var(--淡黑井五);
                      width: 100px;
                      display: block;
                    "
                  >
                    标签：
                  </span>
                  <div>
                    <el-tag
                      style="margin-left: 15px"
                      v-for="(tag, index1) in tags"
                      :key="index1"
                      type="success"
                      >{{ tag }}</el-tag
                    >
                  </div>
                </div>

                <div class="commitBox">
                  <div class="commitPush">
                    <el-input
                      type="textarea"
                      placeholder="写下你的评论...."
                      :rows="3"
                      resize=""
                      @focus="foin"
                      @keyup.enter="pushCommitText"
                      v-model="commitText"
                    ></el-input>
                    <transition name="slide1">
                      <div class="commitPushBtn" v-show="showBtn">
                        <div
                          style="flex: 1; display: flex; align-items: center"
                        >
                          <div style="position: relative">
                            <el-tooltip
                              style="
                                border-radius: 100%;
                                margin-left: 15px;
                                height: 40px;
                                width: 40px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                              "
                              placement="bottom-end"
                              effect="light"
                              :hide-after="0"
                            >
                              <div slot="content">
                                <div class="emoji">
                                  <ul class="emojiBox">
                                    <li
                                      class="emojiItem"
                                      v-for="(e, eindex) in emoji"
                                      :key="eindex"
                                      @click="pushEmojiText(e)"
                                    >
                                      {{ e }}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <el-button
                                ><svg
                                  t="1710669277111"
                                  class="icon"
                                  viewBox="0 0 1024 1024"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  p-id="8007"
                                  width="20"
                                  height="20"
                                >
                                  <path
                                    d="M512 979C263.472 979 62 777.528 62 529S263.472 79 512 79s450 201.472 450 450-201.472 450-450 450zM337 479c41.421 0 75-33.579 75-75s-33.579-75-75-75-75 33.579-75 75 33.579 75 75 75z m350 0c41.421 0 75-33.579 75-75s-33.579-75-75-75-75 33.579-75 75 33.579 75 75 75zM312 629c0 110.457 89.543 200 200 200s200-89.543 200-200H312z"
                                    fill="#1AA5FF"
                                    p-id="8008"
                                  ></path>
                                </svg>
                              </el-button>
                            </el-tooltip>
                          </div>
                          <span class="ksEM"
                            style="margin-left: 10px"
                            @click="commitText += '😂'"
                            >😂</span
                          >
                          <span class="ksEM"
                            style="margin-left: 5px; user-select: none"
                            @click="commitText += '😎'"
                            >😎</span
                          >
                          <span class="ksEM"
                            style="margin-left: 5px; user-select: none"
                            @click="commitText += '😍'"
                            >😍</span
                          >
                          <span class="ksEM"
                            style="margin-left: 5px; user-select: none"
                            @click="commitText += '😮'"
                            >😮</span
                          >
                          <span class="ksEM"
                            style="margin-left: 5px; user-select: none"
                            @click="commitText += '🤗'"
                            >🤗</span
                          >
                        </div>
                        <el-button
                          type="warning"
                          :disabled="commitText == ''"
                          plain
                          @click="pushCommitText"
                          @keyup.enter="pushCommitText"
                          style="margin-right: 10px"
                          >发布</el-button
                        >
                      </div>
                    </transition>
                  </div>
                  <div  style="font-size: 1.5vw; font-family: var(--almm)">
                    评论({{ commitList.length ?commitList.length:'加载'}})
                  </div>
                  <div v-if="commitList.length>0">
                    <div
                      style=""
                      v-for="commit in commitList"
                      :key="commit.commentId"
                    >
                      <div style="flex: 1">
                        <div
                          v-if="commit.user != null"
                          style="
                            display: flex;
                            align-items: center;
                            margin-top: 30px;
                          "
                        >
                          <img
                            style="border-radius: 50%; width: 3vw"
                            :src="$BASEURL + commit.user.imgUrl"
                            alt=""
                          />
                          <span style="font-weight: bold; margin-left: 15px">
                            {{ commit.user.username }}</span
                          >
                        </div>

                        <div
                          style="
                            display: flex;
                            align-items: center;
                            margin-top: 30px;
                          "
                          v-else
                        >
                          <img
                            style="border-radius: 50%; width: 3vw"
                            src="@/assets/健康.png"
                            alt=""
                          />
                          <span style="font-weight: bold; margin-left: 15px"
                            >Dream用户</span
                          >
                        </div>
                      </div>
                      <div
                        style="
                          flex: 3;
                          padding: 20px 0;
                          margin-left: 15px;
                          font-size: 1.2vw;
                        "
                      >
                        {{ commit.content }}
                      </div>
                      <div style="flex: 1; color: rgba(132, 145, 165)">
                        {{ commit.createdAt }}
                      </div>
                    </div>
                  </div>
                  <div class="commitNull" v-else>
                    <span>暂无评论</span>
                    <el-button @click="foin" style="font-family: var(--almm)"
                      >去发布</el-button
                    >
                  </div>
                </div>
              </el-card>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <transition name="slide">
        <div class="bottom" v-show="isPackUp">
          <div class="lbtn bbtn">
            <button id="bottone5" @click="zzShow=true">作者</button>
            <button id="bottone5" @click="isCommitShiw = true">评论</button>
          </div>

          <div class="mbtn bbtn" style="flex: 2">
            <button class="bttt" @click="prev">
              <span>上一篇</span>
            </button>
            <button class="bttt" @click="next">
              <span>下一篇</span>
            </button>
          </div>
          <div class="rbtn bbtn">
            <button id="bottone5" @click="likePost(userInfo.userId,list[CardIndex].postId)">点赞
              <span  v-if="list[CardIndex].likes" style="width: auto;  color: var(--黄色突出);">({{
              formatNumber(list[CardIndex].likes)
              }})</span>
              <img v-show="dzShow" style="position: absolute; top: -250%; z-index: -12222;" src="@/assets/点赞.gif" alt="">
              </button>
            <button id="bottone5" @click="PackUp">收起</button>
          </div>
        </div>
      </transition>
    </div>
    <transition name="slide">
      <div class="upBtn" v-show="!isPackUp" @click="PackUp">
        <button class="button">
          <span class="bracket left">❴</span>
          <span class="text">展开</span>
          <span class="bracket right">❵</span>
        </button>
      </div>
    </transition>
    <el-dialog :visible.sync="isCommitShiw" width="60%" center>
      <div class="commitBox2">
        <div class="commitPush2" style="padding-bottom: 100px">
          <el-input
            type="textarea"
            maxlength="30"
            placeholder="写下你的评论...."
            :rows="3"
            resize=""
            v-model="commitText"
            @focus="foin"
            @keyup.enter="pushCommitText"
          ></el-input>

          <transition name="slide1">
            <div class="commitPushBtn" v-show="showBtn">
              <div style="flex: 1; display: flex; align-items: center">
                <div style="position: relative">
                  <el-tooltip
                    style="
                      border-radius: 100%;
                      margin-left: 15px;
                      height: 40px;
                      width: 40px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                    placement="bottom-end"
                    effect="light"
                    :hide-after="0"
                  >
                    <div slot="content">
                      <div class="emoji">
                        <ul class="emojiBox">
                          <li
                            class="emojiItem"
                            v-for="(e, eindex) in emoji"
                            :key="eindex"
                            @click="pushEmojiText(e)"
                          >
                            {{ e }}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <el-button
                      ><svg
                        t="1710669277111"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="8007"
                        width="20"
                        height="20"
                      >
                        <path
                          d="M512 979C263.472 979 62 777.528 62 529S263.472 79 512 79s450 201.472 450 450-201.472 450-450 450zM337 479c41.421 0 75-33.579 75-75s-33.579-75-75-75-75 33.579-75 75 33.579 75 75 75z m350 0c41.421 0 75-33.579 75-75s-33.579-75-75-75-75 33.579-75 75 33.579 75 75 75zM312 629c0 110.457 89.543 200 200 200s200-89.543 200-200H312z"
                          fill="#1AA5FF"
                          p-id="8008"
                        ></path>
                      </svg>
                    </el-button>
                  </el-tooltip>
                </div>
                <span class="ksEM" style="margin-left: 10px" @click="commitText += '😂'"
                  >😂</span
                >
                <span class="ksEM"
                  style="margin-left: 5px; user-select: none"
                  @click="commitText += '😎'"
                  >😎</span
                >
                <span class="ksEM"
                  style="margin-left: 5px; user-select: none"
                  @click="commitText += '😍'"
                  >😍</span
                >
                <span class="ksEM"
                  style="margin-left: 5px; user-select: none"
                  @click="commitText += '😮'"
                  >😮</span
                >
                <span class="ksEM"
                  style="margin-left: 5px; user-select: none"
                  @click="commitText += '🤗'"
                  >🤗</span
                >
              </div>
              <el-button
                type="warning"
                :disabled="commitText == ''"
                plain
                @click="pushCommitText"
                @keyup.enter="pushCommitText"
                style="margin-right: 10px"
                >发布</el-button
              >
            </div>
          </transition>
        </div>

        <div style="font-size: 1.5vw; font-family: var(--almm)">
          评论({{ commitList.length }})
        </div>
        <div v-if="commitList.length">
          <div style="" v-for="commit in commitList" :key="commit.commentId">
            <div style="flex: 1">
              <div
                v-if="commit.user != null"
                style="display: flex; align-items: center; margin-top: 30px"
              >
                <img
                  style="border-radius: 50%; width: 3vw"
                  :src="$BASEURL + commit.user.imgUrl"
                  alt=""
                />
                <span style="font-weight: bold; margin-left: 15px">
                  {{ commit.user.username }}</span
                >
              </div>

              <div
                style="display: flex; align-items: center; margin-top: 30px"
                v-else
              >
                <img
                  style="border-radius: 50%; width: 3vw"
                  src="@/assets/健康.png"
                  alt=""
                />
                <span style="font-weight: bold; margin-left: 15px"
                  >Dream用户</span
                >
              </div>
            </div>
            <div
              style="
                flex: 3;
                padding: 20px 0;
                margin-left: 15px;
                font-size: 1.2vw;
              "
            >
              {{ commit.content }}
            </div>
            <div style="flex: 1; color: rgba(132, 145, 165)">
              {{ commit.createdAt }}
            </div>
          </div>
        </div>
        <div class="commitNull" v-else>
          <span>暂无评论</span>
          <el-button style="font-family: var(--almm)" @click="foin">去发布</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="zzShow" @close="zzShow=false">
    1
  
  </el-dialog>
  </div>
</template>

<script>
import { PostComment, GetComments } from "@/request/api/commnt";
import { GetBlogPost,setLike } from "@/request/api/home";
// 导入 JSON 文件
import emoji from "@/emoji.json";
export default {
  data() {
    return {
      zzShow:false,
      list: [],
      Height: "100vh",
      title: "",
      isPackUp: true,
      showBtn: false,
      dzShow: false,
      tags: [],
      CardIndex: 0,
      commitText: "",
      commitList: [],
      isCommitShiw: false,
      emoji: emoji.data,
      userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
      submitCommit: {
        commentId: 0,
        content: "",
        userId: null,
        postId: null,
      },
    };
  },
  mounted() {
    console.log(this.userInfo);
    this.getUserBlogPost();
    this.emoji = this.emoji.split(",");
    this.$notify.info({
      title: "温馨提示",
      dangerouslyUseHTMLString: true,
      message:
        '<strong><span style="color: var(--黄色突出)">Ctrl</span>与<span style="color: var(--黄色突出)">+</span>和<span style="color: var(--黄色突出)">-</span>可调整内容大小哦</strong>',
      position: "top-left",
      duration: 10000,
    });
    this.$nextTick(() => {
    setTimeout(() => {
        const AllCard = document.querySelectorAll(".el-carousel__item");
        if(AllCard.length>0){
          AllCard.forEach((Carditem) => {
          if (Carditem.id != "el-carousel-item-0") {
            Carditem.style.filter = "blur(5px)"; // 添加朦胧感，数值可以根据需求调整
            Carditem.style.width = "95%";
          } else {
            Carditem.style.width = "95%";
          }
      
      });
        }
       
    }, 1000);
  });
  },
  methods: {
    foin(){
this.showBtn = true
    },
    // 点赞时间
   // 点赞函数
 likePost(userId, postId) {
 // 从本地存储中获取所有用户的点赞记录
 let usersLiked = JSON.parse(localStorage.getItem('usersLiked')) || {};
// 初始化用户的点赞记录为数组
if (!Array.isArray(usersLiked[userId])) {
    usersLiked[userId] = [];
  }
// 如果该用户已经点过该篇文章的赞，则禁止点赞
if (usersLiked[userId] && usersLiked[userId].includes(postId)) {

  this.$message.warning("您已经点过赞了！")
  return; // 终止函数执行
}

// 模拟点赞逻辑，这里可以添加实际的点赞代码

this.$message.success("点赞成功！")
this.dzShow=true
setTimeout(()=>{
  this.dzShow=false

},3000)
setLike(postId).then(res=>{
console.log(res.data);
GetBlogPost(this.$route.query.id)
        .then((res) => {
 this.list=res.data

        })
        .catch((error) => {});


}).catch(error=>{})
// 更新本地存储中的点赞记录
if (!usersLiked[userId]) {
  usersLiked[userId] = []; // 初始化用户的点赞记录
}
usersLiked[userId].push(postId); // 存储文章ID到用户点赞记录中
localStorage.setItem('usersLiked', JSON.stringify(usersLiked)); // 将更新后的数据存回本地存储
},






    // 发评论
    pushCommitText() {
      if (this.commitText == "" || this.commitText == null) {
        return this.$message.error("异常");
      }
      if (this.userInfo == null) {
        return this.$message.warning("登录之后 即可评论哟🙏");
      }
      this.submitCommit = {
        commentId: 0,
        content: this.commitText,
        userId: this.userInfo.userId,
        postId: this.list[this.CardIndex].postId,
      };
      console.log(this.submitCommit, "数据");
      PostComment(this.submitCommit)
        .then((res) => {
          if (res.status == 200) {
            this.$message.success("发布成功~");
            this.commitText = "";
            this.getCommebtLsit();
            this.showBtn = false;
          }
        })
        .catch((error) => {});
    },
    // emoji点击 添加到输入框
    pushEmojiText(v) {
      this.commitText += v;
    },
    getUserBlogPost() {
      this.CardIndex = 0;
      GetBlogPost(this.$route.query.id)
        .then((res) => {
          console.log(res);
          this.list = res.data;
          this.title = res.data[0].title;
          // 评论
          this.getCommebtLsit();

          if (this.list[0].tags.trim() === "") {
            this.tags = [];
          } else {
            this.tags = this.list[0].tags.split(",");
          }
        })
        .catch((error) => {});
    },
    getCommebtLsit() {
      this.commitList =[]
      GetComments(this.list[this.CardIndex].postId)
        .then((c) => {
          this.commitList = c.data;
        })
        .catch((error) => {});
    },
    prev() {
      // 使用 prev 方法切换到上一张
      this.$refs.carousel.prev();
    },
    next() {
      // 使用 next 方法切换到下一张
      this.$refs.carousel.next();
    },
    // 当前文章索引
    getThisCard(val, odl) {
      this.CardIndex = val;
      
      console.log(this.list[ this.CardIndex].likes);
      this.getCommebtLsit();
      console.log(val + "当前的文章索引");
      if (this.list[val].tags.trim() === "") {
        this.tags = [];
      } else {
        this.tags = this.list[val].tags.split(",");
      }
      this.title = this.list[val].title;

      const item = document.getElementById("el-carousel-item-" + val);
      const odlitem = document.getElementById("el-carousel-item-" + odl);
      item.style.width = "95%";
      item.style.filter = ""; // 设置当前文章不变
      item.style.userSelect = "";
      const content = document.querySelectorAll(".el-card__body");
      //   item.style.height = "auto";
      const AllCard = document.querySelectorAll(".el-carousel__item");
      AllCard.forEach((Carditem) => {
        if (Carditem.id != item.id) {
          Carditem.style.filter = "blur(5px)"; // 添加朦胧感，数值可以根据需求调整
          Carditem.style.width = "50%";
          Carditem.style.userSelect = "none";
        }
      });
      // if (item.scrollHeight > 300) {
      //   console.log(`元素 的高度超过 300px`);
      //   // 进行相应的处理
      // } else {
      //   console.log(`元素的高度不超过 300px`);
      //   // 进行相应的处理
      // }
    },

    // 收起
    PackUp() {
      this.isPackUp = !this.isPackUp;
      // 使用 $nextTick() 确保在 DOM 更新后再操作
      // 使用 $nextTick() 确保在 DOM 更新后再操作

      const aa = document.querySelectorAll(".content-box");
      const bb = document.querySelectorAll(".el-carousel__item ");
      if (!this.isPackUp) {
        bb[this.CardIndex].style.height = "95vh";
        aa[this.CardIndex].style.height = "95vh";
        if (aa) {
          aa.forEach((aaa, index) => {
            aaa.style.height = "95vh";
            bb[index].style.height = "95vh";
          });
        }
      } else {
        bb[this.CardIndex].style.height = "80vh";
        aa[this.CardIndex].style.height = "80vh";
        // bb[0].style.height = "80vh";
        aa.forEach((aaa, index) => {
          aaa.style.height = "80vh";
          bb[index].style.height = "80vh";
        });
      }
    },
    getCname(i) {
      if (i == 1) {
        return "科技";
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
    formatNumber(num) {
  
        if (num >= 1000 && num < 10000) {
        return (num / 1000).toFixed(1) + "K";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "W";
      } else {
        return num.toString();
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
  },
};
</script>

<style scoped>
/* 表情 */
.emoji {
  width: 500px;
  height: auto;
  background-color: #ffffff;
  /* top:0 ; */

  bottom: 100%; /* 子元素的底部位于父元素的头部 */
}
.ksEM{
  transition: .3s;
}
.ksEM:hover{
  transform: scale(1.3);
}
.emojiBox {
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  height: 300px;
  overflow: auto;
}

.emojiItem {
  user-select: none;
  background-color: rgba(190, 190, 190, 0.285);
  width: 30px;
  height: 30px;
  margin: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.1s;
}
.emojiItem:hover {
  transform: scale(1.1);
  font-size: 2vw;
}
/* 评论 */
.commitBox {
  margin-top: 200px;
  background-color: var(--bgColor);
  padding-top: 100px;
}
.commitPush {
  margin-top: 100px;
  margin-bottom: 100px;
  /* display: flex; */
  /* flex-direction: column; */
}
.commitPushBtn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  border: 1px solid #55555537;
  border-top-color: transparent;
}
.commitNull {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
  font-family: var(--almm);
  color: var(--淡黑井五);
  padding: 10px 0;
  /* background-color: #06d6a0; */
}
/* 展开 */
.upBtn {
  /* background-color: #06d6a0; */
  width: 5vw;
  height: 10vh;
  position: absolute;
  bottom: 1%;
  right: 5%;
  z-index: 9999;
  cursor: pointer;
  padding: 5px;
  overflow: hidden;
  /* position: relative; */
}

.cBox img {
  height: 25vw;
  width: auto;
  position: absolute;
  right: -20px;
  top: 10px;
  opacity: 0.1;
}
.cBox {
  position: relative;
  width: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* background-color: #118ab2; */
}
.ctagText {
  font-size: 10vw;
  font-family: var(--almm);
  opacity: 0.6;
}

.Box {
  /* height: 1000px; */
  width: 100%;
  margin: 0 auto;
  /* padding-bottom: 20px; */
}
.head {
  height: 10vh;
  background-color: var(--bgColor);
  padding: 1px;
  display: flex;
  justify-content: space-around;
  color: var(--淡黑井五);
  /* border-bottom: 1px solid #5555552d; */
}

.logo {
  font-size: 3vw;
  color: var(--Maintextcolor);
  font-family: var(--drfont);
  /* background-color: #ff6b6b; */
  flex: 1;
  margin: 0 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.081) 0 1px 3px 0;
  box-sizing: border-box;
}
.title {
  text-align: center;
  font-size: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 3;
  padding: 5px;
  /* background-color: #d1c9cd; */
  box-shadow: rgba(0, 0, 0, 0.081) 0 1px 3px 0;
  box-sizing: border-box;
  font-family: var(--drfont);
}
.tag {
  width: 100%;
  max-height: 100px;
  /* padding: 50px 0; */
  /* background-color: aqua; */
  margin: 100px 0;
  display: flex;
  align-items: center;
  /* background-color: var(--bgColor); */
}
.userBox {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5vw;
  box-shadow: rgba(0, 0, 0, 0.081) 0 1px 3px 0;
  box-sizing: border-box;
}
.userBox img {
  width: 3vw;
  height: 3vw;
  border-radius: 100%;
}
.bottom {
  height: 10vh;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  /* padding-bottom: 15px; */
  position: relative;
  z-index: 155;
  box-shadow: -5px -5px 10px 20px var(--卡片颜色);
}
.bottom > .bbtn {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  /* padding: 1px; */
  height: 100%;
}
.bbtn > button {
  height: 100%;
  /* background-color: #ffffff54; */
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1px;
}

/* 主 */
.textBox {
  /* padding: 50px; */
  flex: 1;
  position: relative;
  left: -25%;
}
.custom-carousel {
  position: relative;
  /* left: -10px; */
  width: 100%;
  /* overflow: hidden; */
}
.content-box {
  height: 80vh;
  margin-top: -1%;
  padding: 50px 80px 100px 80px;
  overflow: auto;
}
.content-box:hover {
  /* overflow: auto; */
}
.content {
}
/* 每个块 */
.el-carousel__item {
  /* height: 700px; */
  /* background-color: #ffffff; */
  box-shadow: 5px 20px 10px 20px #3e3e3e33;
  /* padding: 15px; */
  transition: 0.3s;
  filter: blur(0);

  width: 100%;
}
.el-carousel--horizontal {
  overflow: visible;
}
/*标题 */
.medium {
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  align-items: first baseline;
  /* padding: 50px; */
  font-size: 3vw;
  color: var(--淡黑井五);
}
.el-carousel__item {
  width: 70%;
}

/* 展开按钮 */
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 45px;
  width: 50px;
  border: none;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  position: relative;
  /* bottom: -20px; */
  /* left: 0; */
  box-shadow: 0 0 10px 0px #555;
}
.bracket {
  font-size: 18px;
  transition: all 0.3s;
  color: rgb(182, 104, 255);
}
.text {
  font-size: 15px;
  width: 0;
  transform: scale(0);
  transition: all 0.3s;
  color: var(--淡黑井五);
}
.button:hover {
  /* width: 100px; */
  bottom: -10px;
}
.button:hover .text {
  transform: scale(1);
  width: 40px;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */

/* 自定义滚动条样式 */
.content-box::-webkit-scrollbar {
  width: 5px; /* 滚动条宽度 */
}

.content-box::-webkit-scrollbar-track {
  background-image: linear-gradient(
    45deg,
    #ff6b6b 25%,
    #ffd166 25%,
    #ffd166 50%,
    #06d6a0 50%,
    #06d6a0 75%,
    #118ab2 75%
  );
}

.modal-container-body::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5); /* 滚动条手柄颜色 */
  border-radius: 5px; /* 滚动条手柄圆角 */
}

/* 自定义滚动条样式 */
.el-carousel__item::-webkit-scrollbar {
  width: 5px; /* 滚动条宽度 */
}

.el-carousel__item::-webkit-scrollbar-track {
  background-image: linear-gradient(
    45deg,
    #ff6b6b 25%,
    #ffd166 25%,
    #ffd166 50%,
    #06d6a0 50%,
    #06d6a0 75%,
    #118ab2 75%
  );
}

.el-carousel__item::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5); /* 滚动条手柄颜色 */
  border-radius: 5px; /* 滚动条手柄圆角 */
}

#bottone5 {
  align-items: center;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: var(--almm);
  font-size: 1.5vw;
  font-weight: 600;
  justify-content: center;

  /* padding: calc(0.875rem - 1px) calc(1.5rem - 1px); */
  flex: 1;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

#bottone5:hover,
#bottone5:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

#bottone5:hover {
  transform: translateY(-1px);
}

#bottone5:active {
  background-color: #f0f0f1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
.bttt {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #183153;
  font-family: var(--almm);
  font-size: 2vw;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
}

.bttt:after {
  content: " ";
  width: 0%;
  height: 100%;
  background: #ffd401;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

.bttt:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

.bttt span {
  text-align: center;
  text-decoration: none;
  width: 100%;
  padding: 18px 25px;
  color: #fff;
  font-size: 1.125em;
  font-weight: 700;
  letter-spacing: 0.3em;
  z-index: 20;
  transition: all 0.3s ease-in-out;
}

.bttt:hover span {
  color: #183153;
  animation: scaleUp 0.3s ease-in-out;
}

@keyframes scaleUp {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.1s ease; /* 设置transform变化的过渡效果 */
}
.slide-enter,
.slide-leave-to {
  transform: translateY(100%); /* 进场前和离场后，内容向上平移隐藏 */
  transform-origin: top; /* 设置变换的原点为顶部 */
}

.slide1-enter-active,
.slide1-leave-active {
  transition: transform 0.1s ease; /* 设置transform变化的过渡效果 */
}
.slide1-enter,
.slide1-leave-to {
  transform: translateY(-100%); /* 进场前和离场后，内容向上平移隐藏 */
  transform-origin: top; /* 设置变换的原点为顶部 */
}
</style>