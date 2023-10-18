import { i18n } from '@lingui/core';
import antdEnUS from 'antd/es/locale/en_US';
import antdZhCN from 'antd/es/locale/zh_CN';
import { LOCALE_KEY } from '@/config';

export const locales = {
  'zh-cn': {
    antd: antdZhCN,
  },
  en: {
    antd: antdEnUS,
  },
};

export function getLocale() {
  try {
    return JSON.parse(localStorage.getItem(LOCALE_KEY) || '"zh-cn"');
  } catch {
    return 'zh-cn';
  }
}

export async function dynamicActivateFrom(locale: string) {
  const localeMessages = await import(`./locales/${locale}/messages.ts`).then(
    ({ messages }) => messages,
  );

  i18n.load(locale, localeMessages);
  i18n.activate(locale);
}

const defaultLocale = localStorage.getItem('locale') || 'zh-cn';

await dynamicActivateFrom(defaultLocale);
