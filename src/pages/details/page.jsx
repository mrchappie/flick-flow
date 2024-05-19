import ForYou from 'components/forYou/forYou';
import { ButtonWithTextAndIcon } from 'components/UI/buttons/buttons';
import Heading from 'components/UI/heading/heading';
import MovieCard from 'components/UI/movieCard/movieCard';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {
  MdFormatListBulletedAdd,
  MdFileDownload,
  MdOutlineShare,
} from 'react-icons/md';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getMovieById, getRandomMovies } from 'data';

export default function Details() {
  const forYouMoviesContainerWidth = useRef(null);

  const [
    customMovieCardStyleForDetailsPage,
    setCustomMovieCardStyleForDetailsPage,
  ] = useState({
    width: '207px',
    aspectRatio: '9/16',
  });

  useEffect(() => {
    setCustomMovieCardStyleForDetailsPage({
      ...customMovieCardStyleForDetailsPage,
      width: `${forYouMoviesContainerWidth / 2 - 16}px`,
    });
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    const movieID = searchParams.get('movie_id');

    setMovieDetail(getMovieById(movieID));
  }, [searchParams]);

  // console.log(movieID);
  // const movieDetails = {
  //   title: 'Greenland',
  //   year: '2020',
  //   poster: '/images/movie_poster.jpg',
  //   movieID: uuid(),
  // };

  const movieDetails = useMemo(() => {
    const movies = getRandomMovies().slice(4);

    return movies.map((movie) => {
      return {
        poster: `${process.env.REACT_APP_TMDB_IMAGE_API_ORIGIN}/original/${movie.poster_path}`,
        description: movie.overview,
        title: movie.original_title,
        duration: '120',
        year: movie.release_date,
        genre: movie.genre_ids,
        movieID: movie.id,
      };
    });
  }, []);

  function formatRunningTime(time) {
    // time is minutes
    const hours = Math.floor(time / 60);
    const minutes = time - hours * 60;
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
  }

  const genres = ['action', 'comedy', 'sf', 'horror'];

  return (
    <section className="grid grid-cols-12 gap-8 px-10 col-span-full">
      <section className="justify-start w-full h-full col-span-9 center-col">
        <div className="w-full h-[65%] relative">
          <img
            src={`${process.env.REACT_APP_TMDB_IMAGE_API_ORIGIN}/original/${movieDetail.backdrop_path}`}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <header className="h-[30%] w-full center-col justify-start gap-10">
          <div className="justify-between w-full center">
            <div className="items-start center-col">
              <Heading title={`${movieDetail.title}`} />
              <div className="text-xl font-semibold center">
                <span>{movieDetail['release_date']}</span>
                <span>&#8226;</span>
                <span>{formatRunningTime(120)}</span>
              </div>
              <div className="text-white/50 center">
                {/* {movieDetail['genre_ids'].map((genre) => {
                  return <span key={genre}>{genre}</span>;
                })} */}
              </div>
            </div>
            <div className="justify-start center">
              <ButtonWithTextAndIcon>
                <MdFormatListBulletedAdd className="text-2xl" />
                <span>Watchlist</span>
              </ButtonWithTextAndIcon>
              <ButtonWithTextAndIcon>
                <MdOutlineShare className="text-2xl" />
                <span>Share</span>
              </ButtonWithTextAndIcon>
              <ButtonWithTextAndIcon>
                <MdFileDownload className="text-2xl" />
                <span>Download</span>
              </ButtonWithTextAndIcon>
            </div>
          </div>
          <div className="w-full">
            <h2 className="py-2 text-2xl font-semibold">Description</h2>
            <p className="text-white/50 text-md">{movieDetail.overview}</p>
          </div>
        </header>
      </section>
      <section className="justify-start h-full col-span-3 center-col">
        <Heading title={'Movies for you'} />
        <div
          className="grid grid-cols-2 gap-4"
          ref={forYouMoviesContainerWidth}
        >
          {movieDetails.map((movie) => {
            return (
              <MovieCard
                key={movie.movieID + Math.random()}
                details={movie}
                customStyle={customMovieCardStyleForDetailsPage}
              />
            );
          })}
        </div>
      </section>
      <ForYou />
    </section>
  );
}
