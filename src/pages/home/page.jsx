import Carousel from 'components/carousel/carousel';
import NowPlayingMovies from 'components/sections/nowPlaying/nowPlayingMovies';
import MostPopular from 'components/sections/mostPopular/mostPopular';
import UpcomingMovies from 'components/sections/upcomingMovies/upcomingMovies';
export default function Home() {
  return (
    <>
      <Carousel />
      <NowPlayingMovies />
      <UpcomingMovies />
      <MostPopular />
    </>
  );
}
