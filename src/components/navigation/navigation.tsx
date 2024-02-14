import Link from 'next/link';

// navigation bar routes
const routes: Route[] = [
  { path: 'home', name: 'Home' },
  { path: 'movies', name: 'Movies' },
  { path: 'tv-shows', name: 'TV Shows' },
  { path: 'genre', name: 'Genre' },
];

export default function Navigation() {
  return (
    <div>
      <ul className="center gap-8">
        {routes.map((route) => {
          return (
            <li key={route.path}>
              <Link href={`/${route.path}`} className="py-4 px-6 block">
                {route.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface Route {
  path: string;
  name: string;
  icon?: string;
}
