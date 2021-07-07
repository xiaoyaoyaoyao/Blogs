# 指令

> 指令 (Directives) 是带有 `v-` 前缀的特殊 attribute。指令 attribute 的值预期是**单个 JavaScript 表达式** (`v-for` 和 `v-on` 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

## 1. 插入HTML字符

双大括号插入的数据如果是一段HTML字符的话，是不会解析成标签的。如果期望解析成标签需要使用 `v-html`指令。

```html
<p>这是双大括号：{{ HtmlStr }}</p>
<p>这是v-html指令：<span v-html="HtmlStr"></span></p>
```

除非情况特殊，否则不太推荐依靠`v-html`来渲染DOM结构。因为Vue并不是基于字符串的模板引擎，对于用户界面的话组件模式更适合。另外在站点上渲染任意的HTML结构内容是非常危险的行为，即使要使用`v-html`也要确保内容的可信性。

## 2.条件渲染

### 2.1 `v-if`

使用`v-if`来对DOM元素进行条件渲染：

```html
<!--根据awesome数据的真假值来决定是否渲染出h1-->
<h1 v-if="awesome">Vue is awesome!</h1>
```

可以继续使用`v-else` 或者 `v-else-if`来进行多个选择渲染，规则类似于js中的判断：

```html
<h1 v-if="type === 'A'">A</h1>
<h1 v-else-if="type === 'B'">B</h1>
<h1 v-else-if="type === 'C'">C</h1>
<h1 v-else>Not A/B/C</h1>
```

 结合`template`标签来实现多个标签内容的条件渲染：

```html
<!--template标签本身不会被渲染到页面中，只有它里面的内容会渲染-->
<template v-if="awesome">
	<h1>Title</h1>
	<p>Paragraph 1</p>
	<p>Paragraph 2</p>
</template>
```

### 2.2 `v-show`

`v-show`的用法和`v-if`大致一样：`<h1 v-show="ok">Hello!</h1>`。不同的是带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS property `display`。

注意，`v-show` 不支持 `<template>` 元素，也不支持 `v-else`。

### 2.3 `v-if` vs `v-show`

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

## 3. 标签属性

### 3.1 `v-bind`

当标签属性的值需要动态变化时，使用`v-bind`：

```html
<a v-bind:href="url">Hello Vue!</a>
```

当然，属性名也可以动态：

```html
<div v-bind:[attr]="value"></div>
```

### 3.2 缩写

`v-bind`可以直接省略，只留下`:`

```html
<a :href="url">Hello Vue!</a>
```

### 3.3 class类名的绑定

基础写法：

```html
<!--
根据数据 isRed 的真假值，来决定有没有"red"这个名字。
-->
<div :class="{red:isRed}"></div>
```



固定某个名字，而其他名字根据数据真假值动态：

```html
<!--
固定拥有"aaa"名字
"bbb" "ccc"则由数据的真假来决定
-->
<div
     class="aaa"
     :class="{bbb : isB,ccc : isC}"
></div>
```



整个对象数据动态：

```html
<div :class="classObject"></div>
<!--
数据
{
	classObject:{
		aaa : true,
		bbb : false
	}
}

渲染为
<div class="aaa"></div>
-->
```



数组语法：

```html
<div :class="[redClass,activeClass]"></div>
<!--
数据
{
	redClass : "red",
	activeClass : "active"
}

渲染为
<div class="red active"></div>
-->
```

### 3.4 style样式的绑定

基础写法：

```html
<div :style="{width:w,height:h}"></div>
```



固定属性写法：

```html
<div
    style="width:100px"
    :style="{
        height : h
    }"
></div>
```



整个对象数据动态：

```html
<div :style="styleObject"></div>
```



数组写法：（多个对象数据）

```html
<div :style="[styleObject1,styleObject2]"></div>
```

## 4. 事件处理

大部分时候数据的变化都是由事件触发的，Vue中事件的绑定通过指令`v-on`完成。

### 4.1 监听事件

```html
<div id="app">
  <p>按钮被点击了 {{num}} 次</p>
  <button v-on:click="num ++">按钮</button>
</div>
<script>
  Vue.createApp({
    data(){
      return {
        num: 0
      }
    }
  }).mount("#app")
</script>
```

`v-on:`前缀可以简写为`@`。例如：`<button @click="num ++">按钮</button>`。

### 4.2 事件处理方法

然而许多事件处理逻辑会更为复杂，所以直接把 JavaScript 代码写在 `v-on` 指令中是不可行的。因此 `v-on` 还可以接收一个需要调用的方法名称，这些方法需要配置在`methods`中。

```html
<div id="app">
  <button v-on:click="clickFn">按钮</button>
</div>
<script>
  Vue.createApp({
    data() {
      return {
        name: "Vue.js"
      }
    },
    methods: {
      clickFn(event) {
        //this指向实例
        alert(`Hello ${this.name}`)

        //event是原生事件对象
        alert(event.target.tagName)
      }
    }
  }).mount("#app")
</script>
```

### 4.3 传递参数

如果需要为事件函数传递参数，那么可以直接使用函数自执行的写法：

```html
<div id="app">
  <p>{{msg}}</p>
  <button @click="fn('Hello')">Hello按钮</button>
  <button @click="fn('World')">World按钮</button>
  <!--
		如果此时需要事件对象，可以传入$event
		@click="fn('World',$event)"
	-->
</div>
<script>
  Vue.createApp({
    data() {
      return {
        msg: "初始值"
      }
    },
    methods: {
      fn(val){
        this.msg = val
      }
    }
  }).mount("#app")
</script>
```

### 4.4 多事件处理器

事件处理程序中可以有多个方法，这些方法由逗号运算符分隔：

```html
<div id="app">
  <button @click="one($event), two($event)">按钮</button>
</div>
<script>
  Vue.createApp({
    data() {
      return {
        msg: "初始值"
      }
    },
    methods: {
      one(event){
        // 第一个事件处理器逻辑...
      },
      two(event){
        // 第二个事件处理器逻辑...
      }
    }
  }).mount("#app")
</script>
```

### 4.5 事件修饰词

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的。

- `.stop` 阻止事件冒泡；
- `.prevent` 阻止默认事件；
- `.capture` 使用事件捕获模式；
- `.self` 只在自身触发（子元素不能触发）；
- `.once` 只触发一次；
- `.passive` 默认事件立即触发，无视preventDefault。

```html
<!-- 阻止单击事件继续传播 -->
<a @click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a @click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form @submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div @click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div @click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a @click.once="doThis"></a>

```

```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发   -->
<!-- 而不会等待 `onScroll` 完成                   -->
<!-- 这其中包含 `event.preventDefault()` 的情况   -->
<div @scroll.passive="onScroll">...</div>
```

> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

> 不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你*不想*阻止事件的默认行为。

### 4.6 按键修饰符

在监听键盘事件时，如果想要监听具体的某个键，可以使用按键修饰符。

使用**键名**（JS课程学习的 event.key 属性的值）直接修饰：

```html
<!-- enter 按下时，调用 vm.submit() -->
<input v-on:keyup.enter="submit">

<!-- pageDown按下时，调用vm.onPageDown() -->
<input v-on:keyup.page-down="onPageDown">
```

Vue 为最常用的键提供了别名：

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### 4.7 系统修饰键

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

> 注意：在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。在 Sun 操作系统键盘上，meta 对应实心宝石键 (◆)。在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”。

例如：

```html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

> 请注意修饰键与常规按键不同，在和 `keyup` 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 `ctrl` 的情况下释放其它按键，才能触发 `keyup.ctrl`。而单单释放 `ctrl` 也不会触发事件。

### 4.8 `.exact` 修饰符

`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。

```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

### 4.9 鼠标按钮修饰符

- `.left`
- `.right`
- `.middle`

这些修饰符会限制处理函数仅响应特定的鼠标按钮

## 5. 列表渲染

我们可以用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 items 是源数据数组，而 `item` 则是被迭代的数组元素的**别名**。

### 5.1 遍历数组

```html
<ul id="app">
  <li v-for="item in items">{{item.msg}}</li>
</ul>
<script>
  Vue.createApp({
    data() {
      return {
        items: [
          {msg: "Foo"},
          {msg: "Bar"}
        ]
      }
    }
  }).mount("#app")
</script>
```

`v-for` 还支持一个可选的第二个参数，即当前项的索引。

```html
<li v-for="(value,index) in items"></li>
```

### 5.2 遍历对象

```html
<!--只遍历值-->
<!--<p v-for="value in obj">{{value}}</p>-->

<!--遍历属性与值-->
<p v-for="(key,value) in obj">{{name}}：{{value}}</p>
```

### 5.3 `key`属性

当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。

这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` attribute：

```html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

建议尽可能在使用 `v-for` 时提供 `key` attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

### 5.4 结合`template`

同样的，`template`标签本身并不会被渲染出来，而是将内部的多个节点循环渲染。

```html
<ul>
    <template v-for="item in items">
    	<li>{{item.id}}</li>
        <li>{{item.msg}}</li>
    </template>
</ul>
```

## 6.表单输入绑定

你可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。

> `v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

### 6.1 文本框

```html
<input v-model="message">
<p>Message is: {{ message }}</p>
```

### 6.2 多行文本

```html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message"></textarea>
```

### 6.3 复选框

单个复选框，绑定到布尔值：

```html
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```

多个复选框，绑定到同一个数组：

```html
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>
```

### 6.4 单选按钮

```html
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>
```

### 6.5 单选下拉

```html
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```

### 6.6 多选下拉

绑定到数组

```html
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
```

### 6.7 修饰词

`.lazy`

在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了[上述](https://cn.vuejs.org/v2/guide/forms.html#vmodel-ime-tip)输入法组合文字时)。你可以添加 `lazy` 修饰符，从而转为在 `change` 事件_之后_进行同步：

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">
```

`.number`

如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符：

```html
<input v-model.number="age" type="number">
```

这通常很有用，因为即使在 `type="number"` 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 `parseFloat()` 解析，则会返回原始的值。

`.trim`

如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：

```html
<input v-model.trim="msg">
```





























