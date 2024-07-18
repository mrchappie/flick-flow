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
  const [userAuthToken, setUserAuthToken] = useState(null);
  const [authIsLoading, setAuthIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user.accessToken);
        // if user is logged in, fetch user data
        async function getUserData() {
          const userData = await DB.getFirestoreDoc(['users', user.uid]);
          setUser(userData);
          setUserAuthToken(user.accessToken);
          setAuthIsLoading(false);
        }
        getUserData();
      } else {
        setUser(null);
        setAuthIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, authIsLoading, userAuthToken };
}
