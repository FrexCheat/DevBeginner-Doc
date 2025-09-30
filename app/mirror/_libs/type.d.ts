interface DownloadableFile {
  id: string;
  name: string;
  catagory: string;
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

interface DownloadOriginResponse {
  origin: string;
}

interface DownloadResponse {
  success: boolean;
  message: string;
  download_url?: string;
}

interface OriginBadgeProps {
  origin: string;
  className?: string;
}

export type {
  DownloadableFile,
  CaptchaResponse,
  VerifyResponse,
  DownloadOriginResponse,
  DownloadResponse,
  OriginBadgeProps,
};
