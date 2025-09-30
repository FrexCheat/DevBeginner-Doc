import { useReducer, useCallback } from 'react';
import { useAsync, useDebounce } from 'react-use';
import toast from 'react-hot-toast';

import type { CaptchaResponse } from '../_libs/type';
import { getDownloadableFiles, getCaptcha, verifyCaptcha, getDownloadOrigin, getDownloadLink } from '../_libs/api';

type State = {
  captchaData: CaptchaResponse | null;
  clickedId: string | null;
  currentFileId: string | null;
  isPopperOpen: boolean;
};

type Action =
  | { type: 'SET_CAPTCHA_DATA'; payload: CaptchaResponse | null }
  | { type: 'SET_CLICKED_ID'; payload: string | null }
  | { type: 'SET_CURRENT_FILE_ID'; payload: string | null }
  | { type: 'SET_POPPER_OPEN'; payload: boolean }
  | { type: 'RESET_DOWNLOAD_STATE' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CAPTCHA_DATA':
      return { ...state, captchaData: action.payload };
    case 'SET_CLICKED_ID':
      return { ...state, clickedId: action.payload };
    case 'SET_CURRENT_FILE_ID':
      return { ...state, currentFileId: action.payload };
    case 'SET_POPPER_OPEN':
      return { ...state, isPopperOpen: action.payload };
    case 'RESET_DOWNLOAD_STATE':
      return {
        ...state,
        captchaData: null,
        currentFileId: null,
        clickedId: null,
        isPopperOpen: false,
      };
    default:
      return state;
  }
}

export function useMirrorDownload() {
  const [state, dispatch] = useReducer(reducer, {
    captchaData: null,
    isPopperOpen: false,
    clickedId: null,
    currentFileId: null,
  });

  const { captchaData, isPopperOpen, clickedId, currentFileId } = state;

  const filesState = useAsync(async () => {
    try {
      return await getDownloadableFiles();
    } catch (error) {
      toast.error('获取文件列表失败');
      throw error;
    }
  }, []);

  const downloadOrigin = useAsync(async () => {
    try {
      return await getDownloadOrigin();
    } catch (error) {
      toast.error('获取下载源失败');
      throw error;
    }
  }, []);

  useDebounce(
    () => {
      if (clickedId) {
        dispatch({ type: 'SET_POPPER_OPEN', payload: true });
        prepareCaptchaForDownload(clickedId);
        dispatch({ type: 'SET_CLICKED_ID', payload: null });
      }
    },
    500,
    [clickedId]
  );

  const handleDownloadClick = useCallback((fileId: string) => {
    dispatch({ type: 'SET_CLICKED_ID', payload: fileId });
  }, []);

  const refreshCaptcha = useCallback(async () => {
    try {
      const captcha = await getCaptcha();
      dispatch({ type: 'SET_CAPTCHA_DATA', payload: captcha });
      return captcha;
    } catch (err) {
      if (err instanceof Error) {
        toast.error('刷新验证码失败！');
      }
    }
  }, []);

  const prepareCaptchaForDownload = useCallback(
    async (fileId: string) => {
      if (currentFileId) return;
      try {
        dispatch({ type: 'SET_CURRENT_FILE_ID', payload: fileId });
        const captcha = await getCaptcha();
        dispatch({ type: 'SET_CAPTCHA_DATA', payload: captcha });
        return captcha;
      } catch (err) {
        if (err instanceof Error) {
          toast.error('获取验证码失败！');
        }
        dispatch({ type: 'RESET_DOWNLOAD_STATE' });
      }
    },
    [currentFileId]
  );

  const submitCaptcha = useCallback(
    async (captchaId: string, dots: Array<{ x: number; y: number }>) => {
      if (!currentFileId) {
        toast.error('文件ID不存在，请重新尝试下载');
        return;
      }
      try {
        const verifyResult = await verifyCaptcha(captchaId, dots);
        if (!verifyResult.success) {
          toast.error('验证码错误！');
          return;
        }

        const downloadResult = await getDownloadLink(currentFileId, captchaId);
        if (!downloadResult.success || !downloadResult.download_url) {
          toast.error('获取下载链接失败！');
          return;
        }

        if (downloadOrigin.value?.origin === 'local' || downloadOrigin.value?.origin === 's3') {
          toast.success('开始下载');
          window.open(downloadResult.download_url, '_blank');
        } else {
          toast.error('未知的下载源');
          return;
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message || '下载失败！');
        }
      } finally {
        dispatch({ type: 'RESET_DOWNLOAD_STATE' });
      }
    },
    [currentFileId, downloadOrigin]
  );

  return {
    files: filesState.value || [],
    loading: filesState.loading,
    error: filesState.error?.message || null,
    downloadOrigin: downloadOrigin.value?.origin || 'unknown',
    currentFileId,
    captchaData,
    isPopperOpen,
    handleDownloadClick,
    refreshCaptcha,
    submitCaptcha,
    setIsPopperOpen: (open: boolean) => dispatch({ type: 'SET_POPPER_OPEN', payload: open }),
    resetDownloadState: () => dispatch({ type: 'RESET_DOWNLOAD_STATE' }),
  };
}
