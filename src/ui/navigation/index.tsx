'use client'

import Navigation from './Navigation'
import NavigationSkeleton from './NavigationSkeleton'

type CompoundedNavigationType = typeof Navigation & {
  Skeleton: typeof NavigationSkeleton
}

const CompoundedNavigation = Navigation as CompoundedNavigationType
CompoundedNavigation.Skeleton = NavigationSkeleton

export type * from './Navigation'
export { CompoundedNavigation as Navigation, NavigationSkeleton }
export default CompoundedNavigation
