import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          DevBeginner Doc
        </>
      ),
    },
    githubUrl: 'https://github.com/FrexCheat/DevBeginner-Doc',
    links: [],
  };
}
