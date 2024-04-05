import { Link } from 'react-router-dom';

// navigation bar routes
const routes = [
  { path: 'home', name: 'Home' },
  { path: 'movies', name: 'Movies' },
  { path: 'tv-shows', name: 'TV Shows' },
  { path: 'genre', name: 'Genre' },
];

export default function Navigation() {
  return (
    <div>
      <ul className="gap-8 center">
        {routes.map((route) => {
          return (
            <li key={route.path}>
              <Link to={`/${route.path}`} className="block px-6 py-4">
                {route.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
