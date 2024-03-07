<template>
  <div class="BOX">
    <!-- 左边 -->
    <div class="left">
      <!-- 头像 -->
      <div class="picture">
        <el-upload
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
          <img :src="$BASEURL +imageUrl" v-if="imageUrl"  style="aspect-ratio: 1/1; width: 100%;height: 100%;">
          <img  v-else  style="aspect-ratio: 1/1; width: 100%;height: 100%;">
        </el-upload>
      </div>
      <!-- 头像end -->
      <div class="userName">{{ userInfo.username }}</div>
    </div>
    <!-- 左边end -->
    <!-- 右边 -->
    <div class="right"></div>
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
        <el-button @click="finish"
          ><i class="el-icon-crop"></i>裁剪</el-button
        >
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
  </div>
</template>

<script>

import { VueCropper } from "vue-cropper";
import { uploadImgs, updateUrl } from "@/request/api/uploadImg";
export default {
  name: "userInfo",
  components: {
    VueCropper,
  },
  data() {
    return {
      userInfo: {},
      isShowDialog: false,
      imageUrl: "",
   
      previewImg: "", // 预览图片地址
      uploadImg: null, // 上传图片
      // 裁剪组件的基础配置option
      option: {
        img: "https://pic1.zhimg.com/80/v2-366c0aeae2b4050fa2fcbfc09c74aad4_720w.jpg", // 裁剪图片的地址
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
        username: "string",
        password: "string",
        imgUrl: "string",
        email: "string",
        createdAt: "2024-03-06T12:18:58.690Z",
        
      },
    };
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    getUserInfo() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(this.userInfo);
      this.imageUrl=this.userInfo.imgUrl
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
            this.putdata.userId=this.userInfo.userId
            this.putdata.imgUrl=res.data.msg
            console.log(this.putdata,11515);
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
        if(res.status==200){
        
        console.log(res.data,'更改图片路径成功');
        this.imageUrl=res.data.imgUrl

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
  },
};
</script>

<style scoped>
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
  border: 1px solid #555;
}
.imgBtn {
  display: flex;
  /* justify-content: space-between; */
  margin-top: 50px;
}
.BOX {
  width: 80%;
  background-color: wheat;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  padding: 50px;
}
.left {
  /* border: 1px solid #000; */
  height: 100%;
  width: 20%;
}
.right {
  /* border: 1px solid #e80000; */
  height: 100%;
  width: 80%;
}
.picture {
  /* 1/1 */
  aspect-ratio: 1/1;
  background-color: #d90505;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
}

.avatar-uploader {
background-color: #a5a5a5;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
 height: 100%;
 width: 100%;

  /* background-color: red; */
  /* opacity: 0; */
}

/* 名字 */
.userName {
  display: flex;
  font-size: 3rem;
  color: #555;
  justify-content: center;
  align-items: center;
  height: 20%;
}
</style>