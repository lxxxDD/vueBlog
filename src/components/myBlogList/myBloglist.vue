<template>
    <div class="main-container">
      <!-- 左侧菜单栏 -->
      <div class="left-menu">
        <div class="itemAdd">
          <el-button
            style="width: 90%; height: 50px"
            @click="
              addShow = true;
              isBOxShow = false;
            "
            v-if="localArticles.length > 0"
            >添加新文章</el-button
          >
        </div>
        <!-- 左侧菜单栏内容 -->
        <ul v-if="localArticles.length > 0" class="left-menu-ul">
          <li
            class="left-menu-ulItem"
            @click="loadArticle(item)"
            v-for="(item, index) in localArticles"
            :key="index"
          >
            <span style="flex: 3; overflow: hidden"> {{ item.Savetitle }}</span>
            <span style="flex: 2;display: flex; justify-content: center; align-items: center;"  >
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <el-button type="text">...</el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button
                      icon="el-icon-delete"
                      type="danger"
                      @click="deleteArticle(item.listId)"
                      >删除</el-button
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </li>
        </ul>
        <div v-else class="addItem">
          <button type="button" class="button" @click="addShow = true">
            <span class="button__text">新建文章</span>
            <span class="button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="currentColor"
                height="24"
                fill="none"
                class="svg"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
        </div>
      </div>
  
      <!-- 右侧内容区域 -->
      <div class="right-content" v-if="isBOxShow">
        <!-- 右侧内容区域头部 -->
        <div class="header">
          <!-- 标题 -->
          <div class="textItem">
            <span>标题</span>
            <el-input v-model="title" placeholder="请输入标题"></el-input>
          </div>
          <div class="textItem">
            <span>分类</span>
            <!-- 分类选择 -->
            <el-select v-model="category" placeholder="请选择分类">
              <el-option label="科技" value="1"></el-option>
              <el-option label="生活" value="2"></el-option>
              <el-option label="旅游" value="3"></el-option>
              <el-option label="健康" value="4"></el-option>
              <el-option label="娱乐" value="5"></el-option>
              <el-option label="教育" value="6"></el-option>
              <el-option label="美食" value="7"></el-option>
              <el-option label="体育" value="8"></el-option>
              <!-- 其他分类选项 -->
            </el-select>
          </div>
          <!-- 标签组件 -->
          <el-tag
            v-for="tag in tags"
            :key="tag"
            closable
            @close="handleTagClose(tag)"
          >
            {{ tag }}
          </el-tag>
        </div>
  
        <!-- 右侧内容区域主体 -->
        <div class="content">
          <!-- 富文本编辑器组件 -->
          <vue-editor
            v-model="content"
            :editorOptions="editorOptions"
            style="width: 100%; height: 100%;"
          ></vue-editor>
          <!-- 富文本编辑器组件 -->
          <!-- 这里应该引入一个富文本编辑器组件，例如 vue-quill-editor -->
        </div>
  
        <!-- 右侧内容区域底部 -->
        <div class="footer">
          <!-- 保存和发布按钮 -->
          <el-button type="primary" @click="updateSavedArticle">保存</el-button>
          <el-button type="success" @click="publish">发布</el-button>
        </div>
      </div>
      <div class="logo" v-else>
        <span class="t1">Dream </span>
        <span class="t2">Blog </span>
      </div>
      <!-- 添加文章对话框 -->
      <el-dialog :visible.sync="addShow" width="50%" center>
        <div>
          <div class="titleInput">
            <span>新建文章名称</span>
            <el-input v-model="Savetitle"></el-input>
          </div>
          <div class="diaAddBtn">
            <el-button type="success" @click="diaAddBtn">新建</el-button>
            <el-button type="info" @click="addShow = false">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { v4 as uuidv4 } from "uuid"; // 导入UUID生成器
  import { VueEditor } from "vue2-editor";
  import { PostBlogPost } from "@/request/api/home";
  export default {
    name: "myBlogList",
    components: {
      VueEditor,
    },
    data() {
      return {
        addShow: false,
        title: "", // 文章标题
        Savetitle: "", // 文章标题
        category: "", // 文章分类
        tag: "", // 文章标签
        tags: [], // 存储标签的数组
        content: "", // 文章内容
        userId: null, // 用户ID
        localArticles: [], // 存储已保存的文章数组
        isBOxShow: false,
        editorOptions: {
  
         
         
        },
      };
    },
    mounted() {
      this.isBOxShow = false;
      // 获取本地存储的用户信息
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        this.userId = userInfo.userId;
        // 加载本地存储的文章列表
        this.loadLocalArticles();
      }
    },
    methods: {
      // 从本地存储中加载文章列表
      loadLocalArticles() {
        const userId = this.userId; // 当前用户ID
        const localArticles = JSON.parse(localStorage.getItem("articles")) || [];
        this.localArticles = localArticles.filter(
          (article) => article.userId === userId
        );
      },
  
      // 加载文章
      loadArticle(article) {
        this.isBOxShow = false;
        this.Savetitle = article.Savetitle;
        this.title = article.title;
        this.category = article.category;
        this.tags = article.tags;
        this.content = article.content;
        setTimeout(() => {
          this.isBOxShow = true;
        }, 1000);
      },
  
      // 更新保存的文章
      updateSavedArticle() {
        console.log(this.content);
        // 检查是否存在相同标题的文章
        const existingArticleIndex = this.localArticles.findIndex(
          (article) =>
            article.userId === this.userId && article.Savetitle === this.Savetitle
        );
  
        // 如果存在相同标题的文章，则更新它
        if (existingArticleIndex !== -1) {
          const existingArticle = this.localArticles[existingArticleIndex];
          existingArticle.category = this.category;
          // 同步更新后的内容到界面
          existingArticle.title = this.title;
          existingArticle.tags = this.tags;
          existingArticle.content = this.content;
          existingArticle.time = Date.now(); // 更新保存时间
          console.log(existingArticle);
          // 将数据保存到本地存储
          localStorage.setItem("articles", JSON.stringify(this.localArticles));
  
          // 提示更新成功
          console.log("文章更新成功");
        } else {
          // 提示找不到对应文章
          console.log("找不到对应文章，无法更新");
        }
      },
  
      // 保存到本地
      // 保存到本地
      saveToLocal() {
        // 检查是否存在相同标题的文章
        const existingArticleIndex = this.localArticles.findIndex(
          (article) =>
            article.userId === this.userId && article.Savetitle === this.Savetitle
        );
  
        // 如果已存在相同标题的文章，则提示文章标题已存在，请使用其他标题
        if (existingArticleIndex !== -1) {
          this.$message.warning("文章标题已存在，请使用其他标题");
          console.log("文章标题已存在，请使用其他标题");
          return;
        }
        // 清空表单数据
        this.clearFormData();
        // 否则，创建新的文章对象并添加到已保存的文章数组中
        const listId = uuidv4();
        const newArticle = {
          userId: this.userId,
          listId: listId,
          title: this.title,
          category: this.category,
          tags: this.tags,
          content: this.content,
          saveName: this.saveName,
          Savetitle: this.Savetitle,
          time: Date.now(),
        };
  
        this.localArticles.push(newArticle);
  
        // 将数据保存到本地存储
        localStorage.setItem("articles", JSON.stringify(this.localArticles));
        this.Savetitle = "";
  
        // 提示文章保存成功
        console.log("文章保存成功");
        this.$message.success("文章创建成功");
      },
  
      // 清空表单数据
      clearFormData() {
        this.title = "";
        this.category = "";
        this.tag = "";
        this.tags = [];
        this.content = "";
      },
      // 在用户界面选择要删除的文章后调用该方法
      deleteArticle(articleId) {
        // 查找要删除的文章在本地存储中的索引
        const articleIndex = this.localArticles.findIndex(
          (article) => article.listId === articleId
        );
  
        // 如果找到了要删除的文章
        if (articleIndex !== -1) {
          // 从本地存储中移除该文章
          this.localArticles.splice(articleIndex, 1);
  
          // 更新本地存储中的文章数据
          localStorage.setItem("articles", JSON.stringify(this.localArticles));
  
          // 在界面上刷新文章列表等操作
          // ...
        }
      },
      // 发布文章
      publish() {
        // 实现发布文章的逻辑
        if (this.title == "") {
          return this.$message.warning("请输入标题");
        }
        if (this.category == "") {
          return this.$message.warning("请选择分类");
        }
        if (this.content == "") {
          return this.$message.warning("请输入内容");
        }
        PostBlogPost({
          postId: 0,
          title: this.title,
          tags: this.tag,
          categoryId: this.category,
          content: this.content,
          userId: this.userId,
          likes: 0,
          views: 0,
        
        })
          .then((res) => {
            console.log(res);
            if (res.status == 201) {
              this.$message.success("已发布");
              this.isBOxShow = false;
            }
          })
          .catch(() => {});
      },
  
      // 处理标签关闭事件
      handleTagClose(tag) {
        const index = this.tags.indexOf(tag);
        if (index !== -1) {
          this.tags.splice(index, 1);
        }
      },
  
      // 点击新建按钮
      diaAddBtn() {
        this.addShow=false
        // 保存到本地
        this.saveToLocal();
      },
    },
  };
  </script>
  
  
  
  <style scoped>
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .t1 {
    font-size: 5vw;
    font-family: var(--drfont);
    margin-left: 15px;
    color: var(--卡片字体);
  }
  .t2 {
    font-size: 5vw;
    font-family: var(--drfont);
    margin-left: 15px;
    color: var(--卡片字体);
  }
  .main-container {
    display: flex;
    width: 100%;
    height: 100vh;
  }
  
  .left-menu {
    flex: 0 0 250px;
    background-color: #f0f2f5;
    border-right: 1px solid #e4e7ed;
    height: 100%;
  }
  .left-menu-ul {
    width: 100%;
    overflow-y: auto;
    height: 80%;
  }
  .left-menu-ulItem {
    white-space: nowrap;
    height: 60px;
    background-color: var(--bgColor);
    padding: 5px 10px;
    /* border: 1px solid #32323213; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--almm);
    cursor: pointer;
    user-select: none;
  }
  .left-menu-ulItem:hover {
    background-color: #8f8f8f6b;
  }
  .itemAdd {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
  }
  
  .right-content {
    flex: 1;
    padding: 20px;
  }
  
  .header {
    margin-bottom: 20px;
    padding: 30px;
  }
  .textItem {
    display: flex;
    align-items: center;
    margin-top: 50px;
  }
  .textItem span {
    flex: 1;
    /* padding-left: 50px; */
  }
  .textItem .el-input {
    flex: 10;
  }
  .textItem .el-select {
    flex: 10;
  }
  .content {
    margin-bottom: 20px;
    padding: 0px 30px
     ;
  }
  
  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 30px;
  }
  .addItem {
    height: 100%;
    display: flex;
  
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .diaAddBtn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .flex-container {
    display: flex;
    align-items: center; /* 垂直居中 */
  }
  
  .flex-container span {
    margin-right: 10px; /* 调整 span 和 el-select 之间的间距 */
  }
  
  .button {
    --main-focus: #2d8cf0;
    --font-color: #dedede;
    --bg-color-sub: #222;
    --bg-color: #323232;
    --main-color: #dedede;
    position: relative;
    width: 150px;
    height: 80px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    background-color: var(--bg-color);
    border-radius: 10px;
    overflow: hidden;
  }
  
  .button,
  .button__icon,
  .button__text {
    transition: all 0.3s;
  }
  
  .button .button__text {
    transform: translateX(25px);
    color: var(--font-color);
    font-weight: 600;
  }
  
  .button .button__icon {
    position: absolute;
    transform: translateX(109px);
    height: 100%;
    width: 39px;
    background-color: var(--bg-color-sub);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .button .svg {
    width: 20px;
    stroke: var(--main-color);
  }
  
  .button:hover {
    background: var(--bg-color);
  }
  
  .button:hover .button__text {
    color: transparent;
  }
  
  .button:hover .button__icon {
    width: 148px;
    transform: translateX(0);
  }
  
  .button:active {
    transform: translate(3px, 3px);
    box-shadow: 0px 0px var(--main-color);
  }
  
  /* 默认情况下隐藏滚动条 */
  .left-menu-ul::-webkit-scrollbar {
    width: 5px;
    display: none; /* 隐藏滚动条 */
  }
  
  /* 鼠标悬停在元素上时显示滚动条 */
  .left-menu-ul:hover::-webkit-scrollbar {
    display: block; /* 鼠标悬停时显示滚动条 */
    background-color: #06d6a0;
  }
  
  /* 滚动条滑块样式 */
  .left-menu-ul::-webkit-scrollbar-thumb {
    background-color: rgba(253, 253, 253, 0.975); /* 淡黑色背景 */
    border-radius: 5px; /* 滑块圆角 */
  }
  
  /* 滚动条滑块悬停样式 */
  .left-menu-ul::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5); /* 深黑色背景 */
  }
  
  .left-menu-ul::-webkit-scrollbar-track {
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
  
  .left-menu-ul-body::-webkit-scrollbar-thumb {
    background-color: rgb(0, 0, 0);
    border-radius: 5px;
  }
  </style>
  