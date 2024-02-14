import MovieCard, { MovieDetails } from '@/UI/movieCard/movieCard';
import Title from '@/UI/title/title';

const movieDetails: MovieDetails = {
  title: 'Greenland',
  year: '2020',
  poster: '/images/movie_poster.jpg',
  movieID: '121213412qsadnd7asda',
};

export default function ForYou() {
  return (
    <section className="col-span-full w-full center-col gap-6 items-start my-12">
      <Title title="For You" />
      <section className="center items-start gap-4">
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
        <MovieCard {...movieDetails} />
      </section>
    </section>
  );
}
