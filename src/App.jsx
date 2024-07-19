import React, { useEffect } from 'react';
import RoutesContext from './routes/RoutesContext';
import Banner from 'components/UI/banner/banner';
import useAuthCheck from 'utils/hooks/useAuthCheck';
import { useStateStore } from 'utils/services/state/State';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import useFetch from 'utils/hooks/useFetch';
import { LoadingSpinner } from 'components/UI/loadingSpinner/loadingSpinner';

function App() {
  const { user, authIsLoading, userAuthToken } = useAuthCheck();
  const updateUser = useStateStore((state) => state.updateUser);
  const updateUserAuthToken = useStateStore(
    (state) => state.updateUserAuthToken
  );
  const updateIsLoggedIn = useStateStore((state) => state.updateIsLoggedIn);
  const showModalState = useStateStore((state) => state.showModal);

  const { addItemInList } = useStateStore();
  const { response, fetchData } = useFetch({
    url: process.env.REACT_APP_FIREBASE_GET_ITEM_IDS,
    shouldFetch: true,
  });

  // fetch item IDs from user lists
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (response && response.response) {
      addItemInList(response.response);
    }
  }, [response, addItemInList]);

  useEffect(() => {
    if (!authIsLoading) {
      if (user) {
        updateUser(user);
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
  ]);

  useEffect(() => {
    document.body.style.overflow = showModalState ? 'hidden' : null;
  }, [showModalState]);

  if (authIsLoading) {
    // Render a loading indicator or skeleton while authentication state is loading
    return <LoadingSpinner />;
  }

  return (
    <React.StrictMode>
      <main className="grid min-h-screen grid-cols-12 custom-main-grid-row">
        <Header />
        <RoutesContext></RoutesContext>
        <Footer />
      </main>
      <Banner />
    </React.StrictMode>
  );
}

export default App;
