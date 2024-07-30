import React, { useEffect } from 'react';
import {
  AdminRoutes,
  DefaultRoutes,
  UserProfileRoutes,
} from './routes/RoutesContext';
import useAuthCheck from 'utils/hooks/useAuthCheck';
import { useStateStore } from 'utils/services/state/State';

import useFetch from 'utils/hooks/useFetch';
import { LoadingSpinner } from 'components/UI/loadingSpinner/loadingSpinner';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from 'pages/layouts/defaultLayout';
import AdminLayout from 'pages/admin/adminLayout';
import UserProfileLayout from 'pages/layouts/userProfileLayout';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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

  return (
    <React.StrictMode>
      <ToastContainer theme="dark" position="bottom-right" transition={Flip} />
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
    </React.StrictMode>
  );
}

export default App;
