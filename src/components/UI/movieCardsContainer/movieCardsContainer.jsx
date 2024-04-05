'use client';
import { useState } from 'react';
import ButtonMain from '../buttons/buttonMain';
import Filters from '../filters/filters';
import Heading from '../heading/heading';
import MovieCard from '../movieCard/movieCard';

export default function MovieCardsContainer({ title }) {
  const [showFilters, setShowFilters] = useState(false);

  function handleClick() {
    setShowFilters(!showFilters);
  }

  const movieDetails = {
    title: 'Greenland',
    year: '2020',
    poster: '/images/movie_poster.jpg',
    movieID: '121213412qsadnd7asda',
  };

  const arr = new Array(20).fill(0);

  return (
    <section className="w-full col-span-full center-col">
      <div className="justify-between w-full center">
        <Heading title={title} />
        <ButtonMain title="Filters" handleClick={handleClick} />
      </div>
      {showFilters && <Filters />}
      <div className="my-[50px] w-full h-full center flex-wrap">
        {arr.map((_, index) => {
          return <MovieCard details={movieDetails} key={index} />;
        })}
      </div>
    </section>
  );
}
