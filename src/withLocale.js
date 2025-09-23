import { createWithIntlProvider } from '@kne/react-intl';
import enUS from './locale/en-US';
import zhCN from './locale/zh-CN';

export default createWithIntlProvider({
  defaultLocale: 'zh-CN',
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN
  },
  namespace: 'app-children-router'
});
