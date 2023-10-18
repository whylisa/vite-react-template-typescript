import React from 'react';
import Icon from '../../components/Icon';
import styles from './index.module.less';
import IconSelect from '../../components/IconSelect';

export function Component() {
  return (
    <div>
      <div className={styles.iconHeader}>antd 配合iconfont 使用</div>
      <div className={styles.iconBody}>
        <div className={styles.iconItem}>
          <Icon type="icon-English" size="large" />
          <span>English</span>
        </div>
        <div className={styles.iconItem}>
          <Icon type="icon-Chinese" size="large" />
          <span>Chinese</span>
        </div>

        <div className={styles.iconItem}>
          <Icon type="icon-check" size="large" />
          <span>check</span>
        </div>

        <div className={styles.iconItem}>
          <Icon type="icon-close" size="large" />
          <span>close</span>
        </div>

        <div className={styles.iconItem}>
          <Icon type="icon-reload" size="large" />
          <span>reload</span>
        </div>

        <div className={styles.iconItem}>
          <Icon type="icon-menu" size="large" />
          <span>menu</span>
        </div>

        <div className={styles.iconItem}>
          <Icon type="icon-table" size="large" />
          <span>table</span>
        </div>
        <div className={styles.iconItem}>
          <Icon type="icon-folder" size="large" />
          <span>folder</span>
        </div>

        <div className={styles.iconItem}>
          <Icon type="icon-message" size="large" />
          <span>message</span>
        </div>

        <div className={styles.iconItem}>
          <Icon type="icon-copy" size="large" />
          <span>copy</span>
        </div>

        <div className={styles.iconItem}>
          <Icon type="icon-user-space" size="large" />
          <span>user-space</span>
        </div>

        <div className={styles.iconItem}>
          <Icon type="icon-number" size="large" />
          <span>number</span>
        </div>

        <div className={styles.iconItem}>
          <Icon type="icon-circle" size="large" />
          <span>circle</span>
        </div>

        <div className={styles.iconItem}>
          <Icon type="icon-publish" size="large" />
          <span>publish</span>
        </div>

        <div className={styles.iconItem}>
          <Icon type="icon-empty" size="large" />
          <span>empty</span>
        </div>
      </div>
      <div>
        <IconSelect />
      </div>
    </div>
  );
}
