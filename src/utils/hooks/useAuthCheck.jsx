import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { firebaseConfig } from 'utils/keys/firebase.config';
import { useStateStore } from 'utils/services/state/State';

initializeApp(firebaseConfig);
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
