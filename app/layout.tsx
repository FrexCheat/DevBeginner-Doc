import '@/styles/global.css';
import 'katex/dist/katex.css';

import { RootProvider } from 'fumadocs-ui/provider';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { Inter } from 'next/font/google';

import { i18n } from '@/lib/i18n';

const { provider } = defineI18nUI(i18n, {
  translations: {
    cn: {
      displayName: '简体中文',
      search: '搜索文档',
      searchNoResult: '无搜索结果',
      toc: '本页目录',
      tocNoHeadings: '无目录',
      lastUpdate: '最后更新于',
      chooseLanguage: '选择语言',
      nextPage: '下一页',
      previousPage: '上一页',
      chooseTheme: '选择主题',
      editOnGithub: '在 GitHub 上编辑此页',
    },
  },
});

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="cn" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider i18n={provider('cn')}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
