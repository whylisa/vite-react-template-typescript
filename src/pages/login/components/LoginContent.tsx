import { formatMessage } from "@/components/locales";
import React from "react";
import styles from "../index.module.less";

/**
 * 登录、注册等页面的公共组件
 */
interface ILoginContent {
  loginTitle: string;
  changeWay: React.ReactNode;
}

const LoginContent: React.FC<ILoginContent> = ({ loginTitle, changeWay }) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.loginTitle}>
            {formatMessage({ id: loginTitle })}
          </div>
          {changeWay}
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
