import UserProfileNavigation from 'pages/user-profile/components/userProfileNavigation';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useStateStore } from 'utils/services/state/State';

export default function UserProfileLayout() {
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
        <UserProfileNavigation userData={userDataS} />
      </div>
      <div className="h-full col-span-10 p-8 row-span-full bg-[#222]">
        <Outlet />
      </div>
    </>
  );
}
