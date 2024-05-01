import Heading from 'components/UI/heading/heading';
import MovieCard from 'components/UI/movieCard/movieCard';
import { v4 as uuid } from 'uuid';

const movieDetails = {
  title: 'Godzilla x Kong: The New Empire',
  year: '2020',
  poster: `${process.env.REACT_APP_TMDB_IMAGE_API_ORIGIN}/original/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg`,
  movieID: uuid(),
  addedByUser: false,
};
export default function LatestMovies() {
  return (
    <section className="items-start w-full gap-6 my-12 col-span-full center-col">
      <Heading title="Latest Movies" />
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
