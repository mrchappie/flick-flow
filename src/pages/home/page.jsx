import Carousel from 'components/carousel/carousel';
import ForYou from 'components/forYou/forYou';
import LatestMovies from 'components/latestMovies/latestMovies';
import MostPopular from 'components/mostPopular/mostPopular';
import withAuth from 'utils/hoc/withAuth';

export default withAuth(function Home() {
  return (
    <>
      <Carousel />
      <LatestMovies />
      <ForYou />
      <MostPopular />
    </>
  );
});
