import React, { useState } from 'react';
import { Tooltip } from 'antd';
import styles from './index.module.less';

const DocPage: React.FC = ({ children }) => {
  return (
    <Tooltip placement="top" color={'red'} title={'谢谢你的关注，你很眼光'}>
      <div className={styles.doc}>
        <div>掘金</div>
        <div>github</div>
        <div>公众号</div>
      </div>
    </Tooltip>
  );
};

export default DocPage;
