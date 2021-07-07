<template>
  <div id="loginBox" @click="closeBox">
    <div class="main" @click.stop>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户登录" name="login">
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            label-width="70px"
          >
            <el-form-item label="用户名" prop="user">
              <el-input v-model="loginForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="loginForm.pass"
              ></el-input>
            </el-form-item>
            <el-button type="primary" @click="loginSubmit">登录</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册账号" name="register">
          <el-form
            :model="regForm"
            :rules="rules"
            ref="regForm"
            label-width="70px"
          >
            <el-form-item label="用户名" prop="user">
              <el-input v-model="regForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="regForm.pass"
              ></el-input> </el-form-item
            ><el-form-item label="确认密码" prop="pass2">
              <el-input type="password" v-model="regForm.pass2"></el-input>
            </el-form-item>
            <el-button type="primary" @click="regSubmit">立即注册</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations} from 'vuex'

export default {
  name: "LoginBox",
  emits: ["closeBox"],
  data() {
    return {
      activeName: "login",
      regForm: {
        user: "",
        pass: "",
        pass2: "",
      },
      loginForm: {
        user: "",
        pass: ""
      },
      rules: {
        // 验证用户名
        user: [
          {
            validator(rule, value, callback) {
              let reg = /^[^\s]{2,8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("2-8位非空格字符"));
              }
            },
            trigger: "blur",
          },
        ],
        pass: [
          {
            validator(rule, value, callback) {
              let reg = /^[\w,.?;<>/|\\:'"!@#$%^&*()+_-]{6,16}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("6-16位字符"));
              }
            },
            trigger: "blur",
          },
        ],
        pass2: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("密码不能为空"));
              } else if (value !== this.regForm.pass) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // vuex
    ...mapMutations(['updateUserInfo']),
    // 注册按钮点击事件
    regSubmit() {
      this.$refs.regForm.validate(async (valid) => {
        if (valid) {
          /* 将数据发送到后端 */
          let response = await this.$axios({
            method: "post",
            url: "/reg",
            data: {
              user: this.regForm.user,
              pass: this.regForm.pass,
            },
          });

          // 没有注册成功
          if (response.data.code) {
            return this.$message.error(response.data.msg);
          }

          // 注册成功
          this.$message.success({
            type: "success",
            message: "注册成功",
            duration: 1000,
          });
          // 切换到登录选项卡
          this.activeName = "login";
          // 清空注册表单的内容
          this.$refs.regForm.resetFields();
        } else {
          return false;
        }
      });
    },
    // 登录按钮点击
    loginSubmit(){
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          // 发送数据给后端
          let response = await this.$axios({
            method: "post",
            url: "/login",
            data: this.loginForm
          })
          // 没有登录成功
          if (response.data.code) {
            return this.$message.error(response.data.msg);
          }

          // 登录成功
          this.$message.success({
            type: "success",
            message: "登录成功",
            duration: 1000,
          })
          // 修改父组件的数据，关闭弹窗
          this.closeBox()
          // 修改vuex的数据
          this.updateUserInfo(response.data.data)
        } else {
          return false;
        }
      });
    },
    // 点击回车键登录
    keyDown(e){
      if(e.keyCode === 13 && !this.userInfo._id){
        this.loginSubmit()
      }
    },
    // 关闭弹窗
    closeBox(){
      this.$emit("closeBox")
    }
  },
  mounted() {
    // 绑定监听事件
    window.addEventListener("keydown", this.keyDown)
  },
  unmounted() {
    // 销毁事件
    window.removeEventListener("keydown", this.keyDown, false)
  }
};
</script>

<style lang="less" scoped>
#loginBox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    padding: 10px 30px;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
}
</style>