import { LoadingSpinner } from '../components/UI/loadingSpinner/loadingSpinner';
import LandingPageHeroSection from '../components/hero-section/landing-page-hero-section';
import LatestMovies from '../components/latestMovies/latestMovies';
import LatestShows from '../components/latestShows/latestShows';
import useAPI from '../utils/hooks/useAPI';
import { useStateStore } from '../utils/services/state/State';

export default function LandingPage() {
  // const showPageSpinner = useStateStore((state) => state.showPageSpinner);
  const showPageSpinner = false;
  // useAPI({
  //   method: 'GET',
  //   paths: {
  //     category: 'movie',
  //     subCategory: ['tt0116629'],
  //     params: { language: 'en-US', page: '1' },
  //   },
  // });

  return (
    <>
      {showPageSpinner && <LoadingSpinner />}
      {!showPageSpinner && (
        <>
          <LandingPageHeroSection />
          <LatestMovies />
          <LatestShows />
        </>
      )}
    </>
  );
}
