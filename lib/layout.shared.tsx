import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <>DevBeginner Doc</>,
    },
    githubUrl: 'https://github.com/FrexCheat/DevBeginner-Doc',
    links: [],
  };
}
