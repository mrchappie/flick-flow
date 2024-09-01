import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Heading } from 'components/UI/heading/heading';
import { movieGenres, tvGenres } from 'utils/keys/tmdbGenres';
import { motion as m } from 'framer-motion';
import './genre.css';
import ConnectDB from 'utils/services/crud/crud';

const DB = new ConnectDB();

export default function Genre() {
  const [toggleGenres, setToggleGenres] = useState('movie');
  const [genreImages, setGenreImages] = useState(null);

  function toggleGenresFn(param) {
    setToggleGenres(param);
  }

  async function getGenreImages() {
    return await DB.getFirestoreDoc(['settings', 'genre']);
  }

  useEffect(() => {
    getGenreImages().then((res) => {
      setGenreImages(res.content);
    });
  }, []);

  return (
    <section className="w-full col-span-8 col-start-3 p-10 m-auto max-sm:col-span-full max-sm:col-start-1">
      <div className="relative items-end justify-between gap-0 center">
        <div
          className={`relative z-10 border-4 w-[25%] max-sm:w-[50%] center px-2 py-4 justify-start ${
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
          className={`relative z-0 border-b-4 h-full grow devider-border max-sm:hidden border-${
            toggleGenres === 'movie' ? 'brand2' : 'brand3'
          }`}
        ></div>
        <div
          className={`relative z-10 border-4 w-[25%] max-sm:w-[50%] center px-2 py-4 justify-end ${
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
      {genreImages && toggleGenres === 'movie' && (
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
                  className="relative w-[200px] h-[200px] max-sm:w-[150px] max-sm:h-[150px] rounded-md center overflow-hidden items-end text-[25px] font-bold bg-black shadow-md shadow-white/75 hover:border-brand2 hover:shadow-brand2"
                >
                  <img
                    src={`${
                      genreImages?.movie[
                        genre.name.replaceAll(' ', '_').toLowerCase()
                      ]?.url
                    }`}
                    alt=""
                    className="absolute object-cover w-full h-full"
                  />
                  <div className="absolute top-0 left-0 w-full h-full rotate-180 bg-custom-bg-fade"></div>
                  <span className="z-10 text-center">{genre.name}</span>
                </m.li>
              </Link>
            );
          })}
        </ul>
      )}
      {genreImages && toggleGenres === 'tv' && (
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
                  className="relative w-[200px] h-[200px] rounded-md center overflow-hidden items-end text-[25px] font-bold bg-black shadow-md shadow-white/75 hover:border-brand3 hover:shadow-brand3"
                >
                  <img
                    src={`${
                      genreImages?.tv[
                        genre.name.replaceAll(' ', '_').toLowerCase()
                      ]?.url
                    }`}
                    alt=""
                    className="absolute object-cover w-full h-full"
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
