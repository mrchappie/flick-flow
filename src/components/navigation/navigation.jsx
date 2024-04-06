import { Link } from 'react-router-dom';
import { useStateStore } from 'utils/services/state/State';

// navigation bar routes
const routes = [
  { path: 'home', name: 'Home', loggedIn: false },
  { path: 'movies', name: 'Movies', loggedIn: true },
  { path: 'tv-shows', name: 'TV Shows', loggedIn: true },
  { path: 'genre', name: 'Genre', loggedIn: false },
];

export default function Navigation() {
  const isLoggedIn = useStateStore((state) => state.isLoggedIn);

  function renderRoute(route) {
    if (isLoggedIn === true) {
      return route;
    }
    if (isLoggedIn === false) {
      return route.loggedIn === true;
    }
  }

  return (
    <div>
      <ul className="gap-8 center">
        {routes.map((route) => {
          if (renderRoute(route)) {
            return (
              <li key={route.path}>
                <Link to={`/${route.path}`} className="block px-6 py-4">
                  {route.name}
                </Link>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}
