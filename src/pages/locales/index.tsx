import React from "react";
import styles from "./index.module.less";
import { Card, Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio/interface";
import { formatMessage, setLocale } from "../../components/locales";

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

export default LocalePage;
