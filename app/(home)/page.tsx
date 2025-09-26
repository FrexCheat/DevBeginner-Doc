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
    <main className='absolute inset-0 overflow-hidden flex flex-col justify-center items-center'>
      <div className='hero-background absolute inset-0 -z-1' />
      {/* Path Animation */}
      <div className='relative w-[1640px] h-[400px] mt-5 flex flex-row justify-center items-center'>
        <HeroLinear />
        <Image
          className='hero-logo sm:size-76 md:size-80 lg:size-96 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          src='/hero-logo.svg'
          priority={true}
          alt='Hero Logo'
          width={304}
          height={304}
        />
      </div>
      {/* Button Group */}
      <div className='flex flex-row flex-wrap gap-3 justify-between items-center'>
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
