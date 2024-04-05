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

function RoutesContext(props) {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main>{props.children}</main>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/details" element={<Details />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/genre/:genreID" element={<GenreCategory />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-profile/settings" element={<Settings />} />
        <Route path="/user-profile/watchlist" element={<WatchList />} />
        <Route path="/user-profile/watch-history" element={<WatchHistory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer */}
    </BrowserRouter>
  );
}

export default RoutesContext;
