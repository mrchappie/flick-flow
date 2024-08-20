import NavWrapper from 'components/wrappers/navWrapper';
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
      <NavWrapper>
        <UserProfileNavigation userData={userDataS} />
      </NavWrapper>
      <div className="h-full col-span-10 p-8 row-span-full bg-[#222] max-lg:col-span-full">
        <Outlet />
      </div>
    </>
  );
}
