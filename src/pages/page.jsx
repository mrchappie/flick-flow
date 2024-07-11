import { LoadingSpinner } from '../components/UI/loadingSpinner/loadingSpinner';
import LandingPageHeroSection from '../components/hero-section/landing-page-hero-section';
import LatestMovies from '../components/latestMovies/latestMovies';
import LatestShows from '../components/latestShows/latestShows';

export default function LandingPage() {
  // const showPageSpinner = useStateStore((state) => state.showPageSpinner);
  const showPageSpinner = false;

  return (
    <>
      {showPageSpinner && <LoadingSpinner />}
      {!showPageSpinner && (
        <div className="p-10 col-span-full">
          <LandingPageHeroSection />
          <LatestMovies />
          <LatestShows />
        </div>
      )}
    </>
  );
}
