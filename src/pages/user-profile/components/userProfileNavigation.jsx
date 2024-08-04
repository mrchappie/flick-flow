import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getUserRole, logoutUser } from 'utils/services/auth/Auth';
import { useStateStore } from 'utils/services/state/State';
import { capitalizeWords } from 'utils/utils';

export default function UserProfileNavigation({ userData }) {
  const navigate = useNavigate();
  const { updateIsLoggedIn } = useStateStore();

  // handle logout
  const handleLogOut = async () => {
    await logoutUser();
    // redirect to landing page and then set to false login state
    updateIsLoggedIn(false);
    navigate('/');
  };

  const [role, setRole] = useState(null);
  async function userRole() {
    const role = await getUserRole();
    setRole(role);
  }

  useEffect(() => {
    userRole();
  }, []);

  return (
    <div className="items-start justify-start w-full h-full p-8 bg-black/50 center-col">
      <div className="items-start justify-start center-col h-[90%] gap-6">
        <div className="justify-start center-col">
          <div className="rounded-[50%] overflow-hidden relative">
            <img
              src="https://picsum.photos/200"
              width={50}
              height={50}
              alt=""
            />
          </div>
          <h2 className="text-xl">
            Hi, <span>{userData && userData.name}</span>
          </h2>
        </div>
        <Link to={'/home'} className="text-xl">
          Home
        </Link>
        {role === 'admin' && (
          <Link to={'/admin/dashboard'} className="text-xl">
            Dashboard
          </Link>
        )}
        <Link to={'/user-profile'} className="text-xl">
          Profile
        </Link>
        <Link to={'/user-profile/user-lists'} className="text-xl">
          Manage lists
        </Link>
        {userData &&
          userData.lists.map((list) => {
            return (
              <NavLink
                to={`/user-profile/user-lists/${list.listName}?list_id=${list.listID}`}
                className="pl-4 text-xl"
                key={list.listID}
              >
                - {capitalizeWords(list.listName)}
              </NavLink>
            );
          })}
      </div>
      <div className="h-[10%] center items-end">
        <button onClick={handleLogOut} className="text-xl">
          Sign Out
        </button>
      </div>
    </div>
  );
}
