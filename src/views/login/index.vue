<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             label-width="0px" 
             class="card-box login-form">
      <h3 class="title">Ahui's Blog</h3>
      <el-form-item prop="userId">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input v-model="loginForm.userId" autoComplete="on"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on"></el-input>
      </el-form-item>
      <el-form-item prop="vertifyCode">
        <el-input 
        v-model="loginForm.vertifyCode" 
        placeholder="请输入验证码"
        style="width: 223px"
        >
        </el-input>
        <span style="padding: 13px 13px;border-radius: 3px; background-color: #FFF;cursor:pointer" v-show="isShow" @click="countDown()">获取验证码</span>
        <span style="padding: 13px 35px;border-radius: 3px; background-color: #FFF;cursor:pointer" v-show="!isShow">{{ count }}s</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {Message} from 'element-ui'
export default {
  name: 'login',
  data() {
    return {
      isShow: true,
      count: '',
      timer: null,
      loginForm: {
        userId: 'admin',
        password: '123456',
        vertifyCode: ''
      },
      loginRules: {
        userId: [{required: true, trigger: 'blur', message: "请输入用户名"}],
        password: [{required: true, trigger: 'blur', message: "请输入密码"}],
        // vertifyCode: [{required: true, trigger: 'blur', message: "请输入验证码"}]
      },
      loading: false
    }
  },
  methods: {
    //点击按钮后倒计时显示
    countDown(){
      const TIME_COUNT = 120;
      this.createVertifyCode();
      if(!this.timer){
        this.count = TIME_COUNT;
        this.isShow = false;
        this.timer = setInterval( () => {
          if(this.count > 0 && this.count <= TIME_COUNT){
            this.count--;
            this.count = this.count < 10 ? "0" + this.count : this.count;
          }else {
            this.isShow = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        } , 1000);
      } 
    },
    //发送验证码请求
    createVertifyCode(){
      this.api({
        url: "/login/generateVertifyCode",
        method: "GET"
      }).then(res => {
        Message({
        message: res.msg,
        type: 'success',
        duration: 3000,
      });
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(data => {
            this.loading = false
            this.$router.push({path: '/'})
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "../../styles/mixin.scss";

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: rgb(88, 85, 85);

.login-container {
  @include relative;
  height: 100vh;
  // background-color: $bg;
  background-image: url('../../assets/background.jpg');
  background-position:center;

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }

  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: rgb(255, 255, 255);
    height: 47px;
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;

    &_login {
      font-size: 20px;
    }
  }

  .title {
    font-size: 26px;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
  }

  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
