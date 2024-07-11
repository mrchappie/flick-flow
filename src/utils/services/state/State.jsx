import { create } from 'zustand';

export const useStateStore = create((set) => ({
  isLoggedIn: false,
  showPageSpinner: true,
  user: null,
  genres: [],
  showModal: false,
  itemToAddInDB: {},

  initState: () => set({ isLoggedIn: false }),

  updateIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn: isLoggedIn })),

  updatePageSpinner: (showPageSpinner) =>
    set(() => ({ showPageSpinner: showPageSpinner })),

  updateUser: (user) => set(() => ({ user: user })),

  updateGenresMap: (genres) => set(() => ({ genres: genres })),

  updateShowModal: (showModal) => set(() => ({ showModal: showModal })),

  updateItemToAddInDB: (itemToAddInDB) =>
    set(() => ({ itemToAddInDB: itemToAddInDB })),
}));
