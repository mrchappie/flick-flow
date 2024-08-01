import { useEffect } from 'react';
import useAuthCheck from './hooks/useAuthCheck';
import useFetch from './hooks/useFetch';
import { useStateStore } from './services/state/State';
import { LoadingSpinner } from 'components/UI/loadingSpinner/loadingSpinner';

export default function AppRunner({ children }) {
  const { user, userData, authIsLoading, userAuthToken } = useAuthCheck();
  const {
    updateUser,
    updateUserData,
    updateUserAuthToken,
    updateIsLoggedIn,
    isLoggedIn,
    disableScroll,
    addItemInList,
  } = useStateStore();
  const { response, fetchData } = useFetch({
    url: process.env.REACT_APP_FIREBASE_GET_ITEM_IDS,
    shouldFetch: isLoggedIn,
  });

  // fetch item IDs from user lists
  useEffect(() => {
    fetchData({});
  }, [fetchData]);

  useEffect(() => {
    if (response && response.response) {
      addItemInList(response.response);
    }
  }, [response, addItemInList]);

  useEffect(() => {
    if (!authIsLoading) {
      if (user) {
        updateUser(user);
        updateUserData(userData);
        updateUserAuthToken(userAuthToken);
        updateIsLoggedIn(true);
      } else {
        updateUser(null);
        updateIsLoggedIn(false);
      }
    }
  }, [
    user,
    authIsLoading,
    updateUser,
    updateIsLoggedIn,
    updateUserAuthToken,
    userAuthToken,
    updateUserData,
    userData,
  ]);

  useEffect(() => {
    document.body.style.overflow = disableScroll ? 'hidden' : null;
  }, [disableScroll]);

  if (authIsLoading && !userData) {
    // Render a loading indicator or skeleton while authentication state is loading
    return <LoadingSpinner />;
  }

  return children;
}
