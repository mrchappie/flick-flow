'use client';

import ButtonMain from '@/components/UI/buttons/buttonMain';
import Filters from '@/components/UI/filters/filters';
import Heading from '@/components/UI/heading/heading';
import MovieCard, { MovieDetails } from '@/components/UI/movieCard/movieCard';
import Link from 'next/link';
import { useState } from 'react';

export default function Movies() {
  const [showFilters, setShowFilters] = useState(false);

  function handleClick() {
    setShowFilters(!showFilters);
  }

  const movieDetails: MovieDetails = {
    title: 'Greenland',
    year: '2020',
    poster: '/images/movie_poster.jpg',
    movieID: '121213412qsadnd7asda',
  };

  const arr = new Array(20).fill(0);

  return (
    <section className="w-full col-span-full">
      <div className="center justify-between">
        <Heading title="Most Popular" />
        <ButtonMain title="Filters" handleClick={handleClick} />
      </div>
      {showFilters && <Filters />}
      <div className="mt-[50px] w-full h-full center flex-wrap">
        {arr.map((el) => {
          return (
            <Link href={`/movies/${movieDetails.movieID}`} key={el}>
              <MovieCard {...movieDetails} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
