<template>
  <div id="user">
    <article>
      <h2>修改用户资料</h2>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="修改昵称" name="first">
          <el-form
            :model="userForm"
            :rules="rules"
            ref="userForm"
            label-width="110px"
          >
            <el-form-item label="原用户名:">
              {{ userInfo.user }}
            </el-form-item>
            <el-form-item label="新用户名:" prop="user">
              <el-input v-model="userForm.user"></el-input>
            </el-form-item>
            <el-button type="primary" @click="userNameUpdate"
              >确认修改</el-button
            >
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <el-form
            :model="passForm"
            :rules="rules"
            ref="passForm"
            label-width="100px"
          >
            <el-form-item label="原密码">
              <el-input type="password" v-model="passForm.oldPass"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="passForm.pass"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="pass2">
              <el-input type="password" v-model="passForm.pass2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="passUpdate">确认修改</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改头像" name="third">
          <el-alert title="点击 + 选择图片自动上传修改头像" type="warning">
          </el-alert>
          <el-upload
            class="avatar-uploader"
            :action="baseURL+'/user/avatar'"
            :show-file-list="false"
            :with-credentials="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
    </article>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "User",
  data() {
    return {
      activeName: "first",
      userForm: {
        user: "",
      },
      passForm: {
        oldPass: "",
        pass: "",
        pass2: "",
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
            validator:(rule, value, callback) =>{
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
              } else if (value !== this.passForm.pass) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      imageUrl: "",
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapMutations(["updateUserName", "updateUserInfo"]),
    userNameUpdate() {
      this.$refs.userForm.validate(async (v) => {
        if (v) {
          let response = await this.$axios({
            method: "post",
            url: "/user/name",
            data: {
              user: this.userForm.user,
            },
          });
          if (response.data.code) {
            return this.$message.error(response.data.msg);
          }
          this.$message.success(response.data.msg);
          this.updateUserName(this.userForm.user);
          this.userForm.user = "";
        } else {
          return false;
        }
      });
    },
    //修改密码
     async passUpdate() {
      this.$refs.passForm.validate(async v => {
        if (v) {
          let {data} = await this.$axios({
            method: "POST",
            url: "/user/pass",
            data: {
              oldPass: this.passForm.oldPass,
              pass: this.passForm.pass
            }
          })

          if (data.code) {
            return this.$message.error(data.msg)
          }

          //提示，清除vuex，返回首页
          this.$message.success(data.msg)
          this.updateUserInfo({})
          this.$router.replace("/")

        } else {
          console.log("验证不通过");
          // return false
        }
      })
    },
    // 上传通过
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 提示用户
      if(res.code){
        return this.$message.error(res.msg)
      }
      this.$message.success("头像修改成功")
      // 更新vuex数据
      this.updateUserInfo(res.data)
    },
    // 上传之前
    beforeAvatarUpload(file) {
      let fileType = file.type;
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isJPG = /^image\/((jpeg)|(png))$/.test(fileType);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG,PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    if (!this.userInfo.user) {
      this.$router.replace("/");
    }
  },
};
</script>

<style lang="less" scoped>
#user {
  flex: 1;
  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand", "Microsoft YaHei", sans-serif;
    h2 {
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
    }
  }
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
  }
  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  /deep/ .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>