import Carousel from 'components/carousel/carousel';
import NowPlayingMovies from 'components/sections/nowPlayingMovies/nowPlayingMovies';
import MostPopularMovies from 'components/sections/mostPopularMovies/mostPopularMovies';
import UpcomingMovies from 'components/sections/upcomingMovies/upcomingMovies';
import { useState } from 'react';
import { ButtonTextNoBgWithBorder } from 'components/UI/buttons/buttons';
import OnTheAirShows from 'components/sections/airingTodayShows/airingTodayShows';
import UpcomingTV from 'components/sections/upcomingTV/upcomingTV';
import MostPopularTV from 'components/sections/mostPopularTV/mostPopularTV';
export default function Home() {
  const [chooseItemsToSee, setChooseItemsToSee] = useState('movie');

  const customStyle =
    'max-lg:justify-start max-lg:mx-12 max-lg:overflow-x-scroll';

  return (
    <>
      <Carousel />
      <div className="flex gap-4 mt-[40px] col-span-full p-4">
        <ButtonTextNoBgWithBorder
          handleClick={() => {
            setChooseItemsToSee('movie');
          }}
          customStyle={`min-w-[100px] ${
            chooseItemsToSee !== 'movie' && 'grayscale'
          }`}
        >
          Movies
        </ButtonTextNoBgWithBorder>
        <ButtonTextNoBgWithBorder
          handleClick={() => {
            setChooseItemsToSee('tv');
          }}
          customStyle={`min-w-[100px] ${
            chooseItemsToSee !== 'tv' && 'grayscale'
          }`}
        >
          TV-shows
        </ButtonTextNoBgWithBorder>
      </div>
      {chooseItemsToSee === 'movie' && (
        <>
          <NowPlayingMovies style={customStyle} />
          <UpcomingMovies style={customStyle} />
          <MostPopularMovies style={customStyle} />
        </>
      )}
      {chooseItemsToSee === 'tv' && (
        <>
          <OnTheAirShows style={customStyle} />
          <UpcomingTV style={customStyle} />
          <MostPopularTV style={customStyle} />
        </>
      )}
    </>
  );
}
