'use client'

import React, { createContext, useState } from 'react'

export const TodoContext = createContext<any>({})

const PageProvider: React.FC<
  Readonly<{
    children: React.ReactNode
  }>
> = ({ children }) => {
  const [loading, setLoading] = useState(false)

  return (
    <TodoContext.Provider value={{ loading, setLoading }}>
      {children}
    </TodoContext.Provider>
  )
}

export default PageProvider
