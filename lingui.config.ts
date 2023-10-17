import { formatter } from '@lingui/format-json';
import type { LinguiConfig } from '@lingui/conf';

export default {
  locales: ['zh-cn', 'en'],
  sourceLocale: 'zh-cn',
  compileNamespace: 'ts',
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/locales/**/*'],
    },
  ],
  format: formatter({ style: 'minimal' }),
} as LinguiConfig;
