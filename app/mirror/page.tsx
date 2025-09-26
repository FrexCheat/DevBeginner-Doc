'use client';
import { Toaster } from 'react-hot-toast';
import GoCaptcha from 'go-captcha-react';

import Loading from '@/components/Loading';
import Popper from '@/components/Popper';

import './_styles/mirror.css';
import FilesList from './_components/FilesList';
import { useMirrorDownload } from './_hooks/useMirrorDownload';

export default function MirrorPage() {
  const {
    files,
    loading,
    error,
    captchaData,
    isPopperOpen,
    handleDownloadClick,
    refreshCaptcha,
    submitCaptcha,
    resetDownloadState,
  } = useMirrorDownload();

  const handleCaptchaClose = () => {
    resetDownloadState();
  };

  const captchaEvents = {
    refresh: refreshCaptcha,
    close: handleCaptchaClose,
    confirm: (dots: Array<{ x: number; y: number }>) => {
      if (captchaData) {
        submitCaptcha(captchaData.id, dots);
      }
    },
  };

  return (
    <main className='flex flex-1 flex-col items-center'>
      <Toaster />
      <h1 className='mt-8 mb-8 text-2xl font-bold'>软件仓库</h1>
      {loading || error ? <Loading /> : <FilesList files={files} onDownload={handleDownloadClick} />}
      <Popper isOpen={isPopperOpen} onClose={() => resetDownloadState()} title='确认您是否是人类'>
        {captchaData && (
          <GoCaptcha.Click
            data={{ image: captchaData.master_img, thumb: captchaData.thumb_img }}
            config={{ width: 350 }}
            events={captchaEvents}
          />
        )}
      </Popper>
    </main>
  );
}
