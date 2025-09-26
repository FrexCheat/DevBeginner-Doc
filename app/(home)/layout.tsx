import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  const options = { ...baseOptions(), themeSwitch: { enabled: false } };
  return <HomeLayout {...options}>{children}</HomeLayout>;
}
