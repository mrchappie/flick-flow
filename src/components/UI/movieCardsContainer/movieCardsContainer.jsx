import { useState } from 'react';
import { ButtonTextBg } from '../buttons/buttons';
import Filters from '../filters/filters';
import Heading from '../heading/heading';
import MovieCard from '../movieCard/movieCard';

export default function MovieCardsContainer({ title, data = [] }) {
  const [showFilters, setShowFilters] = useState(false);

  function handleClick() {
    setShowFilters(!showFilters);
  }

  console.log(data);

  return (
    <section className="w-full col-span-full center-col">
      <div className="justify-between w-full center">
        <Heading title={title} />
        <ButtonTextBg title="Filters" handleClick={handleClick} />
      </div>
      {showFilters && <Filters />}
      <div className="my-[50px] w-full h-full center flex-wrap">
        {data.map((movie) => {
          return <MovieCard details={movie} key={movie.id} />;
        })}
      </div>
    </section>
  );
}
