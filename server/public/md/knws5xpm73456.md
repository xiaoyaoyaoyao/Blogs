# 脚手架

[Vue CLI 官方指南](https://cli.vuejs.org/zh/guide/)

## 1. 使用脚手架

### 1.1 介绍

- 什么是脚手架

  > 脚手架是为了保证各施工过程顺利进行而搭设的工作平台。

  ![](https://bkimg.cdn.bcebos.com/pic/c995d143ad4bd1138349792958afa40f4bfb0521?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5Mg==,g_7,xp_5,yp_5)

- `Vue CLI`

  `Vue CLI`是一个Vue项目的脚手架。

  类似的，`Vue CLI`的作用就是为Vue项目提供一套完整的项目基础架构，我们可以通过它来对项目**进行各种配置**、**安装插件扩展**…

  甚至，它还有一套完全图形化的创建和管理 Vue.js 项目的用户界面，允许我们直接通过界面UI来对项目进行管理。

  这样，我们可以专注在撰写应用上，而不必花好几天去纠结配置的问题。

### 1.2 安装

使用 `npm i -g @vue/cli` 进行安装。

> 后续课程内容以 npm 命令为主，如果习惯使用 yarn 命令，可参考[官方文档](https://cli.vuejs.org/zh/guide/installation.html)

安装之后，你就可以在命令行中访问 `vue` 命令。你可以通过简单运行 `vue`，看看是否展示出了一份所有可用命令的帮助信息，来验证它是否安装成功。

如需**升级**，使用`npm update -g @vue/cli`。

### 1.3 搭建

- **创建一个项目**

  运行以下命令来创建一个项目：

  `vue create project-name`

  > 阅读后续内容时，请注意`Vue CLI`版本，如发现安装的版本与该教案演示版本不同时，请参照[官方文档](https://cli.vuejs.org/zh/guide/installation.html)查阅操作上是否有差别。

  你会得到一个选择预设项preset的命令窗：

  ![](https://static.zzhitong.com/lesson-files/vue/img/5-1.png)

  `2.x`或`3.x`的选项能让你快速的搭建一个新项目原型，而手动选择则提供更多的选项。项目开发中推荐选择**手动配置**。

  **如果选择手动配置**，步骤如下：

  1. 选择各个配置

     **（按 空格键 选择！按 回车键 确认！）**

     ![](https://static.zzhitong.com/lesson-files/vue/img/5-2.png)

     > 初次接触脚手架时，请选择和演示图一样的选项。对脚手架及各个功能有一定的了解后，再根据自身需求选择。

  2. 选择Vue版本

     `Choose a version of Vue.js ...`

     选择需要的Vue.js版本。

  3. 路由模式

     `Use history mode for router?`

     此处询问是否使用`history`路由模式，输入`Y`。

     路由模式会在后续章节介绍。

  4. 选择css预处理器

     `Pick a CSS pre-processor`

     选择一个你喜欢的css预处理器。

  5. 各配置项的位置

     `Where do you prefer placing config for ...`

     此处询问各个插件的配置项放在哪里，推荐`In package.json`。

  6. 是否保存配置

     `Save this as a preset for future projects?`

     此处询问是否保存你自己选择的这个配置项。保存后，后续创建脚手架项目就可以使用这个配置项快速生成。

     输入`y`，继续输入配置项名字即可。

     > ~/.vuerc
     >
     > 被保存的 preset 将会存在用户的 home 目录下一个名为 `.vuerc` 的 JSON 文件里。如果你想要修改被保存的 preset / 选项，可以编辑这个文件。

  上述流程完成后，进入创建的目录，再启动服务即可在浏览器访问对应端口看到脚手架基础模板。

  - 进入目录`cd project-name`
- 启动服务`npm run serve`
  
- **文件目录结构**

  - `node_modules` 项目依赖
  - `public` 
    - `favicon.ico` 图标文件
    - `index.html` 初始html模板
  - `src`
    - `assets` 静态资源，与public不同的是引入方式不同，且这里的资源可以被webpack打包
    - `components` 放置组件的文件夹，里面方式各个`.vue`文件
    - `App.vue` 根组件
    - `main.js`  总配置入口文件
  - `babel.config.js` babel配置文件
  - `package.json`
  - `package-lock.json`

- **通过UI来创建/管理项目**

  你也可以通过 `vue ui` 命令以图形化界面创建和管理项目：

  上述命令会打开一个浏览器窗口，并以图形化界面将你引导至项目创建的流程。

  > 如果你不太喜欢使用命令行工具，完全可以使用 UI 界面来代替上述3.1的创建过程

- **插件与依赖**

  使用`vue add`命令（或者UI界面）来为项目添加插件/依赖。

  **插件**一般是为脚手架提供一些功能，大部分以`@vue/cli`为前缀。

  **依赖**就是项目中使用到的各种包，分为开发依赖和运行依赖。

## 2. 脚手架中的组件

### 2.1 组件结构

基于脚手架开发时，每一个单独的 `.vue` 文件就是一个组件。该文件中可以由三个部分组成：

- `template`标签 -- 用于放置DOM结构
- `script`标签 -- 用于放置js代码与实例配置
- `style`标签 -- 用于方式css样式代码

### 2.2 引入子组件

示例：

```vue
<template>
  <HelloWorld />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
```



1. 通过 `import xx from "xx/xx.vue"` 引入
2. 在配置中使用 `components` 选项注册
3. 在DOM中使用对应的标签调用子组件



























