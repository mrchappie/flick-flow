import Navigation from '../navigation/navigation';
import Search from '../search/search';
import { logoutUser } from 'utils/services/auth/Auth';
import { useState } from 'react';
import { useStateStore } from 'utils/services/state/State';
import useAuthCheck from 'utils/hooks/useAuthCheck';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const authCheck = useAuthCheck();
  const isLoggedIn = useStateStore((state) => state.isLoggedIn);
  const updateIsLoggedIn = useStateStore((state) => state.updateIsLoggedIn);

  const [toggleMenu, setToggleMenu] = useState(false);
  function handleShowMenu() {
    setToggleMenu(!toggleMenu);
  }

  const navigate = useNavigate();

  // handle logout
  const handleLogOut = async () => {
    await logoutUser();

    // redirect to landing page and then set to false login state
    navigate('/');
    updateIsLoggedIn(false);
  };

  return (
    <header className="p-4 center justify-evenly bg-custom-bg-fade">
      <div>
        <Link to={'/'}>Logo</Link>
      </div>
      <Navigation />
      <Search />
      {!isLoggedIn && (
        <div>
          <Link to={'/login'}>Sign In</Link>
        </div>
      )}
      {isLoggedIn && (
        <div className="relative">
          <div
            onClick={handleShowMenu}
            className="relative h-full cursor-pointer center"
          >
            <div className="rounded-[50%] overflow-hidden border-2 border-white">
              <img
                src="https://picsum.photos/200"
                width={50}
                height={50}
                alt=""
              />
            </div>
            <div>*</div>
          </div>
          {toggleMenu && (
            <div className="absolute top-[100%] p-4 w-max center-col items-start bg-black z-50">
              <div className="center-col">
                <div className="rounded-[50%] overflow-hidden relative">
                  <img
                    src="https://picsum.photos/200"
                    width={50}
                    height={50}
                    alt=""
                  />
                </div>
                <h2>
                  Hi, <span>Alexandru</span>
                </h2>
              </div>
              <Link to={'/user-profile'}>Profile</Link>
              <Link to={'/user-profile/watchlist'}>Watchlist</Link>
              <div>
                <button onClick={handleLogOut}>Sign Out</button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
