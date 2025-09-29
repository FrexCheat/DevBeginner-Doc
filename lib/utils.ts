import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function checkAndMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
