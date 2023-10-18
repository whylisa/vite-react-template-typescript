import React from 'react';
import { Button } from 'antd';
import { AuthorizedButton } from '@/components/Authorized';
import styles from './index.module.less';

export function Component() {
  return (
    <>
      <div className={styles.noAuth}>
        <span>无权限内容不展示</span>
        <AuthorizedButton authority="hello">Hello world</AuthorizedButton>
        <AuthorizedButton authority={['hello', 'word']}>Hello world</AuthorizedButton>
        <AuthorizedButton authority={['hello', 'word']} render={() => <div>Hello world</div>} />
      </div>
      <div className={styles.hasAuth}>
        <div>有权限展示</div>
        <AuthorizedButton authority="button">
          <Button>button1</Button>
        </AuthorizedButton>
        <AuthorizedButton authority={['button', 'button1']}>
          <Button>button1</Button>
          <Button>button2</Button>
        </AuthorizedButton>
        <AuthorizedButton authority={['button1', 'button2']} render={() => <div>渲染组件</div>} />
      </div>
    </>
  );
}
