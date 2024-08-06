import { NavLink } from 'react-router-dom';
import { useStateStore } from 'utils/services/state/State';

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
                <NavLink
                  to={`${route.path}`}
                  className="block px-6 py-4 font-bold"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? '#f51a3b' : 'white',
                    };
                  }}
                >
                  {route.name}
                </NavLink>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}

// navigation bar routes
const routes = [
  { path: '/home', name: 'Home', loggedIn: false },
  { path: '/movies', name: 'Movies', loggedIn: true },
  { path: '/tv-shows', name: 'TV Shows', loggedIn: true },
  { path: '/genre', name: 'Genre', loggedIn: false },
];
