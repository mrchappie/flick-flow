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
    <div className="grid h-full grid-cols-6 grid-rows-6 gap-8">
      <ProfileCard userData={userDataS} />
      <ManageAccount userData={userDataS} />
      <ListsStatistics userData={userDataS} />
    </div>
  );
}
