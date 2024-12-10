import dayjs from 'dayjs'
import locale from 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'

export const randomColor = (s: string) => {
  let hash = 0
  for (var i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash)
  }

  var c = (hash & 0x00ffffff).toString(16).toUpperCase()

  return '#' + '00000'.substring(0, 6 - c.length) + c
}

export const abbreviateNumber = (number: number) => {
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E']

  const tier = (Math.log10(Math.abs(number)) / 3) | 0

  if (tier === 0) return number

  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)
  const scaled = (number / scale).toFixed(1)

  const decimals = scaled.split('.')

  if (+decimals[1] <= 0) return decimals[0] + suffix

  return scaled + suffix
}

export const getVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

export const convertRelativeTime = (date: Date) => {
  dayjs.extend(relativeTime)
  dayjs.locale(locale)
  const relativeDate = dayjs(date).fromNow()

  return relativeDate
}

export const base64ToFile = (base64: string) => {
  const byteString = atob(base64.split(',')[1])
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]

  const byteArray = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i)
  }

  return new File([byteArray], 'upload', { type: mimeString })
}

export const generateUrl = (str: string) => {
  const urlRegex = /https?:\/\/[^\s]+/g

  return str.match(urlRegex)
}

export const convertToSlug = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export const daysOfWeek = ['TH 2', 'TH 3', 'TH 4', 'TH 5', 'TH 6', 'TH 7', 'CN']

export const getWeek = (date: Date, numberOfWeek?: number) => {
  const startOfWeek = new Date(date)

  startOfWeek.setDate(
    date.getDate() - date.getDay() + 1 + (numberOfWeek || 0) * 7,
  )

  return daysOfWeek.map((day: string, index: number) => {
    const currentDate = new Date(startOfWeek)
    currentDate.setDate(startOfWeek.getDate() + index)

    return {
      day,
      date: dayjs(currentDate).format('YYYY-MM-DD'),
    }
  })
}
