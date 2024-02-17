'use client';

import LandingPageHeroSection from '@/components/hero-section/landing-page-hero-section';
import LatestMovies from '@/components/latestMovies/latestMovies';
import LatestShows from '@/components/latestShows/latestShows';
import { useEffect } from 'react';
import { getCurrentUser } from 'utils/services/auth/Auth';

export default function LandingPage() {
  useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        await getCurrentUser();
      } catch (error) {
        console.log(error);
      }
    };

    isUserLoggedIn();
  }, []);

  return (
    <>
      <LandingPageHeroSection />
      <LatestMovies />
      <LatestShows />
    </>
  );
}
