import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  const options = {
    ...baseOptions(),
    themeSwitch: { enabled: false },
    links: [
      {
        text: '文档主页',
        url: '/docs',
      },
      {
        text: '软件仓库',
        url: '/mirror',
      },
    ],
  };
  return <HomeLayout {...options}>{children}</HomeLayout>;
}
