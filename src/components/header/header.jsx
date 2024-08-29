import DesktopNavigation from '../nav/desktopNavigation';
import Search from '../searchBar/searchBar';
import { logoutUser } from 'utils/services/auth/Auth';
import { useStateStore } from 'utils/services/state/State';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonTextNoBgWithBorder } from 'components/UI/buttons/buttons';
import { useEffect, useState } from 'react';
import MobileNavigation from 'components/nav/mobileNavigation';

export default function Header() {
  const { isLoggedIn } = useStateStore();
  const { userData } = useStateStore();
  const { updateIsLoggedIn, role } = useStateStore();
  const [isOpen, toggleOpen] = useState(false);

  const [headerBg, setHeaderBg] = useState(false);

  const navigate = useNavigate();

  // handle logout
  const handleLogOut = async () => {
    await logoutUser();
    closeNavigation();
    // redirect to landing page and then set to false login state
    updateIsLoggedIn(false);
    navigate('/');
  };

  function openNavigation() {
    toggleOpen(true);
  }
  function closeNavigation() {
    toggleOpen(false);
  }

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
      <DesktopNavigation customStyle={'max-sm:hidden'} />
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
            onClick={openNavigation}
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
          <MobileNavigation
            handleLogOut={handleLogOut}
            role={role}
            userData={userData}
            closeNavigation={closeNavigation}
            isOpen={isOpen}
          />
        </div>
      )}
    </header>
  );
}
