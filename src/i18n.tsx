import { i18n } from '@lingui/core';

export async function dynamicActivateFrom(locale: string) {
  const messages = await import(`./locales/${locale}/messages.ts`).then(({ messages }) => messages);

  i18n.load(locale, messages);
  i18n.activate(locale);
}

const defaultLocale = localStorage.getItem('locale') || 'zh-cn';

await dynamicActivateFrom(defaultLocale);
