import { LinkProps } from 'next/link'
import { NavigationMenuType, NavigationProps } from './Navigation'

type Url = {
  pathName: string
  searchParams: URLSearchParams
}

export const activeNav = (
  url: Url,
  href: LinkProps['href'],
  exact: boolean = false,
  hash?: string,
  matchType: NavigationProps['matchType'] = 'default',
) => {
  const { pathName, searchParams } = url

  const hrefPathName =
    typeof href === 'string' ? href.split('?')[0] : href.pathname
  const queryParams =
    typeof href === 'string'
      ? href.split('?')[1]
      : new URLSearchParams(Object.entries(href.query || {}) as []).toString()

  const isHashMatch = hrefPathName?.includes('#') && !!hash && hrefPathName.split('#')[1] === hash
  const exactMatch = pathName === hrefPathName && (`${searchParams}` === (queryParams || '') || isHashMatch)
  const type = exact ? 'exact' : matchType

  switch (type) {
    case 'exact':
      return exactMatch

    case 'prefix':
      return pathName.startsWith(hrefPathName || '')

    default:
      return pathName === (hrefPathName || '')
  }
}

export const urlMatch = (
  menu: NavigationMenuType[],
  pathName: string,
  searchParams: URLSearchParams,
  exact?: boolean,
  matchType: NavigationProps['matchType'] = 'default',
) => {
  if (!menu || menu.length <= 0) {
    return false
  }

  for (const item of menu) {
    if (activeNav({ pathName, searchParams }, item.href || '', exact, matchType)) {
      return true
    }

    if (item.children) {
      if (urlMatch(item.children, pathName, searchParams)) {
        return true
      }
    }
  }

  return false
}
