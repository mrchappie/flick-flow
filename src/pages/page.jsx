import UpcomingMovies from 'components/sections/upcomingMovies/upcomingMovies';
import LandingPageHeroSection from '../components/hero-section/landing-page-hero-section';
import UpcomingTV from 'components/sections/upcomingTV/upcomingTV';

export default function LandingPage() {
  const customStyle =
    'max-lg:justify-start max-lg:mx-12 max-lg:overflow-x-scroll';

  return (
    <div className="p-10 col-span-full">
      <LandingPageHeroSection />
      <UpcomingMovies style={customStyle} />
      <UpcomingTV style={customStyle} />
    </div>
  );
}
