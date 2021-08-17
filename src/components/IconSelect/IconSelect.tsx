import React from "react";
import { Input } from "antd";
import classNames from "classnames";
import { InputProps } from "antd/es/input";
import Icon from "../Icon";
import PopoverMenu from "../PopoverMenu";
import { iconList } from "./utils";
import styles from "./IconSelect.module.less";

// Omit表示忽略掉InputProps接口中的value,onChange,readOnly属性
// https://juejin.cn/post/6893071406481801224#heading-14
export interface IconSelectProps
  extends Omit<InputProps, "value" | "onChange" | "readOnly"> {
  // 受控属性
  value?: string;
  // 受控属性
  onChange?: (value: any) => void;
  // 容器位置
  getPopupContainer?: (props: any) => HTMLElement;
}

/**
 * 图标选择表单
 */
function IconSelect({
  value,
  onChange,
  disabled,
  getPopupContainer,
  ...props
}: IconSelectProps) {
  const [visible, setVisible] = React.useState(false);

  function handleSelectIcon(item: string) {
    if (onChange) {
      onChange(item);
    }
    setVisible(false);
  }

  return (
    <PopoverMenu
      trigger={["click"]}
      visible={visible}
      onVisibleChange={!disabled ? setVisible : undefined}
      placement="bottomLeft"
      getPopupContainer={getPopupContainer}
      content={
        <div className={styles.selectWrap}>
          {iconList.map((item) => (
            <Icon
              key={item}
              className={classNames(styles.iconItem, {
                [styles.active]: value === item,
              })}
              type={`icon-${item}`}
              onClick={() => handleSelectIcon(item)}
            />
          ))}
        </div>
      }
    >
      <Input
        placeholder={value ? undefined : "请选择"}
        suffix={<Icon className={styles.filterIcon} type="icon-down" />}
        prefix={
          value && <Icon className={styles.iconValue} type={`icon-${value}`} />
        }
        disabled={disabled}
        readOnly
        {...props}
      />
    </PopoverMenu>
  );
}

export default IconSelect;
