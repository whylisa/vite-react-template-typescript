## Icon

`SVG` 图标，图标源地址： [https://www.iconfont.cn](https://www.iconfont.cn)

**注意：上传图标时，请给一个合适的名字，并保证单词正确**

```tsx
import React from "react";
import { Space } from "antd";
import Icon from "@/components/Icon";

export default () => (
  <Space>
    <Icon type="icon-check" />
  </Space>
);
```

```tsx
/**
 * title: large
 */

import React from "react";
import { Space } from "antd";
import { useIntl } from "umi";
import styled from "styled-components";
import Icon from "@/components/Icon";

const Delete = styled.div`
  color: palevioletred;
`;

export default () => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <Delete>
        <Space>
          <Icon type="icon-close-circle-fill" size="large" />
          <span>{formatMessage({ id: "delete" })}</span>
        </Space>
      </Delete>

      <Space>
        <Icon type="icon-download" size="large" />
        <span>{formatMessage({ id: "download" })}</span>
      </Space>
    </div>
  );
};
```
