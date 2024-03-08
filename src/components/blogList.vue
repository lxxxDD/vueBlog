<template>
  <div class="BOX">
   <div class="showBox" style="width: 100%;  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; "  v-if="list.length>0">
    <div
      class="modal wow slideInLeft"
      v-for="i in list"
      :key="i.postId"
      data-wow-delay="1s"
    >
      <article class="modal-container">
        <header class="modal-container-header">
          <span class="Ctag">
            {{ getCname(i.categoryId) }}
          </span>
          <span class="modal-container-title">
            {{ i.title }}
          </span>
          <span class="userImg">
          <img :src="$BASEURL+i.user.imgUrl" >
          </span>
        </header>
        <section class="modal-container-body rtf" v-html="i.content"></section>
        <footer class="modal-container-footer">
          <button class="button is-ghost">
            {{ i.views == null ? 0 : i.views }}
            <span style="color: #000">👁‍🗨</span>
          </button>

          <button class="button is-ghost">
            {{ i.likes == null ? 0 : i.likes }}
            <span style="color: #000">💜</span>
          </button>
          <button class="button is-primary">详情</button>
        </footer>
      </article>
    </div>
  </div>
 
    <div class="loading" v-else style="height: 500px; display: flex; justify-content: center; align-items: center;">
      <bookLoading></bookLoading>
    </div>
  </div>
</template>

<script>
import { WOW } from "wowjs";
export default {
  name: "blogList",
  props: {
    list: Array,
    userName: String,
  },
  data() {
    return {};
  },

  mounted() {
    new WOW().init();
    const modals = document.querySelectorAll(".modal-container-body");
    modals.forEach((modal) => {
      let timer;
      modal.addEventListener("mouseenter", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          modal.style.overflowY = "auto";
        }, 1000); // 两秒后显示滚动条
      });
      modal.addEventListener("mouseleave", () => {
        clearTimeout(timer);
        modal.style.overflowY = "hidden";
      });
    });
  },
  updated() {
    const modals = document.querySelectorAll(".modal-container-body");
    modals.forEach((modal) => {
      let timer;
      modal.addEventListener("mouseenter", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          modal.style.overflowY = "auto";
        }, 1000); // 两秒后显示滚动条
      });
      modal.addEventListener("mouseleave", () => {
        clearTimeout(timer);
        modal.style.overflowY = "hidden";
      });
    });

    console.log("更新之后");
  },

  methods: {
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
  },
};
</script>

<style  scoped>
.BOX {
 
}

/*卡片 */
.button,
.input,
.select,
.textarea {
  font: inherit;
}

a {
  color: inherit;
}
.modal {
  flex-basis: calc(33.33% - 20px); /* 计算每个卡片的宽度，减去 margin */
  margin-bottom: 100px; /* 设置卡片之间的垂直间距 */

}

.modal-container {
  transition: 1s all;
  max-height: 500px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.25);
  margin: 0 20px;
  flex: 1;
}
.modal-container:hover {
  flex: 3;
}
@media (max-width: 600px) {
  .modal-container {
    width: 90%;
  }
}

.modal-container-header {
  padding: 16px 32px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-container-title {
  display: block;

  gap: 8px;

  font-weight: 700;
  font-size: 1.125;

  overflow: hidden;
  white-space: nowrap; /* 防止换行 */
  text-overflow: ellipsis; /* 文字溢出显示省略号 */
  flex: 5;
}
/* 文章分类 */
.modal-container-header .Ctag {
  display: flex;
  align-items: center;
  /* width: 32px; */
  height: 32px;
  color: #750550;
  flex: 1;
}
.userImg {

  flex: 3;
  display: flex;
  justify-content: flex-end;
  
}
.userImg img{
width: 30%;
height: 30%;
border-radius: 100%;
}
.modal-container-body {
  /* overflow: hidden; */
  padding-left: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-right: 25px;
  overflow-y: hidden;
  transition: 1s;
  /* padding-right: 15px; */
}
.modal-container:hover .modal-container-body {
  /* overflow: hidden; */
  padding-right: -20px;
  /* overflow-y: auto; */
  transition: 0.3s;
}

/* 自定义滚动条样式 */
.modal-container-body::-webkit-scrollbar {
  width: 5px; /* 滚动条宽度 */
}

.modal-container-body::-webkit-scrollbar-track {
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

.rtf h1,
.rtf h2,
.rtf h3,
.rtf h4,
.rtf h5,
.rtf h6 {
  font-weight: 700;
}

.rtf h1 {
  font-size: 1.5rem;
  line-height: 1.125;
}

.rtf h2 {
  font-size: 1.25rem;
  line-height: 1.25;
}

.rtf h3 {
  font-size: 1rem;
  line-height: 1.5;
}

.rtf > * + * {
  margin-top: 1em;
}

.rtf > * + :is(h1, h2, h3) {
  margin-top: 2em;
}

.rtf > :is(h1, h2, h3) + * {
  margin-top: 0.75em;
}

.rtf ul,
.rtf ol {
  margin-left: 20px;
  list-style-position: inside;
}

.rtf ol {
  list-style: numeric;
}

.rtf ul {
  list-style: disc;
}

.modal-container-footer {
  padding: 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  gap: 12px;
  position: relative;
  transition: all 0.3s ease-in-out;
}

/* 悬浮按钮 */
.modal-container:hover button {
  opacity: 1;
  height: auto;
  width: auto;
}
.modal-container:hover .modal-container-footer {
  padding: 20px 32px;
  transition: all 0.3s ease-in-out;
}
.modal-container button {
  opacity: 0;
  height: 0;
  width: 0;
}
.modal-container-footer:after {
  content: "";
  display: block;
  position: absolute;
  top: -51px;
  left: 24px;
  right: 24px;
  height: 50px;
  flex-shrink: 0;
  background-image: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.75),
    transparent
  );
  pointer-events: none;
}

.button {
  padding: 12px 20px;
  border-radius: 8px;
  background-color: transparent;
  border: 0;
  font-weight: 600;
  cursor: pointer;
  transition: 0.15s ease;
}
.is-ghost {
  flex: 1;
  font-size: 1rem;
  color: #141414a1;
}
.button.is-ghost:hover,
.button.is-ghost:focus {
  background-color: #dfdad7;
}

.button.is-primary {
  background-color: #750550;
  color: #fff;
  flex: 2;
}

.button.is-primary:hover,
.button.is-primary:focus {
  background-color: #4a0433;
}

.icon-button {
  padding: 0;
  border: 0;
  background-color: transparent;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.15s ease;
}

.icon-button svg {
  width: 24px;
  height: 24px;
}

.icon-button:hover,
.icon-button:focus {
  background-color: #dfdad7;
}

</style>