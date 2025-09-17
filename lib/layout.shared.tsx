import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src="/logo.svg" alt="Logo" width={30} height={30} />
          DevBeginner Doc
        </>
      ),
    },
    githubUrl: 'https://github.com/FrexCheat/DevBeginner-Doc',
    links: [],
  };
}
