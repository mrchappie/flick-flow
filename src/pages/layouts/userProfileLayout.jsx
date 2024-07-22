import UserProfileNavigation from 'pages/user-profile/components/userProfileNavigation';
import { Outlet } from 'react-router-dom';

export default function UserProfileLayout() {
  return (
    <>
      <div className="h-full col-span-2 row-span-full ">
        <UserProfileNavigation />
      </div>
      <div className="h-full col-span-10 p-8 row-span-full">
        <Outlet />
      </div>
    </>
  );
}
