<template>
<div id="app">
  <!-- 头部导航 -->
  <AppNav></AppNav>
  <!-- 内容部分 -->
  <div id="main">
    <!-- 左侧边栏 -->
    <div class="app-side">
      <AppSide></AppSide>
    </div>
    <!-- 路由页面 -->
    <router-view></router-view>
    <!--漂浮猫爪-->
    <Kitty></Kitty> 
  </div>
</div>
</template>
<script>
import AppNav from "@/components/AppNav";
import AppSide from "@/components/AppSide";
import Kitty from "@/components/Kitty"
import {mapMutations} from "vuex"

export default {
  components: {
    AppNav,
    AppSide,
    Kitty
  },
  methods: {
    ...mapMutations(['updateUserInfo'])
  },
  async created() {
    let response = await this.$axios({
      method: 'post',
      url: '/login/check'
    })
    if(response.data.code) return

    // 用户已经登录
    this.updateUserInfo(response.data.data)

  }
};
</script>
<style lang="less">
@import "./assets/css/reset.css";
@import "./assets/css/font.css";
@import "./assets/css/font/iconfont.css";

/* 自定义滚动条 */
::-webkit-scrollbar {/*滚动条整体样式*/
  width: 3px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,167,232,.3);
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 10px;
  background: #EDEDED;
}
body {
  background: url(./assets/img/bg/bg-left.png) no-repeat left 50px,
    url(./assets/img/bg/bg-right.png) no-repeat right 50px;
  // background: url(./assets/img/bg/boys.jpg) no-repeat top;
  // background-size: cover;
  background-color: #f2f2f2;
  user-select: none;
}

#app{
  min-width: 900px;
  padding-top: 25px;
}
#main {
  display: flex;
  box-sizing: border-box;
  max-width: 1300px;
  padding: 0 15px;
  margin: 15px auto 0;
  .m-right {
    flex: 1;
  }
  .app-side{
    width: 270px;
    margin-right: 15px;
  }
}
</style>
