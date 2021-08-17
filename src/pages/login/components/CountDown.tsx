import React, { useState } from "react";
import { Button, Col, Form, Input, notification, Row, message } from "antd";
import classNames from "classnames";
import { FormInstance } from "antd/es/form";
import messageStyles from "./LoginMessage.module.less";
import styles from "../index.module.less";
import { formatMessage } from "../../../components/locales";
import { useInterval } from "ahooks";

interface ICountDownParams {
  type: "LOGIN" | "REG" | "PWD"; // 类型（登录LOGIN/注册REG/找回密码PWD）
  form: FormInstance;
  invitation?: boolean; // 是否有邀请码，默认没有
}

const CountDown: React.FC<ICountDownParams> = ({
  type,
  form,
  invitation = false,
}) => {
  const prefixSpan = (
    <Form.Item name="prefix" noStyle>
      <span>+86</span>
    </Form.Item>
  );

  // 验证码描述
  const [des, setDes] = useState("获取验证码");
  // 控制按钮是否可以点击
  const [click, setClick] = useState(true);

  /**
   * 倒计时
   */
  const [count, setCount] = useState(60);
  const [delay, setDelay] = useState<number | null>(null);
  useInterval(() => {
    setCount(count - 1);
    setDes(`${"重置"}(${count} s)`);
    if (count <= 0) {
      setCount(60);
      setDes("获取验证码");
      setDelay(null);
      setClick(true);
    }
  }, delay);

  /**
   * 发送验证码
   */
  function sendCode() {
    form
      .validateFields(["phone", "invitation_code"])
      .then((data: { [name: string]: any }) => {
        setDes(formatMessage({ id: "sending" }));
        setClick(false);
        // getCode({
        //   phone: data.phone,
        //   invitation_code: data.invitation_code,
        //   type,
        // })
        //   .then((res) => {
        //     // 0: 错误  1： 正确
        //     if (res.success === "1") {
        //       setDelay(1000);
        //       message.success(formatMessage({ id: "SMSSend" }));
        //     } else {
        //       setDes(formatMessage({ id: "getCaptcha" }));
        //       setDelay(null);
        //       setClick(true);
        //       notification.error({
        //         message: formatMessage({ id: res.msg }),
        //       });
        //     }
        //   })
        //   .catch(() => {
        //     setDelay(null);
        //   });
      });
  }

  return (
    <>
      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: formatMessage({ id: "PhoneEmpty" }),
          },
          {
            message: formatMessage({ id: "inputPhone" }),
            pattern: /^1[3456789]\d{9}$/,
          },
        ]}
      >
        <Input
          className={classNames(styles.noLeftBorder, styles.phoneInput)}
          placeholder={formatMessage({ id: "Phone" })}
          addonBefore={prefixSpan}
          style={{ width: "100%" }}
          size="large"
        />
      </Form.Item>
      {invitation ? (
        <Form.Item
          name="invitation_code"
          rules={[
            {
              required: true,
              message: formatMessage({ id: "invitationCodeNull" }),
            },
          ]}
        >
          <Input
            className={styles.input}
            placeholder={formatMessage({ id: "invitationCodeS" })}
            maxLength={6}
            size="large"
          />
        </Form.Item>
      ) : (
        ""
      )}
      <Form.Item
        name="check_code"
        rules={[
          { required: true, message: formatMessage({ id: "messageNull" }) },
        ]}
      >
        <Row gutter={6}>
          <Col className="gutter-row" span={14}>
            <Input
              className={messageStyles.input}
              placeholder={formatMessage({ id: "messageNumber" })}
              maxLength={128}
              size="large"
            />
          </Col>
          <Col className="gutter-row" span={10}>
            <Button
              className={messageStyles.button}
              disabled={!click}
              block
              onClick={sendCode}
            >
              {des}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </>
  );
};

export default CountDown;
