import React, { useEffect } from 'react';
import RoutesContext from './routes/routes';
import Banner from 'components/UI/banner/banner';
import useAuthCheck from 'utils/hooks/useAuthCheck';
import { useStateStore } from 'utils/services/state/State';

function App() {
  // check if user is authenticated
  const { user } = useAuthCheck();

  const updateUser = useStateStore((state) => state.updateUser);
  const updateIsLoggedIn = useStateStore((state) => state.updateIsLoggedIn);

  useEffect(() => {
    if (user) {
      updateUser(user);
      updateIsLoggedIn(true);
      console.log(user);
    } else {
      updateUser(null);
      updateIsLoggedIn(false);
    }
  }, [user, updateIsLoggedIn, updateUser]);

  return (
    <React.StrictMode>
      <RoutesContext>
        <Banner />
      </RoutesContext>
    </React.StrictMode>
  );
}

export default App;
