import Icon from "../../components/Icon";
import React, { useState } from "react";
import styles from "./index.module.less";
import { Button, message, Space } from "antd";
import { useStore } from "rediaox";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const CustomPage: React.FC = ({ children }) => {
  const [state, actions] = useStore({
    state: {
      count: 0,
    },
    reducers: {
      // 特性1：修改 draft
      increment(draft) {
        draft.count += 1;
      },
      // 特性2：返回新状态
      decrement(draft) {
        return {
          count: draft.count - 1,
        };
      },
      // 特性3：方法参数
      add(draft, count: number) {
        draft.count += count;
      },
      // 特性4：调用其他 reducer
      callOtherReducer(draft) {
        this.add(draft, 10);
        draft.count += 10;
      },
      reset() {
        return {
          count: 0,
        };
      },
    },
  });
  async function asyncExecute() {
    await sleep(1000);
    actions.increment();
    message.success("执行成功");
  }

  return (
    <Space>
      count: <strong>{state.count}</strong>
      <Button onClick={actions.increment}>增加</Button>
      <Button onClick={actions.decrement}>减少</Button>
      <Button onClick={() => actions.add(2)}>加2</Button>
      <Button onClick={actions.reset}>重置</Button>
      <Button type="primary" onClick={asyncExecute}>
        异步增加
      </Button>
    </Space>
  );
};

export default CustomPage;
