import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useStateStore } from 'utils/services/state/State';
import AdminNavigation from './components/adminNavigation/adminNavigation';
import NavWrapper from 'components/wrappers/navWrapper';

export default function AdminLayout() {
  const { userData } = useStateStore();
  const [userDataS, setUserDataS] = useState(null);

  useEffect(() => {
    if (userData) {
      setUserDataS(userData);
    }
  }, [userData]);

  return (
    <>
      <NavWrapper>
        <AdminNavigation userData={userDataS} />
      </NavWrapper>
      <div className="h-full col-span-10 p-8 row-span-full bg-[#222] max-lg:col-span-full">
        <Outlet />
      </div>
    </>
  );
}
