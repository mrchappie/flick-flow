import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useStateStore } from 'utils/services/state/State';
import AdminNavigation from './components/adminNavigation/adminNavigation';

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
      <div className="h-full col-span-2 row-span-full bg-[#222]">
        <AdminNavigation userData={userDataS} />
      </div>
      <div className="h-full col-span-10 p-8 row-span-full bg-[#222]">
        <Outlet />
      </div>
    </>
  );
}
