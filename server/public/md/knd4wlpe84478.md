# 组件基础

## 1. 组件概念

组件是带有名称的可复用实例。例如：

```html
<div id="app">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
<script>
  let app = Vue.createApp({})
  
  //第一个参数为组件名，在html中可以使用对应的标签生成DOM内容
  app.component('button-counter',{
    data() {
      return {
        count: 0
      }
    },
    template: `
      <button @click="count ++">
        You clicked me {{ count }} times.
      </button>
    `
  })
  app.mount("#app")
</script>
```

## 2. 组件的组织

通常一个应用会以一棵嵌套的组件树的形式来组织：

![](https://cn.vuejs.org/images/components.png)

例如，你可能会有页头、侧边栏、内容区等组件，每个组件又包含了其它的像导航链接、博文之类的组件。

组件分为**全局组件**和**局部组件**。在后续的课程中，我们会介绍通过脚手架以`.vue`单文件的形式来创建组件。



**（PS：项目中一般都是使用脚手架，组件为单文件的形式。各种与组件相关的操作在 引入模式 和 脚手架模式 中有所不一样。所以关于组件的基础，我们暂且先了解到这里，在下一章脚手架中，我们继续讨论各种和组件相关的操作。）**

