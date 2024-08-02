import Carousel from 'components/carousel/carousel';
import LatestMovies from 'components/sections/latestMovies/latestMovies';
import MostPopular from 'components/sections/mostPopular/mostPopular';
import UpcomingMovies from 'components/sections/upcomingMovies/upcomingMovies';
export default function Home() {
  return (
    <>
      <Carousel />
      <LatestMovies />
      <UpcomingMovies />
      <MostPopular />
    </>
  );
}
