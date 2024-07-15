import { create } from 'zustand';

export const useStateStore = create((set) => ({
  isLoggedIn: false,
  showPageSpinner: true,
  user: null,
  userAuthToken: null,
  genres: [],
  showModal: false,
  itemToAddInDB: {},
  itemsInAList: [],

  initState: () => set({ isLoggedIn: false }),

  updateIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn: isLoggedIn })),

  updatePageSpinner: (showPageSpinner) =>
    set(() => ({ showPageSpinner: showPageSpinner })),

  updateUser: (user) => set(() => ({ user: user })),
  updateUserAuthToken: (userAuthToken) =>
    set(() => ({ userAuthToken: userAuthToken })),

  updateGenresMap: (genres) => set(() => ({ genres: genres })),

  updateShowModal: (showModal) => set(() => ({ showModal: showModal })),

  updateItemToAddInDB: (itemToAddInDB) =>
    set(() => ({ itemToAddInDB: itemToAddInDB })),

  updateItemsInAList: (itemsInAList) =>
    set(() => ({ itemsInAList: itemsInAList })),
}));
