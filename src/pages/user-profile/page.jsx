import { useStateStore } from 'utils/services/state/State';
import ProfileCard from './components/profileCard';
import ListsStatistics from './components/listsStatistics';
import ManageAccount from './components/manageAccount';
import { useEffect, useState } from 'react';

export default function UserProfile() {
  const { userData } = useStateStore();
  const [userDataS, setUserDataS] = useState(null);

  useEffect(() => {
    if (userData) {
      setUserDataS(userData);
    }
  }, [userData]);

  return (
    <div className="grid h-full grid-cols-6 grid-rows-2 gap-8 max-lg:grid-cols-4 max-lg:grid-rows-3">
      <ProfileCard
        loggedUserData={userDataS}
        customStyle={
          'col-start-1 col-end-4 row-span-2 max-lg:row-end-2 max-lg:col-span-full'
        }
      />
      <ManageAccount
        loggedUserData={userDataS}
        customStyle={
          'col-start-4 col-end-7 row-start-1 row-span-1 max-lg:col-start-1 max-lg:col-span-full max-lg:row-start-2'
        }
      />
      <ListsStatistics
        loggedUserData={userDataS}
        customStyle={
          'col-start-4 col-end-7 row-start-2 row-span-1 max-lg:col-start-1 max-lg:col-span-full max-lg:row-start-3'
        }
      />
    </div>
  );
}
