'use client';

import { LoadingSpinner } from '@components/UI/loadingSpinner/loadingSpinner';
import LandingPageHeroSection from '@components/hero-section/landing-page-hero-section';
import LatestMovies from '@components/latestMovies/latestMovies';
import LatestShows from '@components/latestShows/latestShows';
import useAPI from '@hooks/useAPI';
import { useStateStore } from '@services/state/State';

export default function LandingPage() {
  const showPageSpinner = useStateStore((state) => state.showPageSpinner);
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
