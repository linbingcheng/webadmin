<template>
  <div class="login">
    <div class="aside">
      <div class="login-area">
        <div class="login-type">
          <div class="f-fl">
            管理员登陆
          </div>
          <div class="f-fr">
            Language：{{language}}
            <el-dropdown>
                <span class="el-dropdown-link" style="color: #fff;">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>简体中文</el-dropdown-item>
                <el-dropdown-item>English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="content-wrapper">
          <span class="arrow"></span>
          <div class="login-form">
            <el-form  class="form-area" :model="form" :rules="rules" ref="form">
              <div class="input-area">
                <el-input
                  placeholder="用户名"
                  v-model="form.userName"
                  prefix-icon="fa fa-user fa-lg"  class="login-input">
                </el-input>
                <el-input
                  type="password"
                  placeholder="密码"
                  v-model="form.password"
                  prefix-icon="fa fa-key fa-lg" class="login-input">
                </el-input>
                <div class="login-input">
                  <div class="f-fl">
                    <el-checkbox>记住用户名</el-checkbox>
                  </div>
                  <div class="f-fr">
                    <a class="retrieve-password">找回密码</a>
                  </div>
                </div>
                <div class="login-input">
                  <el-button type="primary" @click="login('form')">登录</el-button>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'Login',
  data() {
    return {
      language: '简体中文',
      form: {
        userName: '',
        password: '',
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    login(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // TODO 登录校验后端校验
          Cookies.set('user', this.$data.form.userName);
          return true;
        }
        return false;
      });
      this.$router.push({
        name: 'home',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .login{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/login.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    .aside {
      position: absolute;
      top: 0;
      right: 0;
      width: 36%;
      bottom: 0;
      transition: width 0.3s ease-out;
      z-index: 1;
      overflow: hidden;
      min-width: 300px;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255,255,255,0.3);
        margin: -30px;
        z-index: -1;
        -webkit-filter: blur(20px);
        -moz-filter: blur(20px);
        -ms-filter: blur(20px);
        -o-filter: blur(20px);
        filter: blur(20px);
      }
      .login-area {
        position: absolute;
        top: 33%;
        left: 23%;
        width: 54%;
        min-width: 250px;
        font-size: 14px;
        text-decoration: none;
        .f-fl{
          float: left;
        }
        .f-fr{
          float: right;
        }
        .login-type {
          display: table;
          width: 100%;
          line-height: 40px;
          margin-bottom: 8px;
          color: #fff;
          font-weight: bold;
        }
        .content-wrapper{
          position: relative;
          .arrow {
            position: absolute;
            left: 21px;
            top: -7px;
            border-right: 7px solid transparent;
            border-left: 7px solid transparent;
            border-bottom: 7px solid #fff;
            display: inline-block;
            transition: left 0.5s ease;
          }
          .login-form{
            .form-area{
              position: relative;
              width: 100%;
              z-index: 98;
              .input-area {
                padding: 20px 20px;
                border-radius: 5px;
                background-color: #fff;
                .login-input{
                  position: relative;
                  font-size: 14px;
                  display: inline-block;
                  margin: 10px 0;
                  width: 100%;
                  .el-button{
                    width: 100%;
                  }
                }
              }
              .retrieve-password {
                display: inline-block;
                line-height: 19px;
                font-size: 14px;
                color: #606266;
                cursor: pointer;
                text-decoration:underline;
              }
            }
          }
        }
      }
    }
  }
</style>
