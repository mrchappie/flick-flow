import React, { useEffect } from 'react';
import RoutesContext from './routes/RoutesContext';
import Banner from 'components/UI/banner/banner';
import useAuthCheck from 'utils/hooks/useAuthCheck';
import { useStateStore } from 'utils/services/state/State';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';

function App() {
  const { user, authIsLoading } = useAuthCheck();
  const updateUser = useStateStore((state) => state.updateUser);
  const updateIsLoggedIn = useStateStore((state) => state.updateIsLoggedIn);
  const showModalState = useStateStore((state) => state.showModal);

  useEffect(() => {
    if (!authIsLoading) {
      if (user) {
        updateUser(user);
        console.log(user);
        updateIsLoggedIn(true);
      } else {
        updateUser(null);
        updateIsLoggedIn(false);
      }
    }
  }, [user, authIsLoading, updateUser, updateIsLoggedIn]);

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
