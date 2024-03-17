<template>
  <div class="loginBox">
    <div class="wrapper">
      <div class="card-switch">
        <label class="switch">
          <input
            type="checkbox"
            class="toggle"
            v-model="isLogin"
            @change="toggleCard"
          />
          <span class="slider"></span>
          <span class="card-side"></span>
          <div class="flip-card__inner">
            <div class="flip-card__front">
              <div class="title">登 录</div>
              <div class="flip-card__form" action="">
                <input
                  class="flip-card__input"
                  name="email"
                  v-model="loginInfo.email"
                  placeholder="Email"
                  @keyup.enter="userLogin"
                />
                <input
                  class="flip-card__input"
                  name="password"
                  v-model="loginInfo.password"
                  placeholder="Password"
                  type="password"
                  @keyup.enter="userLogin"
                />
                <button
                  class="flip-card__btn"
                  @keyup.enter="userLogin"
                  @click="userLogin()"
                >
                  上~ 号!
                </button>
              </div>
            </div>
            <div class="flip-card__back">
              <div class="title">注 册</div>
              <div class="flip-card__form">
                <input
                  class="flip-card__input"
                  placeholder="Name"
                  type="name"
                  v-model="Userinfo.username"
                  @keyup.enter="UserRegister"
                />
                <input
                  class="flip-card__input"
                  name="email"
                  placeholder="Email"
                  v-model="Userinfo.email"
                  @keyup.enter="UserRegister"
                />
                <input
                  class="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  v-model="Userinfo.password"
                  @keyup.enter="UserRegister"
                />
                <button
                  class="flip-card__btn"
                  @keyup.enter="UserRegister"
                  @click="UserRegister"
                >
                  确认!
                </button>
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>

  </div>
</template>

<script>
import { login, Register } from "@/request/api/login";

export default {
  name: "login",
components:{
  
},
  data() {
    return {
      isLogin: false,
      loginInfo: {
        userId: 0,
        username: "",
        password: "",
        imgUrl: "",
        email: "",
      },
      Userinfo: {
        email: null,
        password: null,
        username: null,
      },
    };
  },

  mounted() {},

  methods: {
    // 用户登录
    userLogin() {
      // console.log(this.loginInfo);
      login(this.loginInfo)
        .then((res) => {
          console.log(res.data);
          if (res.data == "error") {
            return this.$message.error("用户名或密码错误");
          } else {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.loginInfo = {
              userId: 0,
              username: null,
              password: null,
              imgUrl: null,
              email: null,
            };
            this.$router.push("/");
          }
        })
        .catch((res) => {
          this.$message.error('系统异常！')
        });
    },
    UserRegister() {
      if (this.Userinfo.username == null || this.Userinfo.username == "") {
        return this.$message.warning("输入用户名哦~");
      } else if (this.Userinfo.email == null || this.Userinfo.email == "") {
        return this.$message.warning("输入邮箱哦~");
      } else if (
        this.Userinfo.password == null ||
        this.Userinfo.password == ""
      ) {
        return this.$message.warning("没有密码怎么登录~");
      }
      Register(this.Userinfo).then((res) => {
        if (res.data == "1") {
          return this.$message.warning("别人已经用了这个名字，你想一个~");
        }
        if (res.data == "2") {
          return this.$message.warning("这个邮箱注册过了~");
        }

        this.$message.success(
          "注册成功！欢迎您“" + res.data.username + "”请登录吧~"
        );
        this.Userinfo = {
          email: null,
          password: null,
          username: null,
        };
        this.toggleCard();
      });
    },

    toggleCard() {
      this.isLogin = !this.isLogin;
    },
  },
};
</script>

<style  scoped>
.loginBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
.wrapper {
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --bg-color-alt: #666;
  --main-color: #323232;
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
}
/* switch card */
.switch {
  transform: translateY(-200px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 50px;
  height: 20px;
}

.card-side::before {
  position: absolute;
  content: "登 录";
  left: -70px;
  top: 0;
  width: 100px;
  text-decoration: underline;
  color: var(--font-color);
  font-weight: 600;
}

.card-side::after {
  position: absolute;
  content: "注 册";
  left: 70px;
  top: 0;
  width: 100px;
  text-decoration: none;
  color: var(--font-color);
  font-weight: 600;
}

.toggle {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-colorcolor);
  transition: 0.3s;
}

.slider:before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  border: 2px solid var(--main-color);
  border-radius: 5px;
  left: -2px;
  bottom: 2px;
  background-color: var(--bg-color);
  box-shadow: 0 3px 0 var(--main-color);
  transition: 0.3s;
}

.toggle:checked + .slider {
  background-color: var(--input-focus);
}

.toggle:checked + .slider:before {
  transform: translateX(30px);
}

.toggle:checked ~ .card-side:before {
  text-decoration: none;
}

.toggle:checked ~ .card-side:after {
  text-decoration: underline;
}

/* card */

.flip-card__inner {
  width: 300px;
  height: 350px;
  position: relative;
  background-color: transparent;
  perspective: 1000px;
  /* width: 100%;
    height: 100%; */
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.toggle:checked ~ .flip-card__inner {
  transform: rotateY(180deg);
}

.toggle:checked ~ .flip-card__front {
  box-shadow: none;
}

.flip-card__front,
.flip-card__back {
  padding: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: lightgrey;
  gap: 20px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
}

.flip-card__back {
  width: 100%;
  transform: rotateY(180deg);
}

.flip-card__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.title {
  margin: 20px 0 20px 0;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  color: var(--main-color);
}

.flip-card__input {
  width: 250px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
}

.flip-card__input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.flip-card__input:focus {
  border: 2px solid var(--input-focus);
}

.flip-card__btn:active,
.button-confirm:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
}

.flip-card__btn {
  margin: 20px 0 20px 0;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
}
</style>