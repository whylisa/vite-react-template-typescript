import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import BaseLayout from '@/layouts/BaseLayout';

export default function AuthRoot() {
  const isLogin = localStorage.getItem('token');
  const navigate = useNavigate();

  if (!isLogin) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="无权限"
        extra={
          <Button type="primary" onClick={() => navigate('/login', { replace: true })}>
            去登录
          </Button>
        }
      />
    );
  }

  return <BaseLayout />;
}
