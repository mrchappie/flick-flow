import { ButtonTextNoBgWithBorder } from 'components/UI/buttons/buttons';
import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import Filters from 'components/UI/filters/filters';
import Pagination from 'components/UI/pagination/pagination';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useAPI from 'utils/hooks/useAPI';
import { capitalize } from 'utils/utils';

export default function List() {
  const [showFilters, setShowFilters] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  const [searchParams] = useSearchParams();
  const { list } = useParams();

  function handleClick() {
    setShowFilters(!showFilters);
  }

  console.log(list);

  const { response } = useAPI({
    paths: {
      category: 'movie',
      subCategory: [list],
      params: { page: searchParams.get('page') ?? 1 },
    },
  });

  useEffect(() => {
    if (response && response.results) {
      setMovieDetails(response.results);
    }
  }, [response]);

  const componentData = {
    title: capitalize(list),
    data: movieDetails,
    style: 'max-w-[1200px]',
  };

  return (
    <div className="w-full col-span-full">
      <ButtonTextNoBgWithBorder title="Filters" handleClick={handleClick} />
      {showFilters && <Filters />}
      <Pagination paginationData={response} />
      <CardsInfoContainer {...componentData} />
    </div>
  );
}
