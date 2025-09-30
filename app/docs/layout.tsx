import { DocsLayout, type DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { GithubInfo } from 'fumadocs-ui/components/github-info';
import { FaBook, FaHome } from 'react-icons/fa';

import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const options: DocsLayoutProps = {
    ...baseOptions(),
    tree: source.pageTree,
    links: [
      {
        type: 'custom',
        children: <GithubInfo owner='FrexCheat' repo='DevBeginner-Doc' className='lg:-mx-2' />,
      },
      {
        text: '返回首页',
        url: '/',
        icon: <FaHome />,
      },
      {
        text: '软件仓库',
        url: '/mirror',
        icon: <FaBook />,
      },
    ],
  };
  return <DocsLayout {...options}>{children}</DocsLayout>;
}
