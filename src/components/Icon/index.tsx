import React from "react";
import classNames from "classnames";
import { createFromIconfontCN } from "@ant-design/icons";
import styles from "./Icon.module.less";

export interface IconType extends React.HTMLAttributes<any> {
  type: string;
  // 图标尺寸，默认 normal
  size?: "small" | "normal" | "large" | null;
  // 是否禁用
  disabled?: boolean;
}

const FontIcon = createFromIconfontCN({
  // 请给新图标一个合适的驼峰命名，并保证单词正确
  scriptUrl: "//at.alicdn.com/t/font_2742219_5q5w02ov9d4.js",
});

const Icon: React.FC<IconType> = ({
  className,
  size = "normal",
  disabled,
  ...restProps
}) => {
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

export default React.memo(Icon);
