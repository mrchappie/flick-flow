import Navigation from '../navigation/navigation';
import Search from '../searchBar/searchBar';
import { getUserRole, logoutUser } from 'utils/services/auth/Auth';
import { useEffect, useState } from 'react';
import { useStateStore } from 'utils/services/state/State';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion as m } from 'framer-motion';
import { HiMiniChevronDown } from 'react-icons/hi2';
import { capitalizeWords } from 'utils/utils';
import { ButtonTextNoBgWithBorder } from 'components/UI/buttons/buttons';

export default function Header() {
  const { isLoggedIn } = useStateStore();
  const { userData } = useStateStore();
  const { updateIsLoggedIn } = useStateStore();

  const [toggleMenu, setToggleMenu] = useState(false);
  function handleShowMenu() {
    setToggleMenu(!toggleMenu);
  }

  const navigate = useNavigate();

  // handle logout
  const handleLogOut = async () => {
    await logoutUser();
    handleShowMenu();
    // redirect to landing page and then set to false login state
    updateIsLoggedIn(false);
    navigate('/');
  };

  const [role, setRole] = useState(null);
  async function userRole() {
    const role = await getUserRole();
    console.log(role);
    setRole(role);
  }

  useEffect(() => {
    userRole();
  }, []);

  return (
    <header className="p-4 col-span-full center justify-evenly bg-custom-bg-fade">
      <div>
        <Link to={'/'}>
          <div className="center">
            <img src="/icons/logo.svg" alt="Flick Flow logo" />
            <span className="text-3xl font-bold">Flick Flow</span>
          </div>
        </Link>
      </div>
      <Navigation />
      <Search />
      {!isLoggedIn && (
        <div>
          <ButtonTextNoBgWithBorder>
            <Link to={'/login'} className="font-bold">
              Sign In
            </Link>
          </ButtonTextNoBgWithBorder>
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
            {/* <div className="text-2xl center">
              <HiMiniChevronDown />
            </div> */}
          </div>
          <AnimatePresence>
            {toggleMenu && (
              <m.div
                initial={{ opacity: 0, scale: 0.8, y: '-100%' }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  y: '-100%',
                  transition: { duration: 0.25 },
                }}
                transition={{
                  duration: 0.35,
                  type: 'spring',
                  stiffness: 100,
                  ease: 'linear',
                }}
                onMouseLeave={handleShowMenu}
                className="absolute top-[0%] p-8 w-max center-col items-start bg-black z-50"
              >
                <div className="center-col">
                  <div className="rounded-[50%] overflow-hidden relative">
                    <img
                      src="https://picsum.photos/200"
                      width={50}
                      height={50}
                      alt=""
                    />
                  </div>
                  <h2 className="text-xl">
                    Hi,{' '}
                    <span>{capitalizeWords(userData && userData.name)}</span>
                  </h2>
                </div>
                {role === 'admin' && (
                  <Link
                    onClick={handleShowMenu}
                    to={'/admin/dashboard'}
                    className="text-xl"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  onClick={handleShowMenu}
                  to={'/user-profile'}
                  className="text-xl"
                >
                  Profile
                </Link>
                <Link
                  onClick={handleShowMenu}
                  to={`/user-profile/user-lists/favorites?list_id=${
                    userData &&
                    userData.lists.find((list) => list.listName === 'favorites')
                      .listID
                  }`}
                  className="text-xl"
                >
                  Favorites
                </Link>
                <Link
                  onClick={handleShowMenu}
                  to={`/user-profile/user-lists/watchlist?list_id=${
                    userData &&
                    userData.lists.find((list) => list.listName === 'watchlist')
                      .listID
                  }`}
                  className="text-xl"
                >
                  Watchlist
                </Link>
                <Link
                  onClick={handleShowMenu}
                  to={'/user-profile/user-lists'}
                  className="text-xl"
                >
                  Your lists
                </Link>
                <div>
                  <button onClick={handleLogOut} className="text-xl">
                    Sign Out
                  </button>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </header>
  );
}
