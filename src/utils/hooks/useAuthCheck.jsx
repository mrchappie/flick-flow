import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseConfig } from 'utils/keys/firebase.config';
import ConnectDB from 'utils/services/crud/crud';

initializeApp(firebaseConfig);
const auth = getAuth();
const DB = new ConnectDB();

export default function useAuthCheck() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userAuthToken, setUserAuthToken] = useState(null);
  const [authIsLoading, setAuthIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          console.log(user);
          // if user is logged in, fetch user data
          const userData = await DB.getFirestoreDoc(['users', user.uid]);
          setUser(user);
          setUserData(userData);
          setUserAuthToken(user.accessToken);
        } catch (error) {
          console.log('Failed to fetch the user data:', error);
        }
      } else {
        setUser(null);
      }
      setAuthIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, userData, authIsLoading, userAuthToken };
}
