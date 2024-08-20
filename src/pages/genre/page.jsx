import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Heading } from 'components/UI/heading/heading';
import { movieGenres, tvGenres } from 'utils/keys/tmdbGenres';
import { motion as m } from 'framer-motion';

export default function Genre() {
  const [toggleGenres, setToggleGenres] = useState(true);

  function toggleGenresFn() {
    setToggleGenres(!toggleGenres);
  }

  return (
    <section className="w-full col-span-12 p-10 max-w-[1200px] m-auto">
      <div className="center">
        <Heading
          title={'Movies Genres'}
          toggleGen={toggleGenresFn}
          customStyle={`cursor-pointer ${!toggleGenres ? 'opacity-50' : ''}`}
        />
        <Heading
          title={'TV Genres'}
          toggleGen={toggleGenresFn}
          customStyle={`cursor-pointer ${toggleGenres ? 'opacity-50' : ''}`}
        />
      </div>
      {toggleGenres && (
        <ul className="flex-wrap w-full gap-5 center">
          {movieGenres.map((genre) => {
            return (
              <Link
                to={`/genre/${genre.name.toLowerCase()}?${new URLSearchParams({
                  movie_or_tv: toggleGenres ? 'movie' : 'tv',
                  genre_id: genre.id,
                }).toString()}`}
                key={genre.id}
              >
                <m.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-[200px] h-[200px] border-2 rounded-md center text-[25px] font-bold p-4 bg-black/70"
                >
                  <span className="text-center">{genre.name}</span>
                </m.li>
              </Link>
            );
          })}
        </ul>
      )}
      {!toggleGenres && (
        <ul className="flex-wrap w-full gap-5 center">
          {tvGenres.map((genre) => {
            return (
              <Link
                to={`/genre/${genre.name.toLowerCase()}?${new URLSearchParams({
                  movie_or_tv: toggleGenres ? 'movie' : 'tv',
                  genre_id: genre.id,
                }).toString()}`}
                key={genre.id}
              >
                <m.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-[200px] h-[200px] border-2 rounded-md center text-[25px] font-bold p-4 bg-black/70"
                >
                  <span className="text-center">{genre.name}</span>
                </m.li>
              </Link>
            );
          })}
        </ul>
      )}
    </section>
  );
}
