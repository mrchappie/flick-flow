import { create } from 'zustand';

export const useStateStore = create((set) => ({
  isLoggedIn: false,
  showPageSpinner: true,
  user: null,
  userData: null,
  userAuthToken: null,
  genres: [],
  showModal: false,
  itemToAddInDB: {},
  itemsInList: [],
  disableScroll: false,

  initState: () => set({ isLoggedIn: false }),

  updateIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn: isLoggedIn })),

  updatePageSpinner: (showPageSpinner) =>
    set(() => ({ showPageSpinner: showPageSpinner })),

  updateUser: (user) => set(() => ({ user: user })),
  updateUserData: (userData) => set(() => ({ userData: userData })),
  updateUserAuthToken: (userAuthToken) =>
    set(() => ({ userAuthToken: userAuthToken })),

  updateGenresMap: (genres) => set(() => ({ genres: genres })),

  updateShowModal: (showModal) => set(() => ({ showModal: showModal })),

  updateDisableScroll: (disableScroll) =>
    set(() => ({ disableScroll: disableScroll })),

  updateItemToAddInDB: (itemToAddInDB) =>
    set(() => ({ itemToAddInDB: itemToAddInDB })),

  addItemInList: (newItem) =>
    set((state) => ({ itemsInList: [...state.itemsInList, ...newItem] })),

  removeItemFromList: (itemToRemove, listName) =>
    set((state) => ({
      itemsInList: state.itemsInList.filter((item) => {
        if (item.movieID !== itemToRemove.id || item.listName !== listName) {
          return true;
        }
        return false;
      }),
    })),
}));
