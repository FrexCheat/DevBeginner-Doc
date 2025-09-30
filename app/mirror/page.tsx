'use client';
import { useState, useMemo } from 'react';
import { useTitle } from 'react-use';
import GoCaptcha from 'go-captcha-react';
import { Toaster } from 'react-hot-toast';
import { Database, HardDrive } from 'lucide-react';

import Loading from '@/components/HomePage/Loading';
import Popper from '@/components/HomePage/Popper';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import './_styles/mirror.css';
import FilesList from './_components/FilesList';
import { useMirrorDownload } from './_hooks/useMirrorDownload';
import type { OriginBadgeProps } from './_libs/type';

export default function MirrorPage() {
  const {
    files,
    loading,
    error,
    downloadOrigin,
    captchaData,
    isPopperOpen,
    handleDownloadClick,
    refreshCaptcha,
    submitCaptcha,
    resetDownloadState,
  } = useMirrorDownload();

  const [currentCategory, setCurrentCategory] = useState('all');

  const currentFileList = useMemo(() => {
    if (!files) return [];
    if (currentCategory === 'all') return files;
    return files.filter((file) => file.catagory.toLowerCase().includes(currentCategory));
  }, [files, currentCategory]);

  const captchaEvents = {
    refresh: refreshCaptcha,
    confirm: (dots: Array<{ x: number; y: number }>) => {
      if (captchaData) {
        submitCaptcha(captchaData.id, dots);
      }
    },
  };

  const oneTabChange = (value: string) => {
    setCurrentCategory(value);
  };

  const OriginBadge: React.FC<OriginBadgeProps> = ({ origin, className }) => {
    let displayText = 'Unknown Source';
    let badgeClass = 'bg-gray-600 text-white dark:bg-gray-800';
    let icon: React.ReactNode = null;
    if (origin === 's3') {
      icon = <Database />;
      displayText = 'Source from [OSS Server]';
      badgeClass = 'bg-green-600 text-white dark:bg-green-800';
    } else if (origin === 'local') {
      icon = <HardDrive />;
      displayText = 'Source from [Local Server]';
      badgeClass = 'bg-yellow-600 text-white dark:bg-yellow-700';
    }
    return (
      <Badge className={`${badgeClass} ${className}`} variant='secondary'>
        {icon}
        {displayText}
      </Badge>
    );
  };

  useTitle('软件仓库 - DevBeginner-Doc');

  return (
    <main className='flex flex-1 flex-col items-center pb-8'>
      <Toaster />
      <h1 className='mt-3 mb-2 text-2xl font-bold'>DevBeginner-Doc 软件仓库</h1>
      <OriginBadge origin={downloadOrigin} className='text-sm' />
      <Tabs className='mt-3 mb-8' defaultValue='all' onValueChange={oneTabChange}>
        <TabsList>
          <TabsTrigger value='all'>全部</TabsTrigger>
          <TabsTrigger value='ide'>IDE</TabsTrigger>
          <TabsTrigger value='tools'>工具链</TabsTrigger>
          <TabsTrigger value='misc'>其他</TabsTrigger>
        </TabsList>
      </Tabs>
      {loading || error ? <Loading /> : <FilesList files={currentFileList} onDownload={handleDownloadClick} />}
      <Popper isOpen={isPopperOpen} onClose={() => resetDownloadState()} title='确认您是否是人类'>
        {captchaData && (
          <GoCaptcha.Click
            data={{ image: captchaData.image, thumb: captchaData.thumb }}
            config={{ width: 350 }}
            events={captchaEvents}
          />
        )}
      </Popper>
    </main>
  );
}
