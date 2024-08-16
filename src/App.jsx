import React, { lazy } from 'react';
import {
  AdminRoutes,
  DefaultRoutes,
  UserProfileRoutes,
} from './routes/RoutesContext';
import { Route, Routes } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRunner from 'utils/AppRunner';
import { ModalProvider } from 'utils/modals/ModalContext';
import ModalManager from 'utils/modals/ModalManager';

const DefaultLayout = lazy(() => import('pages/layouts/defaultLayout'));
const AdminLayout = lazy(() => import('pages/admin/adminLayout'));
const UserProfileLayout = lazy(() => import('pages/layouts/userProfileLayout'));

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
