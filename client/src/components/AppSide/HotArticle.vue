<template>
  <div class="hotArticle">
    <h4>Hot Article</h4>
    <ul>
      <li v-for="(item, index) in hostList" :key="index">
        <i>{{ index + 1 }}</i>
        <router-link :to="`/article/${item._id}`" target="_blank">{{ item.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HotArticle",
  data() {
    return {
      hostList: [],
    };
  },
  async created() {
    let {data} = await this.$axios({
      method: 'get',
      url: '/art/hot'
    })
    if(data.code){
      return
    }
    this.hostList = data.data
  },
};
</script>

<style lang="less" scoped>
.hotArticle {
  box-sizing: border-box;
  width: 100%;
  font-family: "Quicksand";
  box-shadow: 0 0 4px #ddd;
  background-color: #fff;
  padding: 20px;
  h4 {
    line-height: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e8e9e7;
    color: #383937;
    font-size: 16px;
  }
  ul {
    margin-top: 12px;
    li {
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      height: 40px;
      line-height: 40px;
      padding: 0 3px;
      &:nth-of-type(1) i{
        background-color: #71a598;
      }
      &:nth-of-type(2) i{
        background-color: #6eb3a3;
      }
      &:nth-of-type(3) i{
        background-color: #93bbb2;
      }
      i {
        display: block;
        width: 22px;
        height: 22px;
        margin-top: 9px;
        margin-right: 15px;
        border-radius: 50%;
        line-height: 16px;
        font-size: 16px;
        font-style: normal;
        color: #fff;
        text-align: center;
        font-weight: 100;
        font-family: "Pacifico";
      }
      a {
        display: block;
        flex: 1;
        color: #787977;
        font-size: 14px;
        text-decoration: none;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover{
          text-decoration: underline;
          color: #409eff;
        }
      }
    }
  }
}
</style>