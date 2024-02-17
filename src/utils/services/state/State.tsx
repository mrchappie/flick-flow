import { create } from 'zustand';

export const useStateStore = create<State & Action>((set) => ({
  isLoggedIn: false,
  showPageSpinner: true,

  updateIsLoggedIn: (isLoggedIn: boolean) =>
    set(() => ({ isLoggedIn: isLoggedIn })),

  updatePageSpinner: (showPageSpinner: boolean) =>
    set(() => ({ showPageSpinner: showPageSpinner })),

  initState: () => set({ isLoggedIn: false }),
}));

type State = {
  isLoggedIn: boolean;
  showPageSpinner: boolean;
};

type Action = {
  updateIsLoggedIn: (isLoggedIn: State['isLoggedIn']) => void;
  updatePageSpinner: (showPageSpinner: State['showPageSpinner']) => void;
};
