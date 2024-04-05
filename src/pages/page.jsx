import { LoadingSpinner } from '../components/UI/loadingSpinner/loadingSpinner';
import LandingPageHeroSection from '../components/hero-section/landing-page-hero-section';
import LatestMovies from '../components/latestMovies/latestMovies';
import LatestShows from '../components/latestShows/latestShows';
import useAPI from '../utils/hooks/useAPI';
import { useStateStore } from '../utils/services/state/State';

export default function LandingPage() {
  // const showPageSpinner = useStateStore((state) => state.showPageSpinner);
  const showPageSpinner = false;
  useAPI({ movieId: 'tt0116629' });

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
