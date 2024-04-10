import NotFound from 'pages/not-found';
import LandingPage from 'pages/page';
import Home from '../pages/home/page';
import Movies from '../pages/movies/page';
import TvShows from '../pages/tv-shows/page';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from 'pages/login/page';
import Register from 'pages/register/page';
import Details from 'pages/details/page';
import Genre from 'pages/genre/page';
import UserProfile from 'pages/user-profile/page';
import WatchList from 'pages/user-profile/watchlist/page';
import WatchHistory from 'pages/user-profile/watch-history/page';
import Settings from 'pages/user-profile/settings/page';
import GenreCategory from 'pages/genre/[genreID]/page';
import Header from 'components/header/header';
import PrivateRoute from 'utils/hoc/PrivateRoute';
import Favorites from 'pages/user-profile/favorites/page';
import UserLists from 'pages/user-profile/user-lists/userLists';
import List from 'pages/user-profile/user-lists/[list]';

function RoutesContext(props) {
  const routes = [
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
      path: '/home',
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    { path: '/movies', element: <Movies /> },
    { path: '/tv-shows', element: <TvShows /> },
    {
      path: '/details',
      element: (
        <PrivateRoute>
          <Details />
        </PrivateRoute>
      ),
    },
    { path: '/genre', element: <Genre /> },
    { path: '/genre/:genreID', element: <GenreCategory /> },
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
    { path: '*', element: <NotFound /> },
  ];

  return (
    <BrowserRouter>
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main>
        {props.children}

        {/* Routes */}
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      {/* Footer */}
    </BrowserRouter>
  );
}

export default RoutesContext;
