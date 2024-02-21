'use client';

import Link from 'next/link';
import Navigation from '../navigation/navigation';
import Search from '../search/search';
import { logoutUser } from 'utils/services/auth/Auth';
import useAuthCheck from '@hooks/useAuthCheck';
import Image from 'next/image';
import { useState } from 'react';
import { useStateStore } from '@services/state/State';

export default function Header() {
  const authCheck = useAuthCheck();
  const isLoggedIn = useStateStore((state) => state.isLoggedIn);

  const [toggleMenu, setToggleMenu] = useState(false);
  function handleShowMenu() {
    setToggleMenu(!toggleMenu);
  }

  return (
    <header className="center justify-evenly bg-custom-bg-fade p-4">
      <div>
        <Link href={'/'}>Logo</Link>
      </div>
      <Navigation />
      <Search />
      {!isLoggedIn && (
        <div>
          <Link href={'/login'}>Sign In</Link>
        </div>
      )}
      {isLoggedIn && (
        <div className="relative">
          <div
            onClick={handleShowMenu}
            className="relative h-full cursor-pointer center"
          >
            <div className="rounded-[50%] overflow-hidden border-2 border-white">
              <Image
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
                  <Image
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
              <Link href={'/user-profile'}>Profile</Link>
              <Link href={'/user-profile/watchlist'}>Watchlist</Link>
              <div>
                <button onClick={logoutUser}>Sign Out</button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
