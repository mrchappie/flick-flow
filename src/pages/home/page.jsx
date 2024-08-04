import Carousel from 'components/carousel/carousel';
import NowPlayingMovies from 'components/sections/nowPlaying/nowPlayingMovies';
import MostPopularMovies from 'components/sections/mostPopular/mostPopularMovies';
import UpcomingMovies from 'components/sections/upcomingMovies/upcomingMovies';
export default function Home() {
  return (
    <>
      <Carousel />
      <NowPlayingMovies />
      <UpcomingMovies />
      <MostPopularMovies />
    </>
  );
}
