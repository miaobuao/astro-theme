import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { osLocaleSync } from './locale'
import config from '@/consts'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLanguageCode() {
  const reg = /^([a-z]{2,})(?:-[a-z]{2,})?$/i
  return reg.exec(config.site.locale)?.[1] || reg.exec(osLocaleSync())?.[1] || 'zh'
}
