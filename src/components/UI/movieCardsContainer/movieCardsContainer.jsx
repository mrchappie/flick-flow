import { useMemo, useState } from 'react';
import { ButtonTextBg } from '../buttons/buttons';
import Filters from '../filters/filters';
import Heading from '../heading/heading';
import MovieCard from '../movieCard/movieCard';
import { v4 as uuid } from 'uuid';
import { data } from 'data';

export default function MovieCardsContainer({ title }) {
  const [showFilters, setShowFilters] = useState(false);

  function handleClick() {
    setShowFilters(!showFilters);
  }

  const movieDetails = useMemo(() => {
    const movies = [...data];

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

  // const movieDetails = {
  //   title: 'Greenland',
  //   year: '2020',
  //   poster: '/images/movie_poster.jpg',
  //   movieID: uuid(),
  //   addedByUser: false,
  // };

  return (
    <section className="w-full col-span-full center-col">
      <div className="justify-between w-full center">
        <Heading title={title} />
        <ButtonTextBg title="Filters" handleClick={handleClick} />
      </div>
      {showFilters && <Filters />}
      <div className="my-[50px] w-full h-full center flex-wrap">
        {movieDetails.map((movie) => {
          return (
            <MovieCard details={movie} key={movie.movieID + Math.random()} />
          );
        })}
      </div>
    </section>
  );
}
