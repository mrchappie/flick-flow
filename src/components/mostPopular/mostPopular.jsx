import MovieCard from 'components/UI/movieCard/movieCard';
import Title from 'components/UI/heading/heading';
import { v4 as uuid } from 'uuid';
import { useMemo } from 'react';
import { getRandomMovies } from 'data';

// const movieDetails = {
//   title: 'Greenland',
//   year: '2020',
//   poster: '/images/movie_poster.jpg',
//   movieID: uuid(),
// };

export default function MostPopular() {
  const movieDetails = useMemo(() => {
    const movies = getRandomMovies();

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

  return (
    <section className="items-start w-full gap-6 my-12 col-span-full center-col">
      <Title title="Most Popular" />
      <section className="items-start gap-4 center">
        {movieDetails.map((movie) => {
          return <MovieCard details={movie} />;
        })}
      </section>
    </section>
  );
}
