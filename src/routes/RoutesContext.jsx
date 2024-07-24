import NotFound from 'pages/not-found';
import LandingPage from 'pages/page';
import Home from '../pages/home/page';
import Movies from '../pages/movies/page';
import TvShows from '../pages/tv-shows/page';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from 'pages/login/page';
import Register from 'pages/register/page';
import Details from 'pages/details/page';
import Genre from 'pages/genre/page';
import UserProfile from 'pages/user-profile/page';
import WatchList from 'pages/user-profile/watchlist/page';
import WatchHistory from 'pages/user-profile/watch-history/page';
import Settings from 'pages/user-profile/settings/page';
import GenreCategory from 'pages/genre/[genreID]/page';
import PrivateRoute from 'utils/hoc/PrivateRoute';
import Favorites from 'pages/user-profile/favorites/page';
import UserLists from 'pages/user-profile/user-lists/userLists';
import List from 'pages/user-profile/user-lists/[list]';
import AnonymousRoute from 'utils/hoc/AnonymousRoute';
import Search from 'pages/search/Search';
import ManageUsers from 'pages/admin/manage-users/manageUsers';
import ManageLists from 'pages/admin/manage-lists/manageLists';
import Dashboard from 'pages/admin/dashboard/dashboard';
import AdminRoute from 'utils/hoc/AdminRoute';

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
      <AnonymousRoute redirectTo="/login">
        <Login />
      </AnonymousRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <AnonymousRoute redirectTo="/register">
        <Register />
      </AnonymousRoute>
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
        <List />
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
