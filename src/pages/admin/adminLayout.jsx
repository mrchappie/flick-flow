import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useStateStore } from 'utils/services/state/State';
import AdminNavigation from './components/adminNavigation/adminNavigation';
import { HiMiniBars3, HiMiniXMark } from 'react-icons/hi2';

export default function AdminLayout() {
  const { userData } = useStateStore();
  const [userDataS, setUserDataS] = useState(null);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (userData) {
      setUserDataS(userData);
    }
  }, [userData]);

  function closeNav() {
    setShowNav(false);
  }

  function openNav() {
    setShowNav(true);
  }

  return (
    <>
      <div
        onClick={openNav}
        className="absolute w-[80px] h-[80px] text-2xl bg-black top-[-20px] left-[-20px] rounded-br-[50px] center cursor-pointer z-20 lg:hidden"
      >
        <HiMiniBars3 />
      </div>
      <div
        className={`h-full z-20 lg:col-span-2 row-span-full bg-[#222] max-lg:absolute max-lg:shadow-2xl shadow-white left-[${
          showNav ? '0' : '-200'
        }px]`}
      >
        <div
          onClick={closeNav}
          className="absolute p-2 text-2xl rounded-full cursor-pointer right-2 top-2 hover:bg-white hover:text-black"
        >
          <HiMiniXMark />
        </div>
        <AdminNavigation userData={userDataS} />
      </div>
      {showNav && (
        <div
          onClick={closeNav}
          className="absolute inset-0 z-10 cursor-pointer bg-black/50"
        ></div>
      )}
      <div className="h-full col-span-10 p-8 row-span-full bg-[#222] max-lg:col-span-full">
        <Outlet />
      </div>
    </>
  );
}
