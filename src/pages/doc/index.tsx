import React from 'react';
import { Tooltip } from 'antd';
import { t } from '@lingui/macro';
import styles from './index.module.less';

export const Component = () => {
  return (
    <Tooltip placement="top" color="red" title={t`谢谢你的关注，你很眼光`}>
      <div className={styles.doc}>
        <div>掘金</div>
        <div>github</div>
        <div>公众号</div>
      </div>
    </Tooltip>
  );
};
