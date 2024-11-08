import React from 'react'

const AuthLayout: React.FC<
  Readonly<{
    children?: React.ReactNode
  }>
> = ({ children }) => {
  return <div>{children}</div>
}

export default AuthLayout
