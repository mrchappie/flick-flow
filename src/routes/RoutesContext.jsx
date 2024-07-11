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

const routes = [
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
    path: '/user-profile',
    element: (
      <PrivateRoute>
        <UserProfile />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/settings',
    element: (
      <PrivateRoute>
        <Settings />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/watchlist',
    element: (
      <PrivateRoute>
        <WatchList />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/favorites',
    element: (
      <PrivateRoute>
        <Favorites />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/watch-history',
    element: (
      <PrivateRoute>
        <WatchHistory />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/user-lists',
    element: (
      <PrivateRoute>
        <UserLists />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/user-lists/:listID',
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

function RoutesContext() {
  return (
    <Routes>
      {routes.map((route) => {
        return <Route exact path={route.path} element={route.element} />;
      })}
    </Routes>
  );
}

export default RoutesContext;
