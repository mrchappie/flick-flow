import { AnimatePresence, motion as m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { capitalizeWords } from 'utils/utils';

export default function MobileNavigation({
  handleLogOut,
  role,
  userData,
  closeNavigation,
  isOpen,
}) {
  return (
    <AnimatePresence>
      <m.nav
        variants={navVariants(isOpen)}
        initial={false}
        animate={isOpen ? 'open' : 'close'}
        onMouseLeave={closeNavigation}
        className="w-[54px] h-[54px] absolute top-0 left-[50%] max-sm:left-[-50%] z-10 center-col px-8 pt-[80px] pb-8 bg-black translate-x-[-50%] overflow-hidden"
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
            onClick={closeNavigation}
            to={'/admin/dashboard'}
            className="text-xl"
          >
            Dashboard
          </Link>
        )}
        <Link
          onClick={closeNavigation}
          to={'/user-profile'}
          className="text-xl"
        >
          Profile
        </Link>
        <Link
          onClick={closeNavigation}
          to={`/user-profile/user-lists/favorites?list_id=${
            userData &&
            userData.lists.find((list) => list.listName === 'favorites').listID
          }`}
          className="text-xl"
        >
          Favorites
        </Link>
        <Link
          onClick={closeNavigation}
          to={`/user-profile/user-lists/watchlist?list_id=${
            userData &&
            userData.lists.find((list) => list.listName === 'watchlist').listID
          }`}
          className="text-xl"
        >
          Watchlist
        </Link>
        <Link
          onClick={closeNavigation}
          to={'/user-profile/user-lists'}
          className="text-xl"
        >
          Your lists
        </Link>
        <hr className="w-full border-white sm:hidden" />
        <div className="center-col sm:hidden">
          <Link onClick={closeNavigation} to={'/home'} className="text-xl">
            Home
          </Link>
          <Link onClick={closeNavigation} to={'/movies'} className="text-xl">
            Movies
          </Link>
          <Link onClick={closeNavigation} to={'/tv-shows'} className="text-xl">
            TV Shows
          </Link>
          <Link onClick={closeNavigation} to={'/genre'} className="text-xl">
            Genre
          </Link>
        </div>
        <hr className="w-full border-white sm:hidden" />
        <div>
          <button onClick={handleLogOut} className="text-xl">
            Sign Out
          </button>
        </div>
      </m.nav>
    </AnimatePresence>
  );
}

const navVariants = function (isOpen) {
  return {
    open: {
      borderRadius: '5%',
      width: '200px',
      height: !isOpen ? '400px' : '500px',
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
};
