import React, { useEffect } from 'react';
import RoutesContext from './routes/RoutesContext';
import Banner from 'components/UI/banner/banner';
import useAuthCheck from 'utils/hooks/useAuthCheck';
import { useStateStore } from 'utils/services/state/State';
import ReactModal from 'react-modal';

function App() {
  const { user, authIsLoading } = useAuthCheck();
  const updateUser = useStateStore((state) => state.updateUser);
  const updateIsLoggedIn = useStateStore((state) => state.updateIsLoggedIn);

  useEffect(() => {
    console.log('test App');
    if (!authIsLoading) {
      if (user) {
        updateUser(user);
        updateIsLoggedIn(true);
        console.log(user);
      } else {
        updateUser(null);
        updateIsLoggedIn(false);
      }
    }
  }, [user, authIsLoading, updateUser, updateIsLoggedIn]);

  if (authIsLoading) {
    // Render a loading indicator or skeleton while authentication state is loading
    return <div>Loading...</div>;
  }

  // append modal to root
  ReactModal.setAppElement(document.getElementById('root'));

  return (
    <React.StrictMode>
      <main className="grid min-h-screen grid-cols-12 custom-main-grid-row">
        <RoutesContext></RoutesContext>
      </main>
      <Banner />
    </React.StrictMode>
  );
}

export default App;
