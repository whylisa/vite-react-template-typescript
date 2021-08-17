import React from "react";
import { Popover } from "antd";
import { useActivate, useUnactivate } from "react-activation";
import classNames from "classnames";
import { PopoverProps } from "antd/es/popover";
import styles from "./PopoverMenu.module.less";

export interface PopoverMenuProps
  extends Omit<PopoverProps, "overlayClassName" | "overlay"> {
  zIndex?: number;
  content: React.ReactNode;
}

/**
 * 具有选项条的 Popover
 */
function PopoverMenu({ zIndex, content, ...props }: PopoverMenuProps) {
  const [canRender, setCanRender] = React.useState(true);

  useActivate(() => {
    setCanRender(true);
  });

  useUnactivate(() => {
    setCanRender(false);
  });

  if (!canRender) {
    return null;
  }

  return (
    <Popover
      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
      overlayClassName={styles.menuContent}
      overlayStyle={{ zIndex }}
      {...props}
      content={<ul className={styles.menuList}>{content}</ul>}
    />
  );
}

export interface PopoverMenuItemProps extends React.LiHTMLAttributes<any> {
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * PopoverMenu 单条
 */
export function PopoverMenuItem({
  disabled,
  title,
  children,
  className,
  ...props
}: PopoverMenuItemProps) {
  return (
    <li
      className={classNames(
        styles.menuItem,
        { [styles.disabled]: disabled },
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
}

export default PopoverMenu;
