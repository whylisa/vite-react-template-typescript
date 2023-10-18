import { useLocalStorageState } from 'ahooks';
import { LOCALE_KEY } from '@/config';
import { dynamicActivateFrom } from '@/i18n';

export default function useLocale() {
  const [loacle, setLocale] = useLocalStorageState(LOCALE_KEY, {
    defaultValue: 'zh-cn',
  });

  return [
    loacle,
    (next: string) => {
      setLocale(next);
      dynamicActivateFrom(next);
    },
  ] as const;
}
