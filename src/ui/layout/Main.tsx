import React from 'react'

export type MainProps = React.ComponentPropsWithoutRef<'main'> & {}

const InternalMain: React.ForwardRefRenderFunction<HTMLElement, MainProps> = (
  props,
  ref,
) => {
  return <main ref={ref} {...props} />
}

const Main = React.forwardRef(InternalMain)

export default Main
