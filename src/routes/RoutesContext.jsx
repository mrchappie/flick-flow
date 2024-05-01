import NotFound from 'pages/not-found';
import LandingPage from 'pages/page';
import Home from '../pages/home/page';
import Movies from '../pages/movies/page';
import TvShows from '../pages/tv-shows/page';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import Header from 'components/header/header';

const router = createBrowserRouter([
  {
    element: (
      <AnonymousRoute redirectTo="/">
        <Header />
        <LandingPage />
      </AnonymousRoute>
    ),
    path: '/',
  },
  {
    path: '/login',
    element: (
      <AnonymousRoute redirectTo="/login">
        <Header />
        <Login />
      </AnonymousRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <AnonymousRoute redirectTo="/register">
        <Header />
        <Register />
      </AnonymousRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <PrivateRoute>
        <Header />
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: '/movies',
    element: (
      <>
        <Header />
        <Movies />
      </>
    ),
  },
  {
    path: '/tv-shows',
    element: (
      <>
        <Header />
        <TvShows />
      </>
    ),
  },
  {
    path: '/details',
    element: (
      <PrivateRoute>
        <Header />
        <Details />
      </PrivateRoute>
    ),
  },
  {
    path: '/genre',
    element: (
      <>
        <Header />
        <Genre />
      </>
    ),
  },
  {
    path: '/genre/:genreID',
    element: (
      <>
        <Header />
        <GenreCategory />
      </>
    ),
  },
  {
    path: '/user-profile',
    element: (
      <PrivateRoute>
        <Header />
        <UserProfile />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/settings',
    element: (
      <PrivateRoute>
        <Header />
        <Settings />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/watchlist',
    element: (
      <PrivateRoute>
        <Header />
        <WatchList />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/favorites',
    element: (
      <PrivateRoute>
        <Header />
        <Favorites />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/watch-history',
    element: (
      <PrivateRoute>
        <Header />
        <WatchHistory />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/user-lists',
    element: (
      <PrivateRoute>
        <Header />
        <UserLists />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/user-lists/:listID',
    element: (
      <PrivateRoute>
        <Header />
        <List />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <Header />
        <NotFound />
      </>
    ),
  },
]);

function RoutesContext() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default RoutesContext;
