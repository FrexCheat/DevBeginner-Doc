'use client';

import gsap from 'gsap';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useGSAP } from '@gsap/react';

export default function HomeHook({ children }: { children: React.ReactNode }) {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    document.documentElement.style.setProperty('color-scheme', 'dark');
    return () => {
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.style.setProperty('color-scheme', 'light');
        setTheme(theme);
      }
    };
  });

  useGSAP(() => {
    const timeLine = gsap.timeline();
    timeLine
      .to(
        '.hero-background',
        {
          opacity: 0.8,
          duration: 2,
          ease: 'power2.out',
        },
        '-=0.1'
      )
      .to(
        '.hero-logo',
        {
          scale: 1,
          duration: 2,
          ease: 'power2.out',
        },
        '<'
      )
      .to(
        '.hero-button',
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=1'
      )
      .to(
        '#nd-nav',
        {
          transform: 'translateY(0)',
          duration: 1,
          ease: 'power2.out',
        },
        '<'
      );
  });

  return <>{children}</>;
}
