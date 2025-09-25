import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import HomeHook from './_hooks/home';

export default function Layout({ children }: LayoutProps<'/'>) {
  const options = { ...baseOptions(), themeSwitch: { enabled: false } };
  return <HomeHook><HomeLayout {...options}>{children}</HomeLayout></HomeHook>;
}
