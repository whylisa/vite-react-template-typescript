## 启动

- yarn
- yarn dev

本项目按照文档先行，同时会在 B 站进行视频直播
关注公众号"前端要努力"，获取博主微信进入群聊及时获取直播信息

## 前言

- 说好的教程终于来了，文章主要带大家打造一个 react spa 的项目，使用的技术栈是 vite+react+ts,vite 的快想必我就不用介绍了，用过的都说好，
  react + ts 已经成为大型项目的主流，大厂极为青睐，所以学好 react + ts 对你之后想进大厂应该会如虎添翼，
- 本项目会有严格的规范性，eslint 规范，stylelint 规范，ts 类型规范，git 提交规范，包括打包上线体积分析，性能分析，以及何如做项目的想能优化。带你领略多人合作大型项目的开发"乐趣"，功能开发架构也是集成社区的优秀实践，让我们一起来开始搭建项目吧
- 第一篇文章主要来说一说在开始写实际业务代码之前的一些项目的基础配置工作
- 项目地址

## 技术栈前瞻

- 模版：使用的是 vite 的官方模版 react 17+ typescript 4+
  ```
  yarn create vite  why-react --template react-ts
  ```
- less: 项目中 less 文件的命名都要以 module.less 结尾

  ```
  yarn add less -D
  ```

- git 代码提交校验,

  ```
  yarn add yorkie lint-staged -D
  ```

  - 使用的 yorkie 没有使用 husky,yorkie 是 yyds fork husky 出来的,
    然后做了一些定制化的改动，使得钩子能从 package.json 的 "gitHooks"属性中读取。
  - gitHooks Git Hooks 就是在 Git 执行特定事件（如 commit、push、receive 等）时触发运行的脚本，类似于“钩子函数”，没有设置可执行的钩子将被忽略。
    在项目的 .git/hooks 目录中，有一些 .sample 结尾的钩子示例脚本，如果想启用对应的钩子，只需手动删除后缀，即可。（删除某一个 hook 的后缀 .sample 即可启用该 hook 脚本，默认是不启用的。）
  - 在代码提交之前，进行代码规则检查能够确保进入 git 库的代码都是符合代码规则的。但是整个项目上运行 lint 速度会很慢，lint-staged 能够让 lint 只检测暂存区的文件

- eslint 多人代码规范的重要性我就不再赘述了，非常非常重要

  ```
  eslint yarn add eslint -D
  // 然后终端运行
  npx eslint --init

  // 项目根目录会自动新建.eslintrc.js文件 注意：不要用自带的npm安装会装不了对应插件
   module.exports = {
     env: {
       browser: true,
       es2021: true,
       node: true,
      },
     extends: [
     "eslint:recommended",
     "plugin:react/recommended",
     "plugin:@typescript-eslint/recommended",
     ],
     parser: "@typescript-eslint/parser",
     parserOptions: {
     ecmaFeatures: {
       jsx: true,
     },
     ecmaVersion: 12,
     sourceType: "module",
     },
     plugins: ["react", "@typescript-eslint"],
     rules: {
     "arrow-body-style": 0,
     "jsx-a11y/label-has-for": 0,
     "max-lines-per-function": [
       2,
       { max: 320, skipComments: true, skipBlankLines: true },
     ],
     "no-confusing-arrow": 0,
     "no-nested-ternary": 0,
     "no-console": 2,
     "no-param-reassign": [
       2,
       { props: true, ignorePropertyModificationsFor: ["draft"] },
     ],
     "react/no-this-in-sfc": 0,
    },
    };
  ```

- prettier

  - 用来做代码格式化，有了 Prettier 之后，它能去掉原始的代码风格，确保团队的代码使用统一相同的格式，用官网的原话是"Building and enforcing a style guide"

  - 它和 Linter 系列比如 ESLint 的区别在于 Prettier 是一个专注于代码格式化的工具，对代码不做质量检查，但是如果团队规则不统一，你就知道什么叫一拉代码一篇红的感觉
    ```
    yarn add prettier -D
    ```

