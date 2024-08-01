import React from 'react';
import {
  AdminRoutes,
  DefaultRoutes,
  UserProfileRoutes,
} from './routes/RoutesContext';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from 'pages/layouts/defaultLayout';
import AdminLayout from 'pages/admin/adminLayout';
import UserProfileLayout from 'pages/layouts/userProfileLayout';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRunner from 'utils/AppRunner';
import { ModalProvider } from 'utils/modals/ModalContext';
import ModalManager from 'utils/modals/ModalManager';

function App() {
  return (
    <React.StrictMode>
      <ModalProvider>
        <ModalManager />
        <ToastContainer
          theme="dark"
          position="bottom-right"
          transition={Flip}
        />
        <AppRunner>
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
        </AppRunner>
      </ModalProvider>
    </React.StrictMode>
  );
}

export default App;
