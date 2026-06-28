import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BOOKMARK_STORAGE_KEY } from "@/lib/constants";

interface BookmarkState {
  ids: string[];
  isBookmarked: (id: string) => boolean;
  toggle: (id: string) => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      ids: [],
      isBookmarked: (id) => get().ids.includes(id),
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((existingId) => existingId !== id)
            : [...state.ids, id],
        })),
    }),
    {
      name: BOOKMARK_STORAGE_KEY,
    }
  )
);
