import Link from 'next/link';

export default function Movies() {
  return (
    <div className="w-full">
      <h1>Movies page</h1>
      <ul>
        <li>
          <Link href="/movies/movie1">Movie 1</Link>
        </li>
        <li>
          <Link href="/movies/movie2">Movie 2</Link>
        </li>
        <li>
          <Link href="/movies/movie3">Movie 3</Link>
        </li>
        <li>
          <Link href="/movies/movie4">Movie 4</Link>
        </li>
        <li>
          <Link href="/movies/movie5">Movie 5</Link>
        </li>
      </ul>
    </div>
  );
}
