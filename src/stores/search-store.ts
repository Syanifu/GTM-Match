import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchStore {
  isOpen: boolean;
  query: string;
  recentSearches: string[];
  setIsOpen: (isOpen: boolean) => void;
  setQuery: (query: string) => void;
  addRecentSearch: (search: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      isOpen: false,
      query: "",
      recentSearches: [],
      setIsOpen: (isOpen) => set({ isOpen }),
      setQuery: (query) => set({ query }),
      addRecentSearch: (search) =>
        set((state) => {
          const trimmed = search.trim();
          if (!trimmed) return state;

          const filtered = state.recentSearches.filter((s) => s !== trimmed);
          const newRecent = [trimmed, ...filtered].slice(0, 5);

          return { recentSearches: newRecent };
        }),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "search-storage",
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
);
