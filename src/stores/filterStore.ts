import { create } from 'zustand'

interface FilterStore {
  filterResults: any[]
  setFilterResults: (data: any[]) => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  filterResults: [],
  setFilterResults: (data) => set({ filterResults: data }),
}))
