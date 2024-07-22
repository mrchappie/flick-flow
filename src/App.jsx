import React, { useEffect } from 'react';
import {
  AdminRoutes,
  DefaultRoutes,
  UserProfileRoutes,
} from './routes/RoutesContext';
import Banner from 'components/UI/banner/banner';
import useAuthCheck from 'utils/hooks/useAuthCheck';
import { useStateStore } from 'utils/services/state/State';

import useFetch from 'utils/hooks/useFetch';
import { LoadingSpinner } from 'components/UI/loadingSpinner/loadingSpinner';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from 'pages/layouts/defaultLayout';
import AdminLayout from 'pages/admin/adminLayout';
import UserProfileLayout from 'pages/layouts/userProfileLayout';

function App() {
  const { user, userData, authIsLoading, userAuthToken } = useAuthCheck();
  const { updateUser } = useStateStore();
  const { updateUserData } = useStateStore();
  const { updateUserAuthToken } = useStateStore();
  const { isLoggedIn } = useStateStore();
  const { updateIsLoggedIn } = useStateStore();
  const { showModalState } = useStateStore();

  const { addItemInList } = useStateStore();
  const { response, fetchData } = useFetch({
    url: process.env.REACT_APP_FIREBASE_GET_ITEM_IDS,
    shouldFetch: isLoggedIn,
  });

  // fetch item IDs from user lists
  useEffect(() => {
    fetchData({});
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
    document.body.style.overflow = showModalState ? 'hidden' : null;
  }, [showModalState]);

  if (authIsLoading && !userData) {
    // Render a loading indicator or skeleton while authentication state is loading
    return <LoadingSpinner />;
  }

  return (
    <React.StrictMode>
      <main className="grid min-h-screen grid-cols-12 custom-main-grid-row">
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/*" element={<DefaultRoutes />} />
          </Route>
          <Route element={<UserProfileLayout />}>
            <Route path="/user-profile/*" element={<UserProfileRoutes />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Route>
        </Routes>
      </main>
      <Banner />
    </React.StrictMode>
  );
}

export default App;
