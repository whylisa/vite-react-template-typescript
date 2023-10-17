## 启动

- 依赖安装：pnpm i
- 本地启动项目：pnpm dev
- 要登陆需要运行：pnpm mock
  - 不然无法登录

## 教程

- 说好的教程终于来了，文章主要带大家打造一个 react spa 的项目，使用的技术栈是 vite+react+ts,vite 的快想必我就不用介绍了，用过的都说好，
  react + ts 已经成为大型项目的主流，大厂极为青睐，所以学好 react + ts 对你之后想进大厂应该会如虎添翼，
- 本项目会有严格的规范性，eslint 规范，stylelint 规范，ts 类型规范，git 提交规范，包括打包上线体积分析，性能分析，以及何如做项目的想能优化。带你领略多人合作大型项目的开发"乐趣"，功能开发架构也是集成社区的优秀实践，让我们一起来开始搭建项目吧
- 第一篇文章主要来说一说在开始写实际业务代码之前的一些项目的基础配置工作
- 项目地址: [vite-react-ts](https://github.com/whylisa/vite-react-template-typescript)

## 技术栈前瞻

- 模版：使用的是 vite 的官方模版 react 17+ typescript 4+

  ```
  yarn create vite  why-react --template react-ts
  ```

- less: 项目中 less 文件的命名都要以 module.less 结尾

  ```
  pnpm i less
  ```

- git 代码提交校验,

  ```
  pnpm i yorkie lint-staged -D
  ```

  - 使用的 yorkie 没有使用 husky,yorkie 是 yyds fork husky 出来的,
    然后做了一些定制化的改动，使得钩子能从 package.json 的 "gitHooks"属性中读取。

  - gitHooks Git Hooks 就是在 Git 执行特定事件（如 commit、push、receive 等）时触发运行的脚本，类似于“钩子函数”，没有设置可执行的钩子将被忽略。
    在项目的 .git/hooks 目录中，有一些 .sample 结尾的钩子示例脚本，如果想启用对应的钩子，只需手动删除后缀，即可。（删除某一个 hook 的后缀 .sample 即可启用该 hook 脚本，默认是不启用的。）
  - 在代码提交之前，进行代码规则检查能够确保进入 git 库的代码都是符合代码规则的。但是整个项目上运行 lint 速度会很慢，lint-staged 能够让 lint 只检测暂存区的文件

- eslint 多人代码规范的重要性我就不再赘述了，非常非常重要

  ```
  eslint pnpm i eslint -D
  // 然后终端运行
  npx eslint --init

  // 项目根目录会自动新建.eslintrc.cjs文件 注意：不要用自带的npm安装会装不了对应插件
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
    pnpm i prettier -D
    ```

- stylelint
  - styleLint 是『一个强大的、现代化的 CSS 检测工具』, 与 ESLint 类似, 是通过定义一系列的编码风格规则帮助我们避免在样式表中出现错误.
  - css 样式的书写顺序及原理——很重要！很重要！很重要！概括讲就是，它涉及了浏览器的渲染原理：reflow 和 repaint
  - 很多小伙伴可能没有什么概念 请参考[css 样式的书写顺序及原理——很重要！](https://blog.csdn.net/qq_36060786/article/details/79311244)
  ```
  // 终端运行
  pnpm i stylelint stylelint-config-standard -D
  // .stylelintrc.cjs 配置
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
- 》》》更多

## 编辑器配置

- 推荐使用 webstorm 打开 preferences 直接搜索 eslint stylelint prettier 直接勾就好
- stylelint

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc08b010ddac4240a05d4eaacde4173a~tplv-k3u1fbpfcp-watermark.image)

- eslint

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8daff288348433f96fdf25c265cdc1f~tplv-k3u1fbpfcp-watermark.image)

- prettier
  ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7eb290693dff4342bcd2d275ec204477~tplv-k3u1fbpfcp-watermark.image)

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

## 环境配置

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

- 我们

  ```
   "scripts": {
   "dev": "vite",
   "build": "tsc && vite build",
   "serve": "vite preview",
   // 主要配置 触发pre-commit 进行elint stylelint 格式校验
   "lint": "npm run lint:js && npm run lint:style && npm run lint:prettier",
   "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
   "lint:prettier": "prettier --check "**/*" --end-of-line auto",
   "lint:style": "stylelint --fix "src/**/*.less" --syntax less",
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

## json-server mock 数据

- pnpm i json-server -D
- 在终端
  ```
  mkdir mock
  cd mock
  touch db.json
  ```
- 在 package.json 中的 scripts 中添加

  ```
  "mock": "json-server mock/db.json --port 3008"
  ```

- 然后运行命令 yarn mock 就可以在控制台成功访问到我们在 db.json 中配置的接口数据了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/339210a9bb0242b1a36ff21b959a5f97~tplv-k3u1fbpfcp-zoom-1.image)

## 请求封装

注意事项：process.env 要替换成 import.meta.env

- 全局的公共配置文件都会放在根目录下的 config.ts 文件中，目前项目刚开始只有少量配置信息

```ts
/**
 * 当前环境变量
 */
// process.env 在vite中不能用
// export const whyEnv = import.meta.env.VITE_REACT_URL || "";
/**
 * 接口地址
 * @description env 可为主要环境或自定义地址
 */
export const apiAddress = "http://localhost:3008/";

/**
 * 开发代理前缀
 */
export const proxyApi = "/api";

/**
 * 接口前缀
 * 判断环境，是否需要使用前缀
 * 生产环境不需要代理，同时本地配置的代理在生产环境也是不能用的
 */
export const urlPrefix = process.env.NODE_ENV === "development" ? proxyApi : "";
```

- 项目中用的 umi-request 这个库，目前我给配置的很少的东西，错误处理，中间件处理等等我的给删减了，刚开始不搞这么复杂

```tsx
// utils/request.ts

/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import umiRequest, { extend } from "umi-request";
import { urlPrefix } from "../config";

// 使用前缀，配合本地代理
export const whyRequest = extend({
  prefix: `${urlPrefix}`,
});

export default umiRequest;
```

- 定义接口:要提前和后段沟通好入参数，出参数的格式，结合 ts 的类型提示，在其他地方调用的时候就可以直接看到接口定义的属性了，非常方便

```
/**
* 登陆请求数据类型
*/
export interface ILogin {
  userName: string;
  pwd: string;
}

/**
* 返回数据类型
* 要提前和后段定义好类型，等接口写完直接替换地址就好了
*
*/
export interface ILoginData {
code: number;
message: string;
token: string;
}

/**
* 登陆接口
* @param params
  */
  export const loginApp = (params: ILogin): Promise<ILoginData> => {
  return whyRequest.get("/login", params);
  };
```

- 使用就很简单，直接调用，之后我们会配合，ahooks 中的 useRequest()使用

```
 loginApp({ userName: "why", pwd: "123" }).then((res) => {
     if (res.code === 200) {
       history.push("/home");
     } else {
       message.error("用户名或密码错误！");
     }
   });
```

## 国际化配置

- pnpm i react-intl -D
- 国际化我们使用 react-intl 同时也要兼容 antd,的之类插件的中英文，我们在切换语言的时候插件库也要直接进行切换到对应的语言，配置起来也很方便，
- 我们直接上代码

```
// 引入创建语言，国际化容器，暂时我们只需要用这两个就可以实现的我们目前的功能
import { createIntl, IntlProvider } from "react-intl";
// 我们需要引入antd 的国际化的配置
import antdEnUS from "antd/lib/locale/en_US";
import antdZhCN from "antd/lib/locale/zh_CN";
// 这是我们项目中中英文的配置，
import enLn from "./components/ln-en";
import zhLn from "./components/ln-zh-cn";
···核心代码
/**
* 包裹了默认 locale 的 Provider
* LocaleProvider 需要在App.tx使用，包装整个项目
* @param props
* @returns
  */
  export const LocaleProvider: React.FC = (props) => {
  return <IntlProvider locale={getLocale()}>{props.children}</IntlProvider>;
  };
/**
 * 获取当前的 intl 对象，可以在 node 中使用
 * @param locale 需要切换的语言类型
 * @param changeIntl 是否不使用 g_intl
 * @returns IntlShape
 */
  const getIntl = (locale?: string, changeIntl?: boolean) => {

  // 如果全局的 g_intl 存在，且不是 setIntl 调用
  if (gIntl && !changeIntl && !locale) {
  return gIntl;
  }
  // 如果存在于 localeInfo 中
  if (locale && localeInfo[locale]) {
  return createIntl(localeInfo[locale]);
  }

// 使用默认语言
if (localeInfo[defaultLanguage])
return createIntl(localeInfo[defaultLanguage]);
// 使用 zh-CN
if (localeInfo["zh-cn"]) return createIntl(localeInfo["zh-cn"]);
  // 抛错
if (!locale || !!localeInfo[locale]) {
  throw new Error(
  "The current popular language does not exist, please check the locales folder!"
  );
  }
// 如果还没有，返回一个空的
return createIntl({
locale: "zh-cn",
messages: {},
});
};
/**
* 语言转换
* @param descriptor
* @param values
  */
  export const formatMessage = (
  descriptor: MessageDescriptor,
  values?: Record<string, any>
  ) => {
  if (!gIntl) {
  setIntl(getLocale());
  }
  return gIntl.formatMessage(descriptor, values);
  };
```

- 页面中使用

  1，我们要在对应的 ts 文件中配置中英文对照

  ```
  // 在locale 文件下配置中文对照
  export default {
  frontEnd: "Work hard on the front end",
  switchLan: "Chinese-English shift",
  switchToEn: "switch to chinese",
  switchToCh: " switch to english",
  localLan: "The internationalization of this project is   based on",
  };
  // 配置英文对照
  export default {
  frontEnd: "前端要努力",
  switchLan: "中英文切换",
  switchToEn: "切换到中文",
  switchToCh: "切换到英文",
  localLan: "本项目国际化基于",
  };
  ```

  2，在页面中我们直接调用 formatMessage() 这个方法就好了

```tsx
/**
 * 国际化页面
 * @constructor
 */
const LocalePage: React.FC = () => {
  // 这使用的是useState,其实这里是完全不需要的
  const [value, setValue] = React.useState(
    localStorage.getItem("why__locale") || "zh-cn"
  );
  // 切换多语言
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value); //在这里是没有作用的代码
    setLocale(e.target.value); // 调用切换多语言方法，然后刷新页面
  };
  return (
    <Card title={formatMessage({ id: "switchLan" })} style={{ width: "500px" }}>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={"zh-cn"}>{formatMessage({ id: "switchToEn" })}</Radio>
        <Radio value={"en"}>{formatMessage({ id: "switchToCh" })}</Radio>
      </Radio.Group>
      <div className={styles.localLan}>
        {formatMessage({ id: "localLan" })}react-intl
      </div>
    </Card>
  );
};
```

- 国际化页面

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89c1bdb57faf4992bab2e3d89ade5f27~tplv-k3u1fbpfcp-watermark.image)

## 路由

- [react 路由看这个](https://reactrouter.com/web/example/url-params)

- react 路由系统和 vue 大有不同，没有路由导航前钩子，配置登陆鉴权就要自己配置下，结合 token,
- 我们项目中路由的目的就是支持动态路由，路由权限，配置抽离，目前就是最简单的，裸的

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3559713803e40f8bc317f2346bf5fcd~tplv-k3u1fbpfcp-watermark.image)

## 公共组件封装

- 我们如何封装一个公共组件？

  1， 项目中需要多处使用的组件

  2， 不和业务耦合的组件，业务耦合的公共组件

  3， 所有状态都可以在外部控制，通过传入的 props 来控制其行为而不是暴露其内部结构。

      封装良好的组件隐藏其内部结构，并提供一组属性来控制其行为。

      隐藏内部结构是必要的。其他组件没必要知道或也不依赖组件的内部  结构或实现细节

- 我们的项目中统一目录，主要为了看起来舒服

- 目录：![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fea319b6d14048d3945d25463bb9052e~tplv-k3u1fbpfcp-watermark.image)

  - index.tsx 为主入口文件
  - index.md 为组件使用样例，必要的代码注释，要清楚的告诉别人怎么使用这个公共组件

  - ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4085d4df32040b6b477fa44600df266~tplv-k3u1fbpfcp-watermark.image)

### 如何使用 iconfont 的字体图标

- 封装 icon，主要配合 antd createFromIconfontCN 直接引入 iconfont 中的字体图标，非常方便
- 如下图所示直接登陆到 iconfont 网站生成对应 js 文件，在项目中直接用就好，很简单

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8386955eb62a4dae93e9d2743e47dcec~tplv-k3u1fbpfcp-zoom-1.image)

- classNames 的使用 [npm 介绍](https://www.npmjs.com/package/classnames)

```
  // 简单来说

  // 这里可以根据各属性动态添加，如果属性值为true则为其添加该类名，

  // 如果值为false，则不添加。这样达到了动态添加class的目的

   <FontIcon
      className={classNames(
        {
          [styles.large]: size === "large", // 返回为true使用css .large,下方同理
          [styles.normal]: size === "normal",
          [styles.small]: size === "small",
          [styles.disabled]: disabled,
        },
        className
      )}
      {...restProps}
    />
```

- React.FC<>的使用
  1.React.FC 是函数式组件，是在 TypeScript 使用的一个泛型，FC 就是 FunctionComponent 的缩写，事实上 React.FC 可以写成 React.FunctionComponent：

```
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
```

2.React.FC 包含了 PropsWithChildren 的泛型，不用显式的声明 props.children 的类型。React.FC<> 对于返回类型是显式的，而普通函数版本是隐式的（否则需要附加注释）。

3.React.FC 提供了类型检查和自动完成的静态属性：displayName，propTypes 和 defaultProps（注意：defaultProps 与 React.FC 结合使用会存在一些问题）。

4.我们使用 React.FC 来写 React 组件的时候，是不能用 setState 的，取而代之的是 useState()、useEffect 等 Hook API。

- [上面四点对 React.FC<>介绍的很好原文链接](https://blog.csdn.net/qq_18913129/article/details/105491090)

### 封装 icon 公共组件

```
  // IconType继承React.HTMLAttributes的属性，然后IconType,就拥有了其可被外界访问的属性
  export interface IconType extends React.HTMLAttributes<any> {
  // type 必有属性，如果使用的时候没有静态检查是，会提示错误，类型不匹配，使用ts的好处，静态类型检查非常nice
  // 报错如下：TS2741: Property 'type' is missing in type '{}' but required in type 'IconType'.  index.tsx(7, 3): 'type' is declared here.
  type: string;
  // 图标尺寸，默认 normal
  size?: "small" | "normal" | "large" | null; // 可选属性，size后面加上？
  // 是否禁用
  disabled?: boolean;
}
// createFromIconfontCN 返回一个组件
const FontIcon = createFromIconfontCN({
  // 请给新图标一个合适的驼峰命名，并保证单词正确
  scriptUrl: "//at.alicdn.com/t/font_955172_ymhvgyhjk.js",
});

const Icon: React.FC<IconType> = ({
  className,
  size = "normal",
  disabled,
  ...restProps
}) => {
  // 我们使用classNames 这个插件动态渲染icon的状态，size,disabled等等
  return (
    <FontIcon
      className={classNames(
        {
          [styles.large]: size === "large",
          [styles.normal]: size === "normal",
          [styles.small]: size === "small",
          [styles.disabled]: disabled,
        },
        className
      )}
      {...restProps}
    />
  );
};
// 思考题：这个地方需要用，react.memo吗？
export default React.memo(Icon);

```

- 使用（截图中有 iconSelect 公共组件，此篇不做讲解）

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2791d90704854081b8428157c6f6a76d~tplv-k3u1fbpfcp-watermark.image)

## 权限

- 项目中的权限问题在面试中非常高频，无论是 vue 还是 react，问的你一脸闷逼，千奇百怪，其实按照你项目中答就好，给你出业务场景对应给我你自己的方案就好。没那么玄乎。
- 权限和业务关联非常大，应用场景也比较广泛，pc,app 等等，运用的也比较广泛，你现在在任何商业网站都能看到权限的区分。

- 关于权限的问题，大家也别想太复杂，要根据自己的实际业务出发，去实现登陆权限，路由权限，按钮级别权限
- 本篇教程更多的是给大家提供一个权限的一个思路，如果遇到更加复杂的业务场景对应梳理好然后做出对应的实现就好也可以找我来交流[链接](https://juejin.cn/user/1943592288395479/pins)。

## 权限应用场景

- 用户已登陆权限，token 怎么放，一般是放在 headers 里面，后端怎么处理 token 的过期时间等等，这块就不是我们所关心的，和他们设计有关，我们只需要处理好我们自己
  的业务逻辑就好，是放在浏览器哪个位置，是否需要长期存在，还是浏览器关闭之后就消失，等等。这些都是要和产品方沟通处理的
- 用户未登陆的权限是哪些，表现形式是哪些，可以使用项目中哪些功能等等，触发需要权限的功能时是让弹框提示用户请登录，还是直接跳转到登陆页面，还是弹出一个登陆框让用户直接登陆。
- 路由权限
  路由是否是动态路由，由配置页面生成，路由数据由后端返回，前端动态渲染路由，还是前端写死路由，通过 flag 判断路由是否展示，其次是如果访问到没有权限的路由的时候下一步是做什么，
  是直接跳转到登陆页，移除 token,还是展示一个提示的页面，提示用户没有此权限等等的展示效果，都是暗战你具体的业务场景去做处理的，不同的产品思路去展示就好

```tsx
const PrivateRoute: FC<RouteProps> = (props) => {
  const logged = sessionStorage.getItem("token");
  const history = useHistory();
  // 判断是否有token,如果有就展示，如果没有就不展示路由，展示403页面
  return logged ? (
    <Route {...props} />
  ) : (
    <Result
      status="403"
      title="403"
      subTitle={"无权限"}
      extra={
        <Button type="primary" onClick={() => history.push("/login")}>
          跳转到登陆
        </Button>
      }
    />
  );
};
```

- 角色权限
  - 模块权限有超级管理员，普通管理员，非管理员，访客，等等，每一个角色对应何种权限，有何种功能，以及如何展示，这个和产品业务对接好，对应展示不同权限信息就好。
- 组件权限
  - 组件权限在业务中极少使用，基本和按钮权限类似，是否直接隐藏。还是要看你们项目的具体业务，再去做处理
- 按钮权限

  - 按钮也是一个组件按钮权限基本上是就比较简单了，就是展示不展示，或者说按钮展示，请求接口时，厚度去做判断，该操作是否有权限。

- 下面是我们这个项目的权限处理

```tsx
/**
 * 按钮权限判定
 */
function AuthorizedButton({
  children,
  authority,
  render,
  noMatch,
}: AuthorizedProps) {
  // 目前是写死的按钮权限，真实场景应该会有配置页面，通过接口返回对应权限，然后放到permission中
  const [permissions] = useState<string[]>(["button", "button1", "button2"]);

  const result = checkPermissions(
    authority,
    permissions,
    render ? render() : children,
    noMatch
  );
  return <>{result}</>;
}
```

- 核心逻辑

```tsx | pure
export type IAuthorityType =
  | undefined
  | string
  | string[]
  | Promise<boolean>
  | ((permissions: string[]) => boolean | Promise<boolean>);

/**
 * 通用权限检查方法
 * @param authority - 按钮权限判定
 * @param permissions - 当前权限
 * @param target - 通过的组件
 * @param Exception - 未通过的组件
 */
const checkPermissions = <T, K>(
  authority: IAuthorityType,
  permissions: string[] = [],
  target: T,
  Exception: K
): T | K | React.ReactNode => {
  // 没有判定权限.默认查看所有
  if (!authority) {
    return target;
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (permissions.some((item) => authority.includes(item))) {
      return target;
    }
    if (
      permissions.length > 0 &&
      permissions.every((item) => authority.includes(item))
    ) {
      return target;
    }
    return Exception;
  }
  // string 处理
  if (typeof authority === "string") {
    if (permissions.some((item) => authority === item)) {
      return target;
    }
    return Exception;
  }
  // Promise 处理
  if (authority instanceof Promise) {
    return (
      <PromiseRender<T, K> ok={target} error={Exception} promise={authority} />
    );
  }
  // Function 处理
  if (typeof authority === "function") {
    const promise = authority(permissions);
    // 函数执行后返回值是 Promise
    if ((promise as Promise<boolean>) instanceof Promise) {
      return (
        <PromiseRender<T, K>
          ok={target}
          error={Exception}
          promise={promise as Promise<boolean>}
        />
      );
    }
    if (promise) {
      return target;
    }
    return Exception;
  }
  throw new Error("Unsupported parameters");
};
```

- 页面使用案例

```tsx | pure
import React from "react";
import Authorized from "@/components/Authorized";
// 通用权限包装处理权限的设计一定要和后段确定好，哪些有权限，哪些没有权限，包括路由权限，页面权限，按钮级别权限。
export default function Demo() {
  return (
    <>
      <AuthorizedButton authority="hello">Hello world</AuthorizedButton>
      <AuthorizedButton authority={["hello", "word"]}>
        Hello world
      </AuthorizedButton>
      <AuthorizedButton
        authority={["hello", "word"]}
        render={() => <div>Hello world</div>}
      />
      <AuthorizedButton
        authority={() => true}
        render={() => <div>Hello world</div>}
      />
    </>
  );
}
```

## 与后端对接

- 一般我们都会有权限的配置页面，权限的配置页面可以配置项目的管理员，非管理员权限，以及对应角色所对应的权限，每个权限对应到代码里面，是 1，2，3 也好，还是什么也好你自己和后台处理好就好
- 包括按钮级别，说的天花乱坠，其实按钮也是组件，关键的是你们想怎么展示，有权限的展示，没权限是什么展示，这个没有定论，看你们产品业务心情，你根据业务去做就好了，
  其次就是代码的封装，因为你们配置的权限数据，最后都会要返回到对应项目，还是前端处理的，后端只是一个中转，最后处理数据都是要你自己来的。切勿给自己挖坑。
