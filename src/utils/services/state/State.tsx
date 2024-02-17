import { create } from 'zustand';

export const useStateStore = create<State & Action>((set) => ({
  isLoggedIn: false,
  updateIsLoggedIn: (isLoggedIn: boolean) =>
    set(() => ({ isLoggedIn: isLoggedIn })),
  initState: () => set({ isLoggedIn: false }),
}));

type State = {
  isLoggedIn: boolean;
};

type Action = {
  updateIsLoggedIn: (isLoggedIn: State['isLoggedIn']) => void;
};
