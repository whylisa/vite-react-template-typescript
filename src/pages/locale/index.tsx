import React from 'react';
import { Card, Radio } from 'antd';
import { Trans } from '@lingui/macro';
import useLocale from '@/hooks/useLocale';
import styles from './index.module.less';

/**
 * 国际化页面
 * @constructor
 */
export function Component() {
  const [locale, setLocale] = useLocale();

  return (
    <Card title={<Trans>切换语言</Trans>} style={{ width: '500px' }}>
      <Radio.Group onChange={(e) => setLocale(e.target.value)} value={locale}>
        <Radio value={'zh-cn'}>
          <Trans>中文</Trans>
        </Radio>
        <Radio value={'en'}>
          <Trans>英文</Trans>
        </Radio>
      </Radio.Group>
      <div className={styles.localLan}>
        <Trans>本项目国际化基于</Trans> lingui-js
      </div>
    </Card>
  );
}
