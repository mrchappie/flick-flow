import LandingPageHeroSection from '@/components/hero-section/landing-page-hero-section';
import ForYou from '@/components/landingPageComponents/forYou/forYou';
import LatestMovies from '@/components/landingPageComponents/latestMovies/latestMovies';
import MostPopular from '@/components/landingPageComponents/mostPopular/mostPopular';

export default function LandingPage() {
  return (
    <>
      <LandingPageHeroSection />
      <LatestMovies />
      <MostPopular />
      <ForYou />
    </>
  );
}
