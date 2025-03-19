import getYoutubeVideoId from '@/libs/utils'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getThumbnailFromYoutubeUrl = (url: string, size?: string) => {
  if (!url) return ''

  const videoId = getYoutubeVideoId(url)
  size = size === null ? 'big' : size

  if (size === 'small') {
    return `https://img.youtube.com/vi/${videoId}/2.jpg`
  }

  return `https://img.youtube.com/vi/${videoId}/0.jpg`
}
