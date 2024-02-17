import { firebaseConfig } from '@api/firebase.config';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useStateStore } from '@services/state/State';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default function useAuthCheck() {
  const updateIsLoggedIn = useStateStore((state) => state.updateIsLoggedIn);
  const updatePageSpinner = useStateStore((state) => state.updatePageSpinner);

  try {
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          updatePageSpinner(false);
          updateIsLoggedIn(true);
          console.log(user);
          return user;
        } else {
          updatePageSpinner(false);
          return null;
        }
      });

      return () => {
        unsubscribe();
      };
    }, [updateIsLoggedIn, updatePageSpinner]);
  } catch (error) {
    console.log(error);
  }
}
