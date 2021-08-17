## IconSelect

图标选择器，可结合 `Form` 使用

```tsx
import React from "react";
import { Form } from "antd";
import IconSelect from "@/components/IconSelect";

export default () => {
  return (
    <Form>
      <Form.Item name="icon">
        <IconSelect />
      </Form.Item>
    </Form>
  );
};
```
