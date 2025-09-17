"use client"

import gsap from 'gsap';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useGSAP } from '@gsap/react';

export default function HomeHook({ children }: { children: React.ReactNode }) {
  const { setTheme, theme } = useTheme();
  const prevTheme = theme;

  useEffect(() => {
    setTheme("dark");
    return () => {
      if (prevTheme) {
        setTheme(prevTheme);
      }
    };
  }, []);

  useGSAP(() => {
    const timeLine = gsap.timeline();

    timeLine.to(".hero-background", {
      opacity: 0.8,
      duration: 3,
      ease: "power2.out"
    });

    timeLine.to(".hero-logo", {
      scale: 1,
      duration: 2,
      ease: "power2.out"
    }, "<");

    timeLine.to(".hero-button", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.2
    }, "-=1");
  });

  return (<>{children}</>);
}
