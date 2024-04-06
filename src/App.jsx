import React, { useEffect } from 'react';
import RoutesContext from './routes/routes';
import Banner from 'components/UI/banner/banner';
import useAuthCheck from 'utils/hooks/useAuthCheck';
import { useStateStore } from 'utils/services/state/State';

function App() {
  // check if user is authenticated
  const { user } = useAuthCheck();

  const updateIsLoggedIn = useStateStore((state) => state.updateIsLoggedIn);

  useEffect(() => {
    if (user) {
      updateIsLoggedIn(true);
    } else {
      updateIsLoggedIn(false);
    }
  }, [user, updateIsLoggedIn]);

  return (
    <React.StrictMode>
      <RoutesContext>
        <Banner />
      </RoutesContext>
    </React.StrictMode>
  );
}

export default App;
