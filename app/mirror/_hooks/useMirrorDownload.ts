import { useState, useCallback, useEffect } from 'react';
import { useAsync, useDebounce } from 'react-use';
import {
  getDownloadableFiles,
  getCaptcha,
  verifyCaptcha,
  getDownloadLink,
} from '../_libs/api';
import type { CaptchaResponse } from '../_libs/type';
import toast from 'react-hot-toast';

export function useMirrorDownload() {
  const [captchaData, setCaptchaData] = useState<CaptchaResponse | null>(null);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);

  const filesState = useAsync(async () => {
    return await getDownloadableFiles();
  }, []);

  useEffect(() => {
    if (filesState.error) {
      toast.error('获取文件列表失败');
    }
  }, [filesState.error]);

  useDebounce(
    () => {
      if (clickedId) {
        prepareCaptchaForDownload(clickedId);
        setClickedId(null);
      }
    },
    500,
    [clickedId]
  );

  const handleDownloadClick = useCallback((fileId: string) => {
    setClickedId(fileId);
  }, []);

  const refreshCaptcha = useCallback(async () => {
    try {
      const captcha = await getCaptcha();
      setCaptchaData(captcha);
      return captcha;
    } catch (err) {
      if (err instanceof Error) {
        toast.error('刷新验证码失败');
      }
    }
  }, []);

  const prepareCaptchaForDownload = useCallback(
    async (fileId: string) => {
      if (downloadingId) return;
      try {
        setDownloadingId(fileId);
        setCurrentFileId(fileId);
        const captcha = await getCaptcha();
        setCaptchaData(captcha);
        setIsPopperOpen(true);
        return captcha;
      } catch (err) {
        if (err instanceof Error) {
          toast.error('获取验证码失败');
        }
      }
    },
    [downloadingId]
  );

  const submitCaptcha = useCallback(
    async (
      captchaId: string,
      dots: Array<{ x: number; y: number }>
    ) => {
      if (!currentFileId) {
        toast.error('文件ID不存在，请重新尝试下载');
        return;
      }
      try {
        const verifyResult = await verifyCaptcha(captchaId, dots);
        if (!verifyResult.success) {
          toast.error('验证码验证失败');
          return;
        }
        // 验证成功，获取下载链接
        const downloadResult = await getDownloadLink(currentFileId, captchaId);
        if (!downloadResult.success || !downloadResult.download_url) {
          toast.error('获取下载链接失败');
          return;
        }
        // 触发下载
        const link = document.createElement('a');
        link.href = '/mirror' + downloadResult.download_url;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsPopperOpen(false);
        toast.success('下载开始');
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message || '下载失败');
        }
      } finally {
        setDownloadingId(null);
        setCurrentFileId(null);
        setCaptchaData(null);
        setClickedId(null);
        setIsPopperOpen(false);
      }
    },
    [currentFileId]
  );

  return {
    files: filesState.value || [],
    loading: filesState.loading,
    error: filesState.error?.message || null,
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
  };
}
