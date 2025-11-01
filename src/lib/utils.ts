import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化文本，将数字列表（1. 2. 3.）转换为换行显示
 */
export function formatListText(text: string | undefined): string {
  if (!text) return '';
  
  // 匹配类似 "1. xxx" 的模式，并在前面加换行
  return text.replace(/(\d+\.)\s*/g, '\n$1 ').trim();
}