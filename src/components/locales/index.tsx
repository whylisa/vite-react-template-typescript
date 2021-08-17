import React from "react";
import type { IntlShape } from "react-intl";
import { createIntl, IntlProvider } from "react-intl";
// 我们需要引入antd 的国际化的配置
import antdEnUS from "antd/lib/locale/en_US";
import antdZhCN from "antd/lib/locale/zh_CN";
// 这是我们项目中中英文的配置，
import enLn from "./components/ln-en";
import zhLn from "./components/ln-zh-cn";

let gIntl: IntlShape;
// 默认语言
let defaultLanguage = "zh-cn";
// 当前使用的语言
const currentLocalName = localStorage.getItem("why__locale") || defaultLanguage;

// 本地未存储语言配置，默认添加一个
if (!localStorage.getItem("why__locale")) {
  localStorage.setItem("why__locale", defaultLanguage);
}

/**
 * 本地默认的语言配置
 */
export const localeInfo: Record<string, any> = {
  en: {
    messages: enLn,
    locale: "en",
    antd: antdEnUS,
    momentLocale: "",
  },
  "zh-cn": {
    messages: zhLn,
    locale: "zh-cn",
    antd: antdZhCN,
    momentLocale: "zh-cn",
  },
};

// 当前使用的localeInfo
const currentLocaleInfo = localeInfo[defaultLanguage];
/**
 * 设置默认语言
 * @param lang
 */
function setDefaultLanguage(lang: string) {
  defaultLanguage = lang;
}

/**
 * 包裹了默认 locale 的 Provider
 * LocaleProvider 需要在App.tx使用，包装整个项目
 * @param props
 * @returns
 */
export const LocaleProvider: React.FC = (props) => {
  return <IntlProvider locale={getLocale()}>{props.children}</IntlProvider>;
};

/**
 * 获取当前的 intl 对象，可以在 node 中使用
 * @param locale 需要切换的语言类型
 * @param changeIntl 是否不使用 g_intl
 * @returns IntlShape
 */
const getIntl = (locale?: string, changeIntl?: boolean) => {
  // 如果全局的 g_intl 存在，且不是 setIntl 调用
  if (gIntl && !changeIntl && !locale) {
    return gIntl;
  }
  // 如果存在于 localeInfo 中
  if (locale && localeInfo[locale]) {
    return createIntl(localeInfo[locale]);
  }

  // 使用默认语言
  if (localeInfo[defaultLanguage])
    return createIntl(localeInfo[defaultLanguage]);
  // 使用 zh-CN
  if (localeInfo["zh-cn"]) return createIntl(localeInfo["zh-cn"]);
  // 抛错
  if (!locale || !!localeInfo[locale]) {
    throw new Error(
      "The current popular language does not exist, please check the locales folder!"
    );
  }
  // 如果还没有，返回一个空的
  return createIntl({
    locale: "zh-cn",
    messages: {},
  });
};

/**
 * 切换全局的 intl 的设置
 * @param locale 语言的 key
 */
const setIntl = (locale: string) => {
  gIntl = getIntl(locale, true);
};

/**
 * 获取当前选择的语言
 * @returns string
 */
export function getLocale() {
  return currentLocalName;
}

/**
 * 切换语言
 * @param lang 语言的 key
 * @returns string
 */
export const setLocale = (lang: string) => {
  // if (getStorageLocale() !== lang) {
  if (typeof window.localStorage !== "undefined") {
    window.localStorage.setItem("why__locale", lang || "");
  }
  window.location.reload();
  // }
};

interface MessageDescriptor {
  id?: string;
  description?: string | any;
  defaultMessage?: string;
}

/**
 * 语言转换
 * @param descriptor
 * @param values
 */
export const formatMessage = (
  descriptor: MessageDescriptor,
  values?: Record<string, any>
) => {
  if (!gIntl) {
    setIntl(getLocale());
  }
  return gIntl.formatMessage(descriptor, values);
};

/**
 * 获取当前使用的语言信息
 * @returns
 */
export const getLocaleInfo = () => {
  return currentLocaleInfo;
};

export { createIntl };
