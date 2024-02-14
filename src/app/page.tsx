import Carousel from '@/components/carousel/carousel';
import LandingPageHeroSection from '@/components/hero-section/landing-page-hero-section';
import ForYou from '@/components/landingPageComponents/forYou/forYou';
import LatestMovies from '@/components/landingPageComponents/latestMovies/latestMovies';
import MostPopular from '@/components/landingPageComponents/mostPopular/mostPopular';

export default function LandingPage() {
  const loggedIn = true;

  return (
    <>
      {!loggedIn && <LandingPageHeroSection />}
      {loggedIn && <Carousel />}
      <LatestMovies />
      <MostPopular />
      <ForYou />
    </>
  );
}
