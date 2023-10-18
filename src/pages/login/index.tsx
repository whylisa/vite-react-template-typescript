import React from 'react';
import LoginPassword from './components/LoginPassword';
import styles from './index.module.less';

export const Component: React.FC = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLogo} />
      <LoginPassword />
    </div>
  );
};
