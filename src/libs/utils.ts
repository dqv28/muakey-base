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
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}

export const convertRelativeTime = (date: Date) => {
  dayjs.extend(relativeTime)
  dayjs.locale(locale)
  const relativeDate = dayjs(date).fromNow()

  return relativeDate
}