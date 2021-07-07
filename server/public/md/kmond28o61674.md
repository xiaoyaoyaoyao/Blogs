# 认识Vue

## 1. 基础

- 官网

  [Vue3.x官网](https://v3.cn.vuejs.org/guide/installation.html)

- Vue是什么

  > Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。

- 什么是渐进式？

  可以根据项目需求，而逐级递增的引入对应的功能，而不需要初始就引入一个包含所有功能的重框架。

- 使用vue开发的优势

  - 轻量级框架，相对简单易学
  - 数据与页面分离，便于维护
  - 数据驱动页面，专心关注数据变化即可驱动DOM结构变化
  - 组件化，项目结构清晰
  - 内部使用虚拟DOM，减少不必要的DOM操作，运行速度快
  - 成熟的脚手架工具、社区活跃
  - ......

## 2. 使用

- 推荐在浏览器安装 [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools)，它允许你在一个更友好的界面中审查和调试 Vue 应用。

- 使用方式

  - 方式一：直接在HTML文件中通过script标签引入（初学者学习阶段使用）

  - 方式二：使用脚手架开发（完整项目开发时使用）

    > 本阶段课程我们会使用页面引入的方式带领大家入门，然后学习脚手架工具开发完整的项目实战。

## 3. 起步

- 引入Script

  ```html
  <script src="https://unpkg.com/vue@next"></script>
  ```

- 创建应用

  ```html
  <div id="app">
    <!--双大括号插值-->
    {{msg}}
  </div>
  <script>
    //应用配置项
    const HelloVueApp = {
      //数据
      data(){
        //返回一个对象，对象属性相当于数据
        return {
          msg: "Hello Vue!"
        }
      }
    }
  
    //创建应用并挂载
    Vue.createApp(HelloVueApp).mount("#app")
  </script>
  ```

- 数据驱动页面

  应用的数据发生变化时，相关的DOM会自动发生变化。这可以让我们专注于数据的处理而不用额外的再去操作DOM。

  ```html
  <div id="app">
    {{num}}
  </div>
  <script>
    const Counter = {
      data(){
        return {
          num: 0
        }
      }
    }
  
    //创建应用会返回一个实例，每条数据都会自动添加到实例的属性
    let vm = Vue.createApp(Counter).mount("#app")
  
    //test1
    vm.num ++
    //test2
    vm.num = 100
  </script>
  ```

- 插值符号

  在HTML标签中使用 `{{ }}`双大括号 的方式插入对应的数据；

  如果数据不是字符串，会被转换为字符串；

  插值符号中可以写入一段JavaScript表达式，比如：

  ```js
  {{ onOff ? "Hello" : "Hi" }}
  ```

（除了双大括号插值外，在DOM中我们还可以使用各种`指令`来使用值。）





















