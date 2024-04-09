import MovieCard from 'components/UI/movieCard/movieCard';
import Title from 'components/UI/heading/heading';
import { v4 as uuid } from 'uuid';

const movieDetails = {
  title: 'Greenland',
  year: '2020',
  poster: '/images/movie_poster.jpg',
  movieID: uuid(),
};

export default function ForYou() {
  return (
    <section className="items-start w-full gap-6 my-12 col-span-full center-col">
      <Title title="For You" />
      <section className="items-start gap-4 center">
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
        <MovieCard details={movieDetails} />
      </section>
    </section>
  );
}
