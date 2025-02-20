import type { DependencyList } from 'react'
import { useEffect, useState } from 'react'

export const useAsyncEffect = (
  effect: () => Promise<void>,
  deps?: DependencyList,
) => {
  useEffect(() => {
    effect()
  }, deps)
}

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
