import LandingPageHeroSection from '@/components/hero-section/landing-page-hero-section';
import LatestMovies from '@/components/latestMovies/latestMovies';
import LatestShows from '@/components/latestShows/latestShows';

export default function LandingPage() {
  return (
    <>
      <LandingPageHeroSection />
      <LatestMovies />
      <LatestShows />
    </>
  );
}
