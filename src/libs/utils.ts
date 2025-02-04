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

const stripParameters = (shortcodeString: string) => {
  if (shortcodeString.includes('?')) {
    shortcodeString = shortcodeString.split('?')[0]
  }

  if (shortcodeString.includes('/')) {
    shortcodeString = shortcodeString.split('/')[0]
  }

  if (shortcodeString.includes('&')) {
    shortcodeString = shortcodeString.split('&')[0]
  }

  return shortcodeString
}

export const getYoutubeVideoId = (youtubeString: string) => {
  let string_ = youtubeString

  // Remove the '-nocookie' flag from youtube urls
  string_ = string_.replace('-nocookie', '')

  // Remove time hash at the end of the string
  string_ = string_.replace(/#t=.*$/, '')

  // Strip the leading protocol
  string_ = string_.replace(/^https?:\/\//, '')

  // Shortcode
  const shortcode = /youtube:\/\/|youtu\.be\/|y2u\.be\//g

  if (shortcode.test(string_)) {
    const shortcodeid = string_.split(shortcode)[1]
    return stripParameters(shortcodeid)
  }

  // Shorts
  const shortsUrl = /\/shorts\//g
  if (shortsUrl.test(string_)) {
    return stripParameters(string_.split(shortsUrl)[1])
  }

  // V= or vi=
  const parameterv = /v=|vi=/g

  if (parameterv.test(string_)) {
    const array = string_.split(parameterv)
    return stripParameters(array[1].split('&')[0])
  }

  // /v/ or /vi/ or /watch/
  const inlinev = /\/v\/|\/vi\/|\/watch\//g

  if (inlinev.test(string_)) {
    const inlineid = string_.split(inlinev)[1]
    return stripParameters(inlineid)
  }

  // Format an_webp
  const parameterwebp = /\/an_webp\//g

  if (parameterwebp.test(string_)) {
    const webp = string_.split(parameterwebp)[1]
    return stripParameters(webp)
  }

  // /e/
  const eformat = /\/e\//g

  if (eformat.test(string_)) {
    const estring = string_.split(eformat)[1]
    return stripParameters(estring)
  }

  // Embed
  const embedreg = /\/embed\//g

  if (embedreg.test(string_)) {
    const embedid = string_.split(embedreg)[1]
    return stripParameters(embedid)
  }

  // ignore /user/username pattern
  const usernamereg = /\/user\/([a-zA-Z\d]*)$/g

  if (usernamereg.test(string_)) {
    return undefined
  }

  // User
  const userreg = /\/user\/(?!.*videos)/g

  if (userreg.test(string_)) {
    const elements = string_.split('/')
    return stripParameters(elements.pop() || '')
  }

  // Attribution_link
  const attrreg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/

  if (attrreg.test(string_)) {
    return stripParameters(string_.match(attrreg)?.[1] || '')
  }

  // Live
  const livereg = /\/live\//g

  if (livereg.test(string_)) {
    const liveid = string_.split(livereg)[1]
    return stripParameters(liveid)
  }

  return undefined
}

export default getYoutubeVideoId

dayjs.extend(relativeTime)
dayjs.locale(locale)

export const convertRelativeTime = (date: Date) => {
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

export const extractLinks = (htmlString: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  const links = Array.from(doc.querySelectorAll('a')).map((a) => a.href)
  return links
}

export const generateUrl = (str: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g

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
    date.getDate() - date.getDay() + 1 + +(numberOfWeek || 0) * 7,
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

export const convertTime = (seconds: number) => {
  const durationObj = dayjs.duration(seconds, 'seconds')

  const year = durationObj.years()
  const days = durationObj.days()
  const hours = durationObj.hours()
  const minutes = durationObj.minutes()
  const secs = durationObj.seconds()

  switch (true) {
    case !!year:
      return `${year} năm`

    case !!days:
      return `${days} ngày`

    case !!hours:
      return `${hours} giờ`

    case !!minutes:
      return `${minutes} phút`

    case !!secs:
      return `${secs} giây`

    default:
      return null
  }
}
