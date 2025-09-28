'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';

import './_styles/home.css';
import { GITHUB_URL } from '@/lib/constants';
import { useHomeHook } from './_hooks/useHomeHook';
import { HeroLinear } from './_components/HeroLinear';

export default function HomePage() {
  useHomeHook();
  return (
    <main className='absolute inset-0 flex flex-col items-center justify-center overflow-hidden'>
      <div className='hero-background absolute inset-0 -z-1' />
      {/* Path Animation */}
      <div className='relative mt-5 flex h-[400px] w-[1640px] flex-row items-center justify-center'>
        <HeroLinear />
        <Image
          className='hero-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:size-76 md:size-80 lg:size-96'
          src='/assets/hero-logo.svg'
          priority={true}
          alt='Hero Logo'
          width={304}
          height={304}
        />
      </div>
      {/* Button Group */}
      <div className='flex flex-row flex-wrap items-center justify-between gap-3'>
        <Link href='/docs'>
          <button className='hero-button'>开 始 阅 读</button>
        </Link>
        <Link href={GITHUB_URL} target='_blank' rel='noopener noreferrer'>
          <button className='hero-button'>
            <FaGithub size='1.3em' />
            GitHub
          </button>
        </Link>
      </div>
    </main>
  );
}
