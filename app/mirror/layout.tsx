import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  const options = {
    ...baseOptions(),
    links: [
      {
        text: '返回首页',
        url: '/',
        secondary: false,
      },
      {
        text: '文档主页',
        url: '/docs',
        secondary: false,
      },
      {
        text: '软件仓库',
        url: '/mirror',
        secondary: false,
      },
    ],
  };
  return <HomeLayout {...options}>{children}</HomeLayout>;
}
