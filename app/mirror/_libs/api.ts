import type {
  DownloadableFile,
  CaptchaResponse,
  VerifyResponse,
  DownloadOriginResponse,
  DownloadResponse,
} from './type';

async function getDownloadableFiles(): Promise<DownloadableFile[]> {
  const response = await fetch('/mirror/api/files');
  if (!response.ok) {
    throw new Error('Failed to fetch downloadable files');
  }
  const data: DownloadableFile[] = await response.json();
  return data;
}

async function getCaptcha(): Promise<CaptchaResponse> {
  const response = await fetch('/mirror/api/captcha/generate');
  if (!response.ok) {
    throw new Error('Failed to fetch captcha');
  }
  const data: CaptchaResponse = await response.json();
  return data;
}

async function verifyCaptcha(captchaId: string, dots: Array<{ x: number; y: number }>): Promise<VerifyResponse> {
  const response = await fetch('/mirror/api/captcha/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: captchaId, dots }),
  });
  if (!response.ok) {
    throw new Error('Failed to verify captcha');
  }
  const data: VerifyResponse = await response.json();
  return data;
}

async function getDownloadOrigin(): Promise<DownloadOriginResponse> {
  const response = await fetch('/mirror/api/download/origin');
  if (!response.ok) {
    throw new Error('Failed to fetch download origin');
  }
  const data: DownloadOriginResponse = await response.json();
  return data;
}

async function getDownloadLink(fileId: string, captchaId: string): Promise<DownloadResponse> {
  const response = await fetch('/mirror/api/download/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file_id: fileId, captcha_id: captchaId }),
  });
  if (!response.ok) {
    throw new Error('Failed to get download link');
  }
  const data: DownloadResponse = await response.json();
  return data;
}

export { getDownloadableFiles, getCaptcha, verifyCaptcha, getDownloadOrigin, getDownloadLink };
