import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from 'utils/services/auth/Auth';
import { useStateStore } from 'utils/services/state/State';

export default function AdminNavigation({ userData }) {
  const navigate = useNavigate();
  const { updateIsLoggedIn } = useStateStore();

  // handle logout
  const handleLogOut = async () => {
    await logoutUser();
    // redirect to landing page and then set to false login state
    updateIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="items-start justify-start w-full h-full p-8 bg-black/50 center-col">
      <div className="items-start justify-start center-col h-[90%] gap-6">
        <div className="justify-start mb-8 center-col">
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
        {routes.map(({ path, name }) => {
          return (
            <NavLink
              to={path}
              className="text-xl"
              style={({ isActive }) => {
                return {
                  color: isActive ? 'red' : 'white',
                };
              }}
            >
              {name}
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

// navigation bar routes
const routes = [
  { path: '/home', name: 'Back Home' },
  { path: '/user-profile', name: 'Profile' },
  { path: 'admin/dashboard', name: 'Dashboard' },
  { path: 'admin/manage-users', name: 'Manage Users' },
  { path: 'admin/manage-lists', name: 'Manage Lists' },
];
