import React, { useEffect } from 'react';
import RoutesContext from './routes/RoutesContext';
import Banner from 'components/UI/banner/banner';
import useAuthCheck from 'utils/hooks/useAuthCheck';
import { useStateStore } from 'utils/services/state/State';

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

  return (
    <React.StrictMode>
      <RoutesContext></RoutesContext>
      <Banner />
    </React.StrictMode>
  );
}

export default App;
