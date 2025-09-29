import { DocsLayout, type DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { GithubInfo } from 'fumadocs-ui/components/github-info';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const options: DocsLayoutProps = {
    ...baseOptions(),
    tree: source.pageTree,
    links: [
      {
        type: 'custom',
        children: <GithubInfo owner='FrexCheat' repo='DevBeginner-Doc' className='lg:-mx-2' />,
      },
    ],
  };
  return <DocsLayout {...options}>{children}</DocsLayout>;
}
