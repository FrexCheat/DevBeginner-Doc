interface DownloadableFile {
  id: string;
  name: string;
  local_url: string;
  size: string;
  version: string;
  last_updated: string;
}

interface CaptchaResponse {
  id: string;
  image: string;
  thumb: string;
  expire_time: number;
}

interface VerifyResponse {
  success: boolean;
  message: string;
}

interface DownloadResponse {
  success: boolean;
  message: string;
  download_url?: string;
}

export type { DownloadableFile, CaptchaResponse, VerifyResponse, DownloadResponse };
