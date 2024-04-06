import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseConfig } from 'utils/keys/firebase.config';

initializeApp(firebaseConfig);
const auth = getAuth();

export default function useAuthCheck() {
  const [user, setUser] = useState(null);
  const [authIsLoading, setAuthIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setAuthIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  return { user, authIsLoading }; // Return the current authState (null or user object)
}
