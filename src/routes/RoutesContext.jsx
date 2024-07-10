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
import Footer from 'components/footer/footer';
import Search from 'pages/search/Search';

const router = createBrowserRouter([
  {
    element: (
      <AnonymousRoute redirectTo="/">
        <Header />
        <LandingPage />
        <Footer />
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
        <Footer />
      </AnonymousRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <AnonymousRoute redirectTo="/register">
        <Header />
        <Register />
        <Footer />
      </AnonymousRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <PrivateRoute>
        <Header />
        <Home />
        <Footer />
      </PrivateRoute>
    ),
  },
  {
    path: '/movies',
    element: (
      <>
        <Header />
        <Movies />
        <Footer />
      </>
    ),
  },
  {
    path: '/tv-shows',
    element: (
      <>
        <Header />
        <TvShows />
        <Footer />
      </>
    ),
  },
  {
    path: '/search',
    element: (
      <>
        <Header />
        <Search />
        <Footer />
      </>
    ),
  },
  {
    path: '/details',
    element: (
      <PrivateRoute>
        <Header />
        <Details />
        <Footer />
      </PrivateRoute>
    ),
  },
  {
    path: '/genre',
    element: (
      <>
        <Header />
        <Genre />
        <Footer />
      </>
    ),
  },
  {
    path: '/genre/:genreName',
    element: (
      <>
        <Header />
        <GenreCategory />
        <Footer />
      </>
    ),
  },
  {
    path: '/user-profile',
    element: (
      <PrivateRoute>
        <Header />
        <UserProfile />
        <Footer />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/settings',
    element: (
      <PrivateRoute>
        <Header />
        <Settings />
        <Footer />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/watchlist',
    element: (
      <PrivateRoute>
        <Header />
        <WatchList />
        <Footer />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/favorites',
    element: (
      <PrivateRoute>
        <Header />
        <Favorites />
        <Footer />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/watch-history',
    element: (
      <PrivateRoute>
        <Header />
        <WatchHistory />
        <Footer />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/user-lists',
    element: (
      <PrivateRoute>
        <Header />
        <UserLists />
        <Footer />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-profile/user-lists/:listID',
    element: (
      <PrivateRoute>
        <Header />
        <List />
        <Footer />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <Header />
        <NotFound />
        <Footer />
      </>
    ),
  },
]);

function RoutesContext() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default RoutesContext;
