import MovieCard, { MovieDetails } from '@UI/movieCard/movieCard';
import Heading from '@components/UI/heading/heading';

const movieDetails: MovieDetails = {
  title: 'Greenland',
  year: '2020',
  poster: '/images/movie_poster.jpg',
  movieID: '121213412qsadnd7asda',
};

export default function LatestShows() {
  return (
    <section className="col-span-full w-full center-col gap-6 items-start my-12">
      <Heading title="Latest TV Shows" />
      <section className="center items-start gap-4">
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
