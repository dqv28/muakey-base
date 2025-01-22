import React from 'react'

export const fetchCache = 'force-cache'

const AuthLayout: React.FC<
  Readonly<{
    children?: React.ReactNode
  }>
> = ({ children }) => {
  return <div>{children}</div>
}

export default AuthLayout
