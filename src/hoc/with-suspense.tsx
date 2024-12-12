import React, { ComponentType, Suspense, SuspenseProps } from 'react'

export type WithSuspenseType = <P>(
  Component: ComponentType<P>,
  options: { fallback?: (props: P) => React.ReactNode },
) => React.FC<
  P & {
    suspense?:
      | boolean
      | (SuspenseProps & {
          key?: React.Key
        })
  }
>

export const withSuspense: WithSuspenseType = (Component, { fallback }) => {
  const SuspenseableComponent: React.FC<any> = ({
    suspense = false,
    ...componentProps
  }) => {
    if (!suspense) {
      return <Component {...componentProps} />
    }

    const { key = undefined, ...suspenseProps } =
      typeof suspense === 'object' ? suspense : {}

    return (
      <Suspense
        key={key}
        fallback={fallback?.(componentProps)}
        {...suspenseProps}
      >
        <Component {...componentProps} />
      </Suspense>
    )
  }

  return SuspenseableComponent
}

export default withSuspense
