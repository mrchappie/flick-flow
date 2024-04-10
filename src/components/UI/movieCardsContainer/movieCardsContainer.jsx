'use client';
import { useState } from 'react';
import ButtonMain from '../buttons/buttonMain';
import Filters from '../filters/filters';
import Heading from '../heading/heading';
import MovieCard from '../movieCard/movieCard';
import { v4 as uuid } from 'uuid';

export default function MovieCardsContainer({ title, data = [] }) {
  const [showFilters, setShowFilters] = useState(false);

  function handleClick() {
    setShowFilters(!showFilters);
  }

  console.log(data);

  const movieDetails = {
    title: 'Greenland',
    year: '2020',
    poster: '/images/movie_poster.jpg',
    movieID: uuid(),
  };

  return (
    <section className="w-full col-span-full center-col">
      <div className="justify-between w-full center">
        <Heading title={title} />
        <ButtonMain title="Filters" handleClick={handleClick} />
      </div>
      {showFilters && <Filters />}
      <div className="my-[50px] w-full h-full center flex-wrap">
        {data.map((movie) => {
          return <MovieCard details={movieDetails} key={Math.random()} />;
        })}
      </div>
    </section>
  );
}
