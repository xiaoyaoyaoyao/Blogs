<template>
  <div id="message">
    <article>
      <h2>留言板</h2>
      <p>请文明发言，禁止广告。不然拉黑了嗷\(^o^)/~</p>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        maxlength="100"
        show-word-limit
        v-model="msg"
      >
      </el-input>
      <div class="btn">
        <i class="iconfont icon-biaoqing bg" @click.stop="showEmoji"></i>
        <el-button type="primary" size="mini" @click="handleMessageSubmit"
          >发表</el-button
        >
        <div
          class="emoji"
          :class="{
            show: ifEmojiShow,
          }"
        >
          <ul>
            <li
              v-for="(item, index) in emojiList"
              :key="index"
              @click="handleEmojiClick(item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </article>
    <article class="content">
      <ul>
        <li v-for="item in msgList" :key="item._id">
          <!--父留言-->
          <div class="parent">
            <!--留言-->
            <div class="left">
              <!--用户头像-->
              <img :src="baseURL + item.user.photo" alt="" />
            </div>
            <div class="right">
              <div class="name-time">
                <!--用户名-->
                <span>{{ item.user.user }}</span>
                <!--留言时间-->
                <span>{{ formatDate(item.date) }}</span>
              </div>
              <div class="message">
                <!--留言内容-->
                {{ item.msg }}
              </div>
              <div class="like-reply">
                <i
                  class="like iconfont icon-xinaixin"
                  :class="{
                    isLike:
                      userInfo._id && item.likes.indexOf(userInfo._id) !== -1,
                  }"
                  @click="handleLikesClick(item)"
                ></i>
                <!--点赞数-->
                <span>{{ item.likes.length }}</span>
                <i
                  class="reply iconfont icon-huifu"
                  @click="handleReplyClick(item, item.user)"
                ></i>
              </div>
            </div>
          </div>
          <!--子留言-->
          <div
            class="child"
            v-for="(childItem, index) in item.children"
            :key="index"
          >
            <div class="left">
              <img :src="baseURL + childItem.user.photo" alt="" />
            </div>
            <div class="right">
              <div class="name-time">
                <span>{{ childItem.user.user }}</span>
                <span>{{ formatDate(childItem.date) }}</span>
              </div>
              <div class="message">
                <span>@{{ childItem.replyUser.user }}</span>
                {{ childItem.msg }}
              </div>
              <div class="like-reply">
                <i
                  class="like iconfont icon-xinaixin"
                  :class="{
                    isLike:
                      userInfo._id &&
                      childItem.likes.indexOf(userInfo._id) !== -1,
                  }"
                  @click="handleLikesClick(item, childItem)"
                ></i>
                <span>{{ childItem.likes.length }}</span>
                <i
                  class="reply iconfont icon-huifu"
                  @click="handleReplyClick(item, childItem.user)"
                ></i>
              </div>
            </div>
          </div>
          <!--回复框-->
          <div
              class="replyInput"
              :class="{
                show: item.ifShowReply,
              }"
            >
              <el-input
                :placeholder="'@' + item.replyUser.user"
                v-model="item.reply"
                size="mini"
              ></el-input>
              <el-button
                class="replyBtn"
                type="primary"
                size="mini"
                @click="handleReplySubmit(item)"
                >回复
              </el-button>
              <div class="clear"></div>
          </div>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Message",
  data() {
    return {
      msg: "",
      emojiList: [
        "😃",
        "😁",
        "😂",
        "😊",
        "🙃",
        "🥰",
        "😘",
        "🤭",
        "🤔",
        "😏",
        "😵",
        "😟",
        "🙁",
        "😳",
        "😰",
        "😭",
        "😖",
        "😡",
        "😠",
        "😈",
        "🤡",
        "☠️",
        "👻",
        "🙈",
        "🙉",
        "❤️",
        "💖",
        "💢",
        "💣",
        "💤",
        "👋",
        "👍",
        "👌",
        "🤞",
        "🤟",
        "🤙",
        "👊",
        "🖕",
        "🤝",
        "🙏",
        "🙅",
        "🙅‍♂️",
        "👨‍✈️",
        "👩‍✈️",
        "👷",
        "👷‍♀️",
        "🤦",
        "🤦‍♂️",
        "👴",
        "🧓",
        "🐴",
        "🐮",
        "🐖",
        "🐑",
        "🐓",
        "🦚",
        "🐲",
        "🐳",
        "🐟",
        "🐌",
      ],
      ifEmojiShow: false,
      msgList: [],
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    // 点击图片显示emoji
    showEmoji() {
      this.ifEmojiShow = true;
    },
    // 表情被点击
    handleEmojiClick(item) {
      this.msg += item;
    },
    // 留言发表
    async handleMessageSubmit() {
      // 验证是否登录
      if (!this.userInfo.user) {
        return this.$message.error("请先登录！");
      }
      let msg = this.msg.trim();
      // 验证有没有内容
      if (!msg) {
        return this.$message.error("请输入留言内容。。。");
      }
      // 往后端发请求
      let { data } = await this.$axios({
        method: "post",
        url: "/msg/report",
        data: { msg },
      });
      // 后续处理
      if (data.code) {
        return this.$message.error(data.msg);
      }
      // 留言成功
      this.$message.success("留言成功!");
      this.msg = "";
      this.getMsg();
    },
    // 请求留言数据
    async getMsg() {
      let { data } = await this.$axios({
        method: "get",
        url: "/msg/get",
      });
      if (data.code) {
        return this.$message.error("请求留言数据失败，请稍后再试");
      }
      // 添加一些属性
      data.data.filter((item) => {
        // 用来处理回复框显不显示
        item.ifShowReply = false;
        // 用来存储每个留言的回复
        item.reply = "";
        // 用来存储回复的是谁
        item.replyUser = {};
      });
      // 请求成功
      this.msgList = data.data;
    },
    // 处理时间格式
    formatDate(val) {
      let date = new Date(val),
        YY = date.getFullYear(),
        MM = date.getMonth() + 1,
        DD = date.getDate(),
        hh = date.getHours(),
        mm = date.getMinutes(),
        ss = date.getSeconds();

      hh < 10 && (hh = "0" + hh);
      mm < 10 && (mm = "0" + mm);
      ss < 10 && (ss = "0" + ss);

      return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
    },
    // 回复按钮被点击
    handleReplyClick(item, replyUser) {
      // 未登录时，不让打开
      if (!this.userInfo.user) {
        this.$message.error("请先登录！");
      }
      item.ifShowReply = !item.ifShowReply;
      item.replyUser = replyUser;
    },
    // 回复提交
    async handleReplySubmit(item) {
      let reply = item.reply.trim();
      if (!reply) {
        return this.$message.error("请输入回复内容");
      }
      let { data } = await this.$axios({
        method: "post",
        url: "/msg/reply",
        data: {
          msg: reply,
          _id: item._id,
          replyUserId: item.replyUser._id,
        },
      });
      if (data.code) {
        return this.$message.error(data.msg);
      }
      // 回复成功
      this.$message.success(data.msg);
      // 重新请求数据
      this.getMsg();
    },
    // 点赞
    async handleLikesClick(item, childItem) {
      let { data } = await this.$axios({
        method: "post",
        url: "/msg/like",
        data: { item, childItem },
      });
      if (data.code) {
        return this.$message.error(data.msg);
      }
      this.$message.success(data.msg);
      this.getMsg();
    },
  },
  created() {
    // 请求留言数据
    this.getMsg();
  },
  mounted() {
    // 为了让emoji框关掉
    document.addEventListener("click", () => {
      this.ifEmojiShow = false;
    });
  },
};
</script>
<style lang="less" scoped>
#message {
  flex: 1;
  opacity: 0.9;
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
    .el-textarea {
      min-height: 80px;
      margin-top: 20px;
    }
    /deep/ textarea {
      min-height: 80px !important;
      font-family: "Quicksand", "Microsoft YaHei", sans-serif;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
    }
    .btn {
      position: relative;
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      .emoji {
        display: none;
        position: absolute;
        z-index: 3;
        top: 30px;
        width: 300px;
        height: 180px;
        padding: 7px;
        background-color: #fff;
        box-shadow: 0 0 5px #aaa;
        &.show {
          display: block;
        }
        ::before {
          content: "";
          position: absolute;
          top: -10px;
          left: 5px;
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-bottom-color: #aaa;
        }
        ul {
          width: 300px;
          height: 180px;
          border-top: 1px solid #ddd;
          border-left: 1px solid #ddd;
          li {
            float: left;
            box-sizing: border-box;
            width: 30px;
            height: 30px;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            font-size: 20px;
            text-align: center;
            line-height: 29px;
            cursor: pointer;
          }
        }
      }
    }
    i.bg {
      font-size: 20px;
      cursor: pointer;
    }

    &.content {
      user-select: none;

      ul {
        li {
          padding-bottom: 5px;
          margin-bottom: 10px;
          border-bottom: 1px dashed #ddd;
          font-size: 12px;
          font-family: "Microsoft YaHei", "sans-serif";

          div.parent,
          div.child {
            display: flex;
          }

          div.child {
            margin-left: 55px;
            margin-top: 3px;
          }

          div.left {
            overflow: hidden;
            width: 40px;
            height: 40px;
            margin-right: 15px;
            border-radius: 50%;

            img {
              width: 100%;
              height: 100%;
            }
          }

          div.right {
            flex: 1;

            div.name-time {
              font-size: 12px;
              margin-bottom: 3px;

              span:nth-child(1) {
                color: #73b899;
              }

              span:nth-child(2) {
                color: #aaa;
                margin-left: 10px;
                font-family: "Microsoft YaHei", "sans-serif";
              }
            }

            div.message {
              color: #666;
              letter-spacing: 2px;
              margin-bottom: 3px;
              word-break: break-word;

              span {
                color: #409eff;
                margin-right: 5px;
              }
            }

            div.like-reply {
              i {
                cursor: pointer;
                font-size: 14px;
                color: #aaa;
              }

              i.isLike {
                color: #f30606;
              }

              span {
                display: inline-block;
                width: 43px;
                font-size: 12px;
                color: #aaa;
              }
            }
          }
        }
      }
    }

    .replyInput {
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-left: 55px;
      transition: height 0.3s;

      &.show {
        height: 57px;
      }

      .replyBtn {
        padding: 4px 9px !important;
        float: right;
      }
    }
  }
}
</style>