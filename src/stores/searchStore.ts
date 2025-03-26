import { create } from 'zustand'

interface SearchStore {
  searchResults: any[]
  setSearchResults: (results: any[]) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}))
