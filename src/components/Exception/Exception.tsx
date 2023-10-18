import React from 'react';
import { Button } from 'antd';
import { Trans } from '@lingui/macro';
import typeConfig from './typeConfig';
import styles from './Exception.module.less';

interface IException {
  type?: string;
  title?: string;
  description?: React.ReactNode;
}

const Exception: React.FC<IException> = ({ type = '404', title, description }) => (
  <section className={styles.exceptionContainer}>
    <div className={styles.exceptionContainer}>
      <h1 className={styles.h1}>{title || typeConfig[type].title}</h1>
      <div className={styles.description}>{description || typeConfig[type].desc}</div>
      <a href="/">
        <Button type="primary">
          <Trans>首页</Trans>
        </Button>
      </a>
    </div>
  </section>
);

export default Exception;
