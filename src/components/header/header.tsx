'use client';

import Link from 'next/link';
import Navigation from '../navigation/navigation';
import Search from '../search/search';
import { logoutUser } from 'utils/services/auth/Auth';

export default function Header() {
  return (
    <header className="center justify-evenly bg-custom-bg-fade">
      <div>
        <Link href={'/'}>Logo</Link>
      </div>
      <Navigation />
      <Search />
      <div>
        <Link href={'/login'}>Sign In</Link>
      </div>
      <div>
        <button onClick={logoutUser}>Sign Out</button>
      </div>
    </header>
  );
}
