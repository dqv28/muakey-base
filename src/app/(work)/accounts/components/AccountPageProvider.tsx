'use client'

import React, { useState } from 'react'

export const AccountPageContext = React.createContext<any>({})

const AccountPageProvider: React.FC<
  Readonly<{
    children: React.ReactNode
  }>
> = ({ children }) => {
  const [roleId, setRoleId] = useState<String | null>(null)

  return (
    <AccountPageContext.Provider value={{ roleId, setRoleId }}>
      {children}
    </AccountPageContext.Provider>
  )
}

export default AccountPageProvider
