import React, { useState } from "react";
import ConfigProvider from "antd/lib/config-provider";
import "antd/dist/antd.less";
import style from "./App.module.less";
import RouterPage from "./router";
import { getLocale, localeInfo, LocaleProvider } from "./components/locales";

/**
 * 入口
 * @constructor
 */
function App() {
  return (
    <div className={style.App}>
      <header className={style.AppHeader}>
        <LocaleProvider>
          <ConfigProvider locale={localeInfo[getLocale()]?.antd}>
            <RouterPage />
          </ConfigProvider>
        </LocaleProvider>
      </header>
    </div>
  );
}

export default App;
