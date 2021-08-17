import React from "react";
import { useLocalStorageState } from "ahooks";
import LoginPassword from "./components/LoginPassword";
import LoginMessage from "./components/LoginMessage";
import styles from "./index.module.less";

const LoginPage: React.FC = () => {
  const [loginWay, setLoginWay] = useLocalStorageState("login__Login__way", "");
  const [way, setWay] = React.useState<string>(loginWay);

  /**
   * 更新登录方式
   * @param name
   */
  function updateWay(name: string) {
    setWay(name);
    setLoginWay(name);
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLogo} />
      <div className={styles.loginForm}>
        {/*{way === "message" ? (*/}
        {/*  <LoginMessage updateWay={updateWay} />*/}
        {/*) : (*/}
        <LoginPassword updateWay={updateWay} />
        {/*)}*/}
      </div>
    </div>
  );
};

export default LoginPage;
