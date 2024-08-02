import UpcomingMovies from 'components/sections/upcomingMovies/upcomingMovies';
import LandingPageHeroSection from '../components/hero-section/landing-page-hero-section';
import UpcomingTV from 'components/sections/upcomingTV/upcomingTV';

export default function LandingPage() {
  return (
    <div className="p-10 col-span-full">
      <LandingPageHeroSection />
      <UpcomingMovies />
      <UpcomingTV />
    </div>
  );
}
