<template>
<div id="userPhoto">
    <el-popover
    placement="bottom-end"
    trigger="hover"
    :width="160"
  >
    <template #reference>
      <div 
    class="img"
    :style="{
        backgroundImage: `url(${baseURL}${userInfo.photo})`
    }"
    :title="userInfo.user"
    ></div>
    </template>
    <!-- hover之后显示的内容 -->
    <div class="btn">
        <el-button type="primary" size="mini" @click="userUpdate">修改资料</el-button>
        <el-button class="second" type="danger" size="mini" @click="logout">退出登录</el-button>
    </div>
  </el-popover>
</div>    
</template>
<script>
import {mapState, mapMutations} from 'vuex'

export default {
    name: "UserPhoto",
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapMutations(['updateUserInfo']),
        // 退出登录按钮点击
        async logout(){
            await this.$axios({
                method: 'post',
                url: '/login/logout'
            })
            this.$message.success("退出登录完成")
            // 清除vuex数据
            this.updateUserInfo({})
            // 回到首页
            this.$router.replace('/')
        },

        // 修改资料按钮点击
        userUpdate(){
            this.$router.push('/userc')
        }
    }
}
</script>
<style lang="less" scoped>
#userPhoto{
    .img{
        width: 40px;
        height: 40px;
        background-size: cover;
        background-position: center top;
        border-radius: 50%;
        margin-top: 5px;
        cursor: pointer;
    }
}
.second{
    margin-left: 0 !important;
}
</style>