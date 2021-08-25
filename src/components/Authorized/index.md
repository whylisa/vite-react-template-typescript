## Authorized

通用权限包装处理
权限的设计一定要和后段确定好，哪些有权限，哪些没有权限，包括路由权限，页面权限，按钮级别权限。
参数 `authority` 支持 `string` `Array` `function`。若为 `function` 时则需返回 `boolean` 类型。

## 按钮级别权限判断

```tsx | pure
import React from "react";
import Authorized from "@/components/Authorized";

export default function Demo() {
  return (
    <>
      <AuthorizedButton authority="hello">Hello world</AuthorizedButton>
      <AuthorizedButton authority={["hello", "word"]}>
        Hello world
      </AuthorizedButton>
      <AuthorizedButton
        authority={["hello", "word"]}
        term="OR"
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
