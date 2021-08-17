import React from "react";
import { Form, Button } from "antd";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";
import styles from "../index.module.less";
import { formatMessage } from "../../../components/locales";

/**
 * 验证码登录
 */

export interface ILoginParams {
  updateWay: (name: string) => void;
}

const LoginMessage: React.FC<ILoginParams> = ({ updateWay }) => {
  const [form] = Form.useForm();
  function handleFinish(data: { [name: string]: any }) {
    // 避免接口报错后无法正常登录的问题
  }

  /**
   * 切换登录方式
   */
  function handleClick() {
    updateWay("pwd");
  }

  /**
   * 手机号前面的区号，目前写死，暂时不用
   */
  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select className={styles.phoneSelect} style={{ width: 70 }} bordered={false}>
  //       <Option value="86">+86</Option>
  //     </Select>
  //   </Form.Item>
  // );

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.loginTitle}>
          {formatMessage({ id: "loginBtn" })}
        </div>
        <div
          onClick={handleClick}
          className={styles.changeWay}
          style={{ width: 136, textAlign: "right" }}
        >
          {formatMessage({ id: "passwordLogin" })}
        </div>
      </div>
      <Form form={form} onFinish={handleFinish}>
        <CountDown form={form} type="LOGIN" />
        <Button
          className={styles.loginButton}
          type="primary"
          htmlType="submit"
          loading={false}
          size="large"
          block
        >
          {formatMessage({ id: "LogIn" })}
        </Button>
        <div className={styles.register}>
          <Link to="/register">
            {formatMessage({ id: "registeredAccount" })}
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginMessage;
