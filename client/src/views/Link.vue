<template>
  <div id="link">
    <article class="title">
      <h2>友情链接</h2>
      <p>
        请在<router-link to="/message">留言区</router-link
        >申请友链，本站友链信息：
      </p>
      <p>名称：阿飞飞>.</p>
      <p>主页：<span class="code">http://xiaoyao.fun</span></p>
      <p>图标：<span class="code">http://xiaoyao.fun/logo.png</span></p>
      <p>描述：一名没脱发的前端工程师😆</p>
    </article>
    <article class="linkList">
      <ul>
        <li v-for="(item, index) in linkList" :key="index">
          <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
          >
            <path 
            d="M 799.5 399.5 V 0.5 H 0.5 V 399.5 H 799.5"
            fill="none"
            stroke-dasharray="2400"
            stroke-dashoffset="2400"
            ></path>
          </svg>
          <a :href="item.home" target="_blank">
            <div class="top">
            <p
              class="logo"
              :style="{
                backgroundImage: `url(${item.logo})`,
              }"
            ></p>
            <p class="name">{{ item.name }}</p>
          </div>
          <p class="des">{{ item.des }}</p>
          </a>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
export default {
  name: "Link",
  data() {
    return {
      linkList: []
    };
  },
  methods: {
    async getLinks(){
      let {data} = await this.$axios({
        method: 'get',
        url: '/linkServer'
      })
      if(data.code){
        return this.$message.error("获取友链列表失败")
      }

      this.linkList = data.data
    }
  },
  created() {
    this.getLinks()
  }
};
</script>
<style lang="less" scoped>
#link {
  flex: 1;
  .title {
    user-select: text;
  }
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
    p {
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
    }
    span.code {
      color: #bd4147;
      background-color: rgba(27, 31, 35, 0.05);
      font-weight: 700;
    }
  }
  article.linkList {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        position: relative;
        box-sizing: border-box;
        flex: 1;
        min-width: 260px;
        margin: 0 7.5px 15px;
        padding: 5px;
        background-color: rgba(27, 31, 35, 0.05);
        svg {
          position: absolute;
          top: 0;
          left: 0;
          path{
            stroke: #0123fd;
            transition: 1s;
          }
        }
        &:hover path{
          stroke-dashoffset: 0;
        }
        a {
          position: relative;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
        }
        div.top {
          display: flex;
        }
        p.logo {
          overflow: hidden;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: 50% / cover;
        }
        p.name {
          flex: 1;
          font-size: 14px;
          height: 50px;
          margin-left: 15px;
          line-height: 50px;
          color: #409eff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p.des {
          font-size: 12px;
          height: 60px;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>