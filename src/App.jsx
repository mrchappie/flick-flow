import React, { useEffect } from 'react';
import RoutesContext from './routes/RoutesContext';
import Banner from 'components/UI/banner/banner';
import useAuthCheck from 'utils/hooks/useAuthCheck';
import { useStateStore } from 'utils/services/state/State';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import useFetch from 'utils/hooks/useFetch';

function App() {
  const { user, authIsLoading, userAuthToken } = useAuthCheck();
  const updateUser = useStateStore((state) => state.updateUser);
  const updateUserAuthToken = useStateStore(
    (state) => state.updateUserAuthToken
  );
  const updateIsLoggedIn = useStateStore((state) => state.updateIsLoggedIn);
  const showModalState = useStateStore((state) => state.showModal);

  const updateItemsInAList = useStateStore((state) => state.updateItemsInAList);
  const { response } = useFetch({
    url: 'https://getmovieids-6cjkhsqjsq-uc.a.run.app',
  });

  useEffect(() => {
    if (response) {
      updateItemsInAList(response);
      console.log(response);
    }
  }, [response, updateItemsInAList]);

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
    return <div>Loading...</div>;
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
