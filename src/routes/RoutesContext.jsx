import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AdminRoute from 'utils/hoc/AdminRoute';
import AnonymousRoute from 'utils/hoc/AnonymousRoute';
import PrivateRoute from 'utils/hoc/PrivateRoute';
import WithScrollMemory from './WithScrollMemory';

const NotFound = WithScrollMemory(lazy(() => import('pages/not-found')));
const LandingPage = WithScrollMemory(lazy(() => import('pages/page')));
const Home = WithScrollMemory(lazy(() => import('../pages/home/page')));
const Movies = WithScrollMemory(lazy(() => import('../pages/movies/page')));
const TvShows = WithScrollMemory(lazy(() => import('../pages/tv-shows/page')));
const Login = WithScrollMemory(lazy(() => import('pages/login/page')));
const Register = WithScrollMemory(lazy(() => import('pages/register/page')));
const Details = WithScrollMemory(lazy(() => import('pages/details/page')));
const Genre = WithScrollMemory(lazy(() => import('pages/genre/page')));
const UserProfile = WithScrollMemory(
  lazy(() => import('pages/user-profile/page'))
);
const WatchList = WithScrollMemory(
  lazy(() => import('pages/user-profile/watchlist/page'))
);
const WatchHistory = WithScrollMemory(
  lazy(() => import('pages/user-profile/watch-history/page'))
);
const Settings = WithScrollMemory(
  lazy(() => import('pages/user-profile/settings/page'))
);
const GenreCategory = WithScrollMemory(
  lazy(() => import('pages/genre/[genreID]/page'))
);
const Favorites = WithScrollMemory(
  lazy(() => import('pages/user-profile/favorites/page'))
);
const UserLists = WithScrollMemory(
  lazy(() => import('pages/user-profile/user-lists/userLists'))
);
const UserList = WithScrollMemory(
  lazy(() => import('pages/user-profile/user-lists/[userList]'))
);
const Search = WithScrollMemory(lazy(() => import('pages/search/Search')));
const ManageUsers = WithScrollMemory(
  lazy(() => import('pages/admin/manage-users/manageUsers'))
);
const ManageLists = WithScrollMemory(
  lazy(() => import('pages/admin/manage-lists/manageLists'))
);
const Dashboard = WithScrollMemory(
  lazy(() => import('pages/admin/dashboard/dashboard'))
);
const List = WithScrollMemory(lazy(() => import('pages/list/list')));

const defaultRoutes = [
  {
    element: (
      <AnonymousRoute redirectTo="/">
        <LandingPage />
      </AnonymousRoute>
    ),
    path: '/',
  },
  {
    path: '/login',
    element: (
      // <AnonymousRoute redirectTo="/login">
      <Login />
      // </AnonymousRoute>
    ),
  },
  {
    path: '/register',
    element: (
      // <AnonymousRoute redirectTo="/register">
      <Register />
      // </AnonymousRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: '/movies',
    element: (
      <>
        <Movies />
      </>
    ),
  },
  {
    path: '/tv-shows',
    element: (
      <>
        <TvShows />
      </>
    ),
  },
  {
    path: '/:itemType/:list',
    element: (
      <>
        <List />
      </>
    ),
  },
  {
    path: '/search',
    element: (
      <>
        <Search />
      </>
    ),
  },
  {
    path: '/details',
    element: (
      <PrivateRoute>
        <Details />
      </PrivateRoute>
    ),
  },
  {
    path: '/genre',
    element: (
      <>
        <Genre />
      </>
    ),
  },
  {
    path: '/genre/:genreName',
    element: (
      <>
        <GenreCategory />
      </>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <NotFound />
      </>
    ),
  },
];

const userProfileRoutes = [
  {
    path: '',
    element: (
      <PrivateRoute>
        <UserProfile />
      </PrivateRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <PrivateRoute>
        <Settings />
      </PrivateRoute>
    ),
  },
  {
    path: '/watchlist',
    element: (
      <PrivateRoute>
        <WatchList />
      </PrivateRoute>
    ),
  },
  {
    path: '/favorites',
    element: (
      <PrivateRoute>
        <Favorites />
      </PrivateRoute>
    ),
  },
  {
    path: '/watch-history',
    element: (
      <PrivateRoute>
        <WatchHistory />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-lists',
    element: (
      <PrivateRoute>
        <UserLists />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-lists/:listName',
    element: (
      <PrivateRoute>
        <UserList />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <NotFound />
      </>
    ),
  },
];

const adminRoutes = [
  {
    path: '/dashboard',
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
  },
  {
    path: '/manage-users',
    element: (
      <AdminRoute>
        <ManageUsers />
      </AdminRoute>
    ),
  },
  {
    path: '/manage-lists',
    element: (
      <AdminRoute>
        <ManageLists />
      </AdminRoute>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <NotFound />
      </>
    ),
  },
];

function DefaultRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {defaultRoutes.map((route) => {
          return (
            <Route
              exact
              path={route.path}
              element={route.element}
              key={route.path}
            />
          );
        })}
      </Routes>
    </AnimatePresence>
  );
}

function UserProfileRoutes() {
  return (
    <Routes>
      {userProfileRoutes.map((route) => {
        return (
          <Route
            exact
            path={route.path}
            element={route.element}
            key={route.path}
          />
        );
      })}
    </Routes>
  );
}
function AdminRoutes() {
  return (
    <Routes>
      {adminRoutes.map((route) => {
        return (
          <Route
            exact
            path={route.path}
            element={route.element}
            key={route.path}
          />
        );
      })}
    </Routes>
  );
}

export { DefaultRoutes, UserProfileRoutes, AdminRoutes };
