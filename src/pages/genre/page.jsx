import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Heading } from 'components/UI/heading/heading';
import { movieGenres, tvGenres } from 'utils/keys/tmdbGenres';
import { motion as m } from 'framer-motion';
import './genre.css';

export default function Genre() {
  const [toggleGenres, setToggleGenres] = useState('movie');

  function toggleGenresFn(param) {
    setToggleGenres(param);
  }

  return (
    <section className="w-full col-span-8 col-start-3 p-10 m-auto">
      <div className="relative items-end justify-between gap-0 center">
        <div
          className={`relative z-10 border-4 w-[25%] center px-2 py-4 justify-start ${
            toggleGenres === 'movie'
              ? 'border-brand2 border-b-transparent rounded-t-md bg-black/75 movie-genre-border'
              : 'border-transparent border-b-brand3'
          }`}
        >
          <Heading
            title={'Movies Genres'}
            toggleGen={() => {
              toggleGenresFn('movie');
            }}
            customStyle={`justify-start cursor-pointer m-0 ${
              toggleGenres === 'movie' ? '' : 'opacity-75'
            } hover:text-brand2`}
          />
        </div>
        <div
          className={`relative z-0 border-b-4 h-full grow devider-border border-${
            toggleGenres === 'movie' ? 'brand2' : 'brand3'
          }`}
        ></div>
        <div
          className={`relative z-10 border-4 w-[25%] center px-2 py-4 justify-end ${
            toggleGenres === 'tv'
              ? 'border-brand3 border-b-transparent rounded-t-md bg-black/75 tv-genre-border'
              : 'border-transparent border-b-brand2'
          }`}
        >
          <Heading
            title={'TV Genres'}
            toggleGen={() => {
              toggleGenresFn('tv');
            }}
            customStyle={`justify-end cursor-pointer m-0 ${
              toggleGenres === 'tv' ? '' : 'opacity-75'
            } hover:text-brand3`}
          />
        </div>
      </div>
      {toggleGenres === 'movie' && (
        <ul
          className={`relative flex-wrap w-full gap-5 p-2 center justify-evenly border-t-transparent rounded-b-md py-6 ${
            toggleGenres === 'movie' &&
            'border-4 border-brand2 bg-black/75 movie-genre-container'
          }`}
        >
          {movieGenres.map((genre) => {
            return (
              <Link
                to={`/genre/${genre.name.toLowerCase()}?${new URLSearchParams({
                  content_type: toggleGenres,
                  genre_id: genre.id,
                }).toString()}`}
                key={genre.id}
                className="hover:text-brand2"
              >
                <m.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative w-[200px] h-[200px] rounded-md center overflow-hidden items-end text-[25px] font-bold p-4 bg-black shadow-md shadow-white/75 hover:border-brand2 hover:shadow-brand2"
                >
                  <img
                    src={`/images/genre_img/movie/${genre.name}.png`}
                    alt=""
                    className="absolute object-cover"
                  />
                  <span className="z-10 text-center">{genre.name}</span>
                </m.li>
              </Link>
            );
          })}
        </ul>
      )}
      {toggleGenres === 'tv' && (
        <ul
          className={`relative flex-wrap w-full gap-5 p-2 center justify-evenly border-t-transparent rounded-b-md py-6 ${
            toggleGenres === 'tv' &&
            'border-4 border-brand3 bg-black/75 tv-genre-container'
          }`}
        >
          {tvGenres.map((genre) => {
            return (
              <Link
                to={`/genre/${genre.name.toLowerCase()}?${new URLSearchParams({
                  content_type: toggleGenres,
                  genre_id: genre.id,
                }).toString()}`}
                key={genre.id}
                className="hover:text-brand3"
              >
                <m.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative w-[200px] h-[200px] rounded-md center overflow-hidden items-end text-[25px] font-bold p-4 bg-black shadow-md shadow-white/75 hover:border-brand3 hover:shadow-brand3"
                >
                  <img
                    src={`/images/genre_img/tv/${genre.name}.png`}
                    alt=""
                    className="absolute object-cover"
                  />
                  <span className="z-10 text-center">{genre.name}</span>
                </m.li>
              </Link>
            );
          })}
        </ul>
      )}
    </section>
  );
}
