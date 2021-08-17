## PopoverMenu

类似 `Dropdown`，基于 `Popover` 实现。与 `Dropdown` 有着细微的区别

1. `Dropdown` 不支持各方向展现
2. `Dropdown` 中 `Menu` 的自节点无法自定义

```tsx
import React from "react";
import Icon from "@/components/Icon";
import PopoverMenu, { PopoverMenuItem } from "@/components/PopoverMenu";

export default () => {
  return (
    <PopoverMenu
      placement="right"
      content={
        <>
          <PopoverMenuItem>
            <Icon type="icon-move" />
            {formatMessage({ id: "batchMove" })}
          </PopoverMenuItem>

          <PopoverMenuItem disabled>
            <Icon type="icon-delete" />
            {formatMessage({ id: "batchDelete" })}
          </PopoverMenuItem>
        </>
      }
    >
      Hover
    </PopoverMenu>
  );
};
```
