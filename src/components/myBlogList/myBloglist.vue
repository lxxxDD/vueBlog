<template>
  <div class="main-container">
    <!-- 左侧菜单栏 -->
    <div class="left-menu">
      <!-- 左侧菜单栏内容 -->
      <ul v-if="localArticles.length>0">
        <li @click="loadArticle(item)" v-for="item,index in localArticles" :key="index">{{ item.title }}</li>
      </ul>
   <div v-else class="addItem">
<button type="button" class="button" @click="addShow=true">
  <span class="button__text" >新 建 文 章</span>
  <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
</button>
   </div>
    </div>

    <!-- 右侧内容区域 -->
    <div class="right-content" v-if="localArticles.length>0">
      <!-- 右侧内容区域头部 -->
      <div class="header">
        <!-- 标题 -->
        <h1>标题</h1> <el-input v-model="title" placeholder="请输入标签"></el-input>
        <!-- 分类选择 -->
        <el-select v-model="category" placeholder="请选择分类">
          <el-option label="分类1" value="category1"></el-option>
          <el-option label="分类2" value="category2"></el-option>
          <!-- 其他分类选项 -->
        </el-select>
        <!-- 标签输入框 -->
        <el-input v-model="tag" placeholder="请输入标签"></el-input>
        <!-- 标签组件 -->
        <el-tag v-for="tag in tags" :key="tag" closable @close="handleTagClose(tag)">
          {{ tag }}
        </el-tag>
      </div>

      <!-- 右侧内容区域主体 -->
      <div class="content">
        <el-input v-model="content"></el-input>
        <!-- 富文本编辑器组件 -->
        <!-- 这里应该引入一个富文本编辑器组件，例如 vue-quill-editor -->
      </div>

      <!-- 右侧内容区域底部 -->
      <div class="footer">
        <!-- 保存和发布按钮 -->
        <el-button type="primary" @click="saveToLocal">保存</el-button>
        <el-button type="success" @click="publish">发布</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="addShow" width="50%" center>
      <div>
        <div class="titleInput">
    <span>标题</span>
    <el-input v-model="title"></el-input>
  </div>
  <div class="CInput">
    <span class="flex-container">分类</span>
    <el-select v-model="category" placeholder="请选择分类">
      <el-option label="科技" :value="1"></el-option>
      <el-option label="生活" :value="2"></el-option>
      <el-option label="旅游" :value="3"></el-option>
      <el-option label="健康" :value="4"></el-option>
      <el-option label="娱乐" :value="5"></el-option>
      <el-option label="教育" :value="6"></el-option>
      <el-option label="美食" :value="7"></el-option>
      <el-option label="体育" :value="8"></el-option>
    </el-select>
  </div>
  <div class="diaAddBtn"><el-button type="success" @click="diaAddBtn">新建</el-button>
  <el-button type="info">取消</el-button></div>
  
      </div>

  
</el-dialog>

  </div>
</template>

<script>
export default {
  name: 'myBlogList',

  data() {
    return {
      addShow:false,
      localArticles: [], // 本地存储的文章列表
      title: '', // 文章标题
      category: '', // 文章分类
      tag: '', // 文章标签
      tags: [], // 存储标签的数组
      content: '', // 文章内容
      userId: null // 用户ID
    };
  },
mounted(){

  // 加载本地存储的文章列表
  this.loadLocalArticles();
    // 获取本地存储的用户信息
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      this.userId = userInfo.userId;
    }
},
  methods: {

    // 从本地存储中加载文章列表
    loadLocalArticles() {
      const localArticles = JSON.parse(localStorage.getItem('articles')) || [];
      this.localArticles = localArticles;
    },
// 加载文章
loadArticle(article) {
      this.title = article.title;
      this.category = article.category;
      this.tags = article.tags;
      this.content = article.content;
    },
    // 新建文章
    createNewArticle() {
      // 实现新建文章的逻辑
    },
    
     // 保存到本地
     saveToLocal() {
      const newArticle = {
        id: Date.now(), // 用当前时间作为文章的唯一标识
        title: this.title,
        category: this.category,
        tags: this.tags,
        content: this.content
      };
      this.localArticles.push(newArticle);
      localStorage.setItem('articles', JSON.stringify(this.localArticles));
    },
    diaAddBtn(){
this.saveToLocal()
    },
    // 发布文章
    publish() {
      // 实现发布文章的逻辑
    },
    
    // 处理标签关闭事件
    handleTagClose(tag) {
      const index = this.tags.indexOf(tag);
      if (index !== -1) {
        this.tags.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.left-menu {
  flex: 0 0 250px;
  background-color: #f0f2f5;
  border-right: 1px solid #e4e7ed;
}

.right-content {
  flex: 1;
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.content {
  margin-bottom: 20px;
}

.footer {
  display: flex;
  justify-content: flex-end;
}
.addItem{
  height: 100%;
  display: flex;
  
  justify-content: center;
  align-items: center;
  width: 100%;
}

.diaAddBtn{
  width: 100%;
  display: flex;
  justify-content: flex-end;
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

.button, .button__icon, .button__text {
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
</style>
