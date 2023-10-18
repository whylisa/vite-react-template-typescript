import React from 'react';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import { RouterProvider } from 'react-router-dom';
import { getLocale, locales } from '@/i18n';
import routes from '@/router/routes';
import style from './App.module.less';

/**
 * 入口
 */
function App() {
  return (
    <div className={style.app}>
      <header className={style.appHeader}>
        <ConfigProvider locale={locales[getLocale()]?.antd}>
          <RouterProvider router={routes} />
        </ConfigProvider>
      </header>
    </div>
  );
}

export default App;
