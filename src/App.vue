<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
*{
margin: 0;
padding: 0;
box-sizing: border-box; 
}
body{
  overflow-x: hidden;
}

/* 自定义滚动条样式 */
body::-webkit-scrollbar {
  width: 5px; /* 滚动条宽度 */
}

body::-webkit-scrollbar-track {
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
body::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5); /* 滚动条手柄颜色 */
  border-radius: 5px; /* 滚动条手柄圆角 */
}
</style>

