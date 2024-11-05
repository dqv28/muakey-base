'use client'

import React, { createContext, useState } from 'react'

export const PageContext = createContext<any>({})

const PageProvider: React.FC<
  Readonly<{
    children?: React.ReactNode
  }>
> = ({ children }) => {
  const [search, setSearch] = useState()

  return (
    <PageContext.Provider value={{ search, setSearch }}>
      {children}
    </PageContext.Provider>
  )
}

export default PageProvider
