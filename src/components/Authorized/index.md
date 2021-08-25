## Authorized

通用权限包装处理

**根据 `global.ts` 数据层中的 `permissions` 来判定当前操作的权限（`permissions` 暂未实现）**。

参数 `authority` 支持 `string` `Array` `function`。若为 `function` 时则需返回 `boolean` 类型。

```tsx | pure
import React from "react";
import Authorized from "@/components/Authorized";

export default function Demo() {
  return (
    <>
      <Authorized authority="hello">Hello world</Authorized>
      <Authorized authority={["hello", "word"]}>Hello world</Authorized>
      <Authorized
        authority={["hello", "word"]}
        term="OR"
        render={() => <div>Hello world</div>}
      />
      <Authorized
        authority={() => true}
        render={() => <div>Hello world</div>}
      />
    </>
  );
}
```
