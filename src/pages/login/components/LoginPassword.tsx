import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import type { LoginParams } from '@/services/login';
import { loginApp } from '@/services/login';
import styles from './LoginPassword.module.less';

/**
 * 密码登录
 */
const LoginPassword: React.FC = () => {
  const navigate = useNavigate();

  async function handleFinish(data: LoginParams) {
    const res = await loginApp(data);

    if (res.code === 200) {
      sessionStorage.setItem('token', res.token);
      navigate('/home', { replace: true });
      return;
    }
    message.error('用户名或密码错误！');
  }

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.loginTitle}>登录</div>
      </div>
      <Form onFinish={handleFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '用户名/手机号/邮箱不能为空' }]}
        >
          <Input placeholder={'用户名/手机号/邮箱'} maxLength={128} size="large" />
        </Form.Item>
        <Form.Item name="user_check" rules={[{ required: true, message: '密码不能为空' }]}>
          <Input type="password" placeholder="密码" maxLength={128} size="large" />
        </Form.Item>
        <div className={styles.toolBox}>
          <Link to="/forget-password" style={{ width: 100, textAlign: 'right' }}>
            忘记密码
          </Link>
        </div>
        <Button className={styles.loginButton} type="primary" htmlType="submit" size="large" block>
          登录
        </Button>
        <div className={styles.register}>
          <Link to="/register">注册</Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginPassword;