- stylelint
  - styleLint 是『一个强大的、现代化的 CSS 检测工具』, 与 ESLint 类似, 是通过定义一系列的编码风格规则帮助我们避免在样式表中出现错误.
  - css 样式的书写顺序及原理——很重要！很重要！很重要！概括讲就是，它涉及了浏览器的渲染原理：reflow 和 repaint
  - 很多小伙伴可能没有什么概念 请参考[css 样式的书写顺序及原理——很重要！](https://blog.csdn.net/qq_36060786/article/details/79311244)
  ```
  // 终端运行
  yarn add stylelint stylelint-config-standard -D
  // .stylelintrc.js 配置
    module.exports = {
    extends: "stylelint-config-standard",
    rules: {
      // 颜色值小写
      "color-hex-case": "lower",
      // 注释前无须空行
      "comment-empty-line-before": "never",
      // 使用数字或命名的 (可能的情况下) font-weight 值
      "font-weight-notation": null,
      // 在函数的逗号之后要求有一个换行符或禁止有空白
      "function-comma-newline-after": null,
      // 在函数的括号内要求有一个换行符或禁止有空白
      "function-parentheses-newline-inside": null,
      // url使用引号
      "function-url-quotes": "always",
      // 字符串使用单引号
      "string-quotes": "single",
      // 禁止低优先级的选择器出现在高优先级的选择器之后
      "no-descending-specificity": null,
      // 禁止空源
      "no-empty-source": null,
      // 禁止缺少文件末尾的换行符
      "no-missing-end-of-source-newline": null,
      },
     };
  ```
  -

## 编辑器配置

- 推荐使用 webstorm 打开 preferences 直接搜索 eslint stylelint prettier 直接勾选就好

## 项目目录划分

- React 中存在 UI 组件和容器组件的概念。顾名思义，UI 组件主要控制组件的显示，并不是与过多的逻辑耦合，容器组件中实现一些具体的逻辑，引入 UI 组件作为其子组件，将子组件（UI 组件）需要的一些数据通过组件间传值的方式方式传递到 UI 组件，进行数据的渲染。
  本项目也会按照此规则进行页面划分
- components 公共组件
  - 此目录下放的全部是纯净的组件不和业务挂钩的，后期我也会把这个单独发包到 npm 上
- materials 业务公共组件
  - 此目录下放的是和当前业务耦合的组件和业务挂钩
- hooks 自定义 hooks
- pages 页面组件
- service 接口定义
- utils 工具类

## 环境区分

- 线上
- test
- dev

## 跨域

- 面试贼喜欢问，基本上除了配置下本地代理，发版上线前端是不处理跨域的，在绝大部分场景下。
- 本地代理
  ```
  server: {
  port: 3001,
  proxy: {
   "/XXX": {
     target: "https://XXX",
     changeOrigin: true,
     cookieDomainRewrite: "",
     secure: false,
     },
   },
  },
  ```
- 线上 nginx

## package.json 文件配置

- 我们主要配置 gitHooks

```
 "scripts": {
 "dev": "vite",
 "build": "tsc && vite build",
 "serve": "vite preview",
 // 主要配置 触发pre-commit 进行elint stylelint 格式校验
 "lint": "npm run lint:js && npm run lint:style && npm run lint:prettier",
 "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
 "lint:prettier": "prettier --check \"**/*\" --end-of-line auto",
 "lint:style": "stylelint --fix \"src/**/*.less\" --syntax less",
 "lint-staged": "lint-staged",
 "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx "
 },
 // 使用yorkie 来自动触发识别 gitHooks这个钩子，然后执行pre-commit 然后在执行lint-staged
 "gitHooks": {
 "pre-commit": "lint-staged"
 },
 // lint-staged 配置 校验less,ts,tsx等文件有无不规范写法
 "lint-staged": {
 "*.less": "stylelint --syntax less",
 "*.{js,jsx,ts,tsx}": "npm run lint-staged:js",
 "*.{js,jsx,tsx,ts,less,md,json}": [
   "prettier --write"
   ]
 },
```
