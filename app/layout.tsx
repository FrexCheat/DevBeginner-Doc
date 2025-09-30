import '@/app/global.css';
import 'katex/dist/katex.css';

import { RootProvider } from 'fumadocs-ui/provider';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { Inter } from 'next/font/google';

import { i18n } from '@/lib/i18n';
import SearchDialog from '@/components/search';

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
    <html lang='cn' className={inter.className} suppressHydrationWarning>
      <head>
        <title>DevBeginner Doc</title>
        {/* <link rel='icon' href='/favicon.png' /> */}
        <link rel='preload' as='image' href='/assets/hero-logo.svg' />
        <meta name='description' content='DevBeginner 文档' />
        <meta name='keywords' content='DevBeginner, 文档, 教程, 指南' />
        <meta name='og:title' content='DevBeginner Doc' />
        <meta name='og:site_name' content='DevBeginner Doc' />
        <meta name='og:locale' content='zh_CN' />
      </head>
      <body className='flex min-h-screen flex-col'>
        <RootProvider i18n={provider('cn')} search={{ SearchDialog }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
