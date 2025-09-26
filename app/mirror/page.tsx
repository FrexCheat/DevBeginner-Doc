'use client';
import Image from 'next/image';
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
    downloadingId,
    captchaData,
    isPopperOpen,
    setCaptchaData,
    setDownloadingId,
    setCurrentFileId,
    setClickedId,
    setIsPopperOpen,
    handleDownloadClick,
    refreshCaptcha,
    submitCaptcha,
  } = useMirrorDownload();

  const handleCaptchaClose = () => {
    setIsPopperOpen(false);
    setCaptchaData(null);
    setDownloadingId(null);
    setCurrentFileId(null);
    setClickedId(null);
  };

  const captchaEvents = {
    refresh: refreshCaptcha,
    close: handleCaptchaClose,
    confirm: (dots: Array<{ x: number; y: number }>) => {
      captchaData && submitCaptcha(downloadingId, captchaData.id, dots);
    },
  };

  return (
    <main className='flex flex-1 flex-col items-center'>
      <Toaster />
      <h1 className='mt-8 mb-8 text-2xl font-bold'>软件仓库</h1>
      {loading || error ? (
        <Loading />
      ) : (
        <FilesList files={files} onDownload={handleDownloadClick} />
      )}
      <Popper
        isOpen={isPopperOpen}
        onClose={() => setIsPopperOpen(false)}
        title='确认您是否是人类'
      >
        {captchaData && (
          <GoCaptcha.Click
            data={{
              image: captchaData.master_img,
              thumb: captchaData.thumb_img,
            }}
            events={captchaEvents}
          />
        )}
      </Popper>
    </main>
  );
}
