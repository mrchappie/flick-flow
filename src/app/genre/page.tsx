import Link from 'next/link';

export default function Genre() {
  return (
    <>
      <div>Genres:</div>{' '}
      <ul>
        <li>
          <Link href="/genre/action">action</Link>
        </li>
        <li>
          <Link href="/genre/comedy">comedy</Link>
        </li>
        <li>
          <Link href="/genre/sf">sf</Link>
        </li>
        <li>
          <Link href="/genre/horror">horror</Link>
        </li>
        <li>
          <Link href="/genre/drama">drama</Link>
        </li>
      </ul>
    </>
  );
}
