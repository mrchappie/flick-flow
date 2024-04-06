import Carousel from 'components/carousel/carousel';
import ForYou from 'components/forYou/forYou';
import LatestMovies from 'components/latestMovies/latestMovies';
import MostPopular from 'components/mostPopular/mostPopular';
export default function Home() {
  return (
    <>
      <Carousel />
      <LatestMovies />
      <ForYou />
      <MostPopular />
    </>
  );
}
