import Navigation from '../navigation/navigation';
import Search from '../searchBar/searchBar';
import { logoutUser } from 'utils/services/auth/Auth';
import { useStateStore } from 'utils/services/state/State';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion as m, useCycle } from 'framer-motion';
import { capitalizeWords } from 'utils/utils';
import { ButtonTextNoBgWithBorder } from 'components/UI/buttons/buttons';
import { useEffect, useState } from 'react';

export default function Header() {
  const { isLoggedIn } = useStateStore();
  const { userData } = useStateStore();
  const { updateIsLoggedIn, role } = useStateStore();
  const [isOpen, toggleOpen] = useCycle(false, true);

  const [headerBg, setHeaderBg] = useState(false);

  const navigate = useNavigate();

  // handle logout
  const handleLogOut = async () => {
    await logoutUser();
    toggleOpen();
    // redirect to landing page and then set to false login state
    updateIsLoggedIn(false);
    navigate('/');
  };

  // event for scrolling on Y

  function setScrolllY() {
    if (window.scrollY > 50) {
      setHeaderBg(true);
    } else {
      setHeaderBg(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', setScrolllY);

    return () => {
      window.removeEventListener('scroll', setScrolllY);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 p-4 col-span-full center justify-evenly ${
        !headerBg
          ? 'bg-custom-bg-fade'
          : 'bg-black/75 backdrop-blur-md transition-opacity'
      }`}
    >
      <div className="max-lg:hidden">
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
          <ButtonTextNoBgWithBorder customStyle={'p-0'}>
            <Link to={'/login'} className="block p-3 font-bold">
              Sign In
            </Link>
          </ButtonTextNoBgWithBorder>
        </div>
      )}
      {isLoggedIn && (
        <div className="relative rounded-full center">
          <div
            onClick={toggleOpen}
            className="relative h-full cursor-pointer center"
          >
            <div className="rounded-[50%] overflow-hidden border-2 border-white z-20">
              <img
                src="https://picsum.photos/200"
                width={50}
                height={50}
                alt=""
              />
            </div>
          </div>
          <AnimatePresence>
            <m.nav
              variants={navVariants}
              initial={false}
              animate={isOpen ? 'open' : 'close'}
              onMouseLeave={toggleOpen}
              className="w-[54px] h-[54px] absolute top-0 left-[50%] z-10 center-col px-8 pt-[80px] pb-8 bg-black translate-x-[-50%] overflow-hidden"
            >
              <div className="center-col">
                <h2 className="text-xl italic font-extrabold">
                  Hi,&nbsp;
                  <span>
                    {userData && capitalizeWords(userData && userData.name)}
                  </span>
                </h2>
              </div>
              <hr className="w-full border-white" />
              {role === 'admin' && (
                <Link
                  onClick={toggleOpen}
                  to={'/admin/dashboard'}
                  className="text-xl"
                >
                  Dashboard
                </Link>
              )}
              <Link
                onClick={toggleOpen}
                to={'/user-profile'}
                className="text-xl"
              >
                Profile
              </Link>
              <Link
                onClick={toggleOpen}
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
                onClick={toggleOpen}
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
                onClick={toggleOpen}
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
            </m.nav>
          </AnimatePresence>
        </div>
      )}
    </header>
  );
}

const navVariants = {
  open: {
    borderRadius: '5%',
    width: '200px',
    height: '400px',
    display: 'flex',
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  close: {
    borderRadius: '100%',
    width: '54px',
    height: '54px',
    transitionEnd: { display: 'none' },
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};
