<template>
  <div id="home">
    <!-- hello -->
    <article class="hello">
      <h2>HELLO!</h2>
      <p class="des"
        >你好！欢迎来到我的博客！我是一名<span>有点肾虚的</span>
        WEB前端攻城狮，热衷于研究JavaScript、NodeJs、Express、Vue……这是我的主页！我会在这里发表一些
        <span>不成熟的</span
        >技术文章，记录一些<span>沙雕的</span>日常。博客目前使用的是Vue +
        Element + Node + Express + MongoDB搭建的，如果对源码感兴趣的话可以
        <a href="https://github.com/xiaoyaoyaoyao" target="_blank"
          >点击这里</a
        >。欢迎提出宝贵的建议哦！</p
      >
      <div class="info">
        <div class="left">
          <h3>personal information</h3>
          <ul>
            <li>
              <p class="dt">NICKNAME</p>
              <p class="dd">逍遥</p>
            </li>
            <li>
              <p class="dt">ADDRESS</p>
              <p class="dd">成都市天府新区</p>
            </li>
            <li>
              <p class="dt">EMAIL</p>
              <p class="dd">1036539667@qq.com</p>
            </li>
            <li>
              <p class="dt">GITHUB</p>
              <p class="dd">
                <a
                  href="https://github.com/xiaoyaoyaoyao"
                  target="_blank"
                  rel="noopener noreferrer"
                  >https://github.com/xiaoyaoyaoyao</a
                >
              </p>
            </li>
          </ul>
        </div>
        <div class="right">
          <h3>skills</h3>
          <ul>
            <li>
              <p class="lang">
                <span class="s1">HTML5 & CSS3</span>
                <span class="s2">90%</span>
              </p>
              <p class="level"><span style="width: 90%"></span></p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">Javascript</span>
                <span class="s2">85%</span>
              </p>
              <p class="level"><span style="width: 85%"></span></p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">Node.js</span>
                <span class="s2">80%</span>
              </p>
              <p class="level"><span style="width: 80%"></span></p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">Vue & Uni-app</span>
                <span class="s2">70%</span>
              </p>
              <p class="level"><span style="width: 70%"></span></p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">Express</span>
                <span class="s2">60%</span>
              </p>
              <p class="level"><span style="width: 60%"></span></p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">Koa 2</span>
                <span class="s2">50%</span>
              </p>
              <p class="level"><span style="width: 50%"></span></p>
            </li>
          </ul>
        </div>
      </div>
    </article>
    <!-- article -->
    <article class="article">
      <h2>ARTICLE</h2>
      <p class="des"
        >热门文章推荐。<router-link to="/article">更多文章</router-link>
        请访问文章页&gt;.&lt;
      </p>
      <div class="content">
        <div class="left">
          <div class="art">
            <img src="../assets/img/article/1.jpg" alt="" />
            <p class="title">{{hostList[0].title}}</p>
            <div class="cover">
              <router-link :to="`/article/${hostList[0]._id}`" replace>
                <p>{{hostList[0].des}}</p>
                <p>View more</p>
              </router-link>
            </div>
          </div>
          <div class="art art2">
            <img src="../assets/img/article/3.jpg" alt="" />
            <p class="title">{{hostList[1].title}}</p>
            <div class="cover">
              <router-link :to="`/article/${hostList[1]._id}`" replace>
                <p>{{hostList[1].des}}</p>
                <p>View more</p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="art">
            <img src="../assets/img/article/2.jpg" alt="" />
            <p class="title">{{hostList[2].title}}</p>
            <div class="cover">
              <router-link :to="`/article/${hostList[2]._id}`" replace>
                <p>{{hostList[2].des}}</p>
                <p>View more</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </article>
    <!-- work -->
    <article class="work">
      <h2>WORK EXPERIENCE</h2>
      <ul>
        <li>
          <div class="left">
            <p class="time">2020 -</p>
          </div>
          <div class="right">
            <h3>WEB DEVELOPER</h3>
            <p class="img">
              <img src="../assets/img/technology/vue.jpg" height="30" alt="" />
            </p>
            <p class="company">Qingyi Technology</p>
            <p class="content">
              Responsible for the development of independent official website of
              some subjects of the company.And also Responsible for some outsourcing 
              projects of the company, include some applet projects.
            </p>
          </div>
        </li>
        <li>
          <div class="left">
            <p class="time">2018 - 2020</p>
          </div>
          <div class="right">
            <h3>WEB DEVELOPER</h3>
            <p class="img">
              <img
                src="../assets/img/technology/jquery.png"
                height="30"
                alt=""
              />
            </p>
            <p class="company">Chengdu Compal</p>
            <p class="content">
              Worked as an assistant of web developer. Develop and maintain the company 
              intranet, staff online class system and background management system.
            </p>
          </div>
        </li>
      </ul>
    </article>
    <!-- contact -->
    <article id="contact" class="contact">
      <h2>CONTACT ME</h2>
      <p class="des">
        有任何问题请联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*)
      </p>
      <div class="info">
        <el-form :model="contactForm" :rules="rules" ref="contactForm">
          <el-form-item label="Your Name" prop="name">
            <el-input v-model="contactForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Your Email" prop="email">
            <el-input v-model="contactForm.email"></el-input> </el-form-item
          ><el-form-item label="Subject" prop="subject">
            <el-input v-model="contactForm.subject"></el-input> </el-form-item
          ><el-form-item label="Your Message" prop="message">
            <el-input v-model="contactForm.message"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submitForm('contactForm')"
            >send</el-button
          >
        </el-form>
      </div>
    </article>
    <div id="num"><p>蜀ICP备2021015466号</p></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      hostList: [
        {_id:'', title:'', des:''},
        {_id:'', title:'', des:''},
        {_id:'', title:'', des:''}
      ],
      contactForm: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入您的称呼", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入您的邮箱", trigger: "blur" },
        ],
        message: [
          { required: true, message: "请输入您的内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    }
  },
  async created() {
    let {data} = await this.$axios({
      method: 'get',
      url: '/art/hot'
    })
    if(data.code){
      return
    }
    for(let i = 0; i < 3; i++){
      this.hostList[i]._id = data.data[i]._id
      this.hostList[i].title = data.data[i].title
      this.hostList[i].des = data.data[i].des
    }
  }
};
</script>
<style lang="less" scoped>
#home {
  flex: 1;
  opacity: 0.9;
  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px 35px;
    background-color: #fff;
    h2 {
      margin-bottom: 15px;
      font-size: 30px;
      letter-spacing: 3px;
    }
    p.des {
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
      font-family: Quicksand;
      span {
        font-style: italic;
        color: #777;
        text-decoration: line-through;
      }
      a {
        text-decoration: underline;
        color: #aaa;
      }
    }
  }
  article.hello {
    .info {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-family: Quicksand;
      div.left,
      div.right {
        display: flex;
        flex: 1;
        flex-direction: column;
      }
      h3 {
        margin-bottom: 30px;
        font-weight: 400;
        font-size: 22px;
        color: #666;
      }
      div.left {
        ul {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-between;
          li {
            display: flex;
            p.dt {
              width: 40%;
              font-weight: bold;
            }
            p.dd {
              flex: 1;
            }
          }
        }
      }
      div.right {
        ul li {
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
          p.lang {
            display: flex;
            justify-content: space-between;
            letter-spacing: 2px;
            span.s1 {
              font-weight: bold;
            }
            span.s2 {
              font-size: 12px;
              font-weight: bold;
              color: #999;
            }
          }
          p.level {
            width: 100%;
            height: 5px;
            background-color: #ececec;
            span {
              display: block;
              height: 100%;
              // background-color: #bfe2e6;
              background-color: violet;
            }
          }
        }
      }
    }
  }
  article.article {
    div.content {
      display: flex;
      div.left {
        flex: 1;
        margin-right: 1px;
      }
      div.right {
        flex: 1;
        margin-left: 1px;
      }
      div.art {
        position: relative;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
        }
        &.art2 {
          margin-top: 2px;
        }
        p.title {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30px;
          background-color: rgba(0, 0, 0, 0.1);
          font-weight: 700;
          line-height: 30px;
          color: #fff;
          text-align: center;
          transition: bottom 0.3s;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-family: Quicksand;
        }
        div.cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          a {
            display: block;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.3s;
            p {
              position: absolute;
              font-weight: Quicksand;
              font-weight: bold;
              transition: 0.3s;
            }
            p:nth-child(1) {
              top: 20%;
              width: 100%;
              text-align: center;
              color: #fff;
              font-size: 22px;
              text-transform: uppercase;
            }
            p:nth-child(2) {
              left: 50%;
              bottom: 20%;
              width: 30%;
              height: 32px;
              border-radius: 16px;
              text-align: center;
              line-height: 32px;
              transform: translateX(-50%);
              color: #000;
              background-color: #bfe2e6;
            }
          }
        }
        &:hover {
          p.title {
            bottom: -30px;
          }
          div.cover a {
            opacity: 1;
            p:nth-child(1) {
              top: 32%;
            }
            p:nth-child(2) {
              bottom: 32%;
            }
          }
        }
      }
    }
  }
  article.work {
    font-family: Quicksand;
    h2 {
      margin-bottom: 15px;
      font-size: 30px;
      letter-spacing: 3px;
    }
    ul {
      margin-top: 40px;
      li {
        display: flex;
        div.left {
          width: 200px;
          p.time {
            position: relative;
            left: 10px;
            top: -15px;
            width: 160px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-weight: 700;
            background-color: #bfe2e6;
            &::after {
              position: absolute;
              top: 0;
              right: -30px;
              content: "";
              width: 0;
              height: 0;
              border: 15px solid transparent;
              border-left-color: #bfe2e6;
            }
          }
        }
        div.right {
          box-sizing: border-box;
          flex: 1;
          padding-left: 20px;
          padding-right: 40px;
          padding-bottom: 40px;
          border-left: 2px solid #bfe2e6;
          h3 {
            position: relative;
            margin-bottom: 20px;
            margin-top: -10px;
            line-height: 25px;
            font-size: 20px;
            text-transform: uppercase;
            &::after {
              position: absolute;
              left: -23px;
              top: 8px;
              content: "";
              width: 4px;
              height: 4px;
              background-color: #000;
            }
          }
          p.img {
            margin-bottom: 20px;
          }
          p.company {
            color: #000;
            margin-bottom: 20px;
          }
          p.content {
            color: #777;
            letter-spacing: 1px;
            font-size: 16px;
          }
        }
        &:last-child div.right {
          border-color: transparent;
        }
      }
    }
  }
  article.contact {
    .el-form {
      padding: 0 40px;
      font-family: Quicksand;
      .el-button {
        display: block;
        width: 100px;
        height: 40px;
        margin-top: 35px;
        border: 0;
        border-radius: 20px;
        box-shadow: 0 0 0 #bbb;
        background-color: #bfe2e6;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 2px;
        font-family: "Quicksand", "Microsoft YaHei", "sans-serif";
        color: #000;
        outline: 0;
        cursor: pointer;
        transition: box-shadow 0.3s;
        &:hover{
          box-shadow: 0 3px 5px #bbb;
        }
      }
    }
  }
  #num{
    margin: 50px 0 10px 300px;
    width: 100%;
    height: 30px;
    background-color: #F2F2F2;
    p{
        font-size: 16px;
        font-family: '楷体';
        line-height: 30px;
        color: #333;
    }
}
}
</style>