import { ButtonTextNoBgWithBorder } from 'components/UI/buttons/buttons';
import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import Filters from 'components/UI/filters/filters';
import Pagination from 'components/UI/pagination/pagination';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAPI from 'utils/hooks/useAPI';

export default function Movies() {
  const [showFilters, setShowFilters] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  const [page] = useSearchParams();

  const { response } = useAPI({
    paths: {
      category: 'movie',
      subCategory: ['now_playing'],
      params: { page: page.get('page') ?? 1 },
    },
  });

  useEffect(() => {
    if (response && response.results) {
      setMovieDetails(response.results);
    }
  }, [response]);

  const componentData = {
    title: '',
    data: movieDetails,
    style: 'max-w-[1200px]',
  };

  function handleClick() {
    setShowFilters(!showFilters);
  }

  return (
    <div className="w-full col-span-full">
      <ButtonTextNoBgWithBorder title="Filters" handleClick={handleClick} />
      {showFilters && <Filters />}
      <Pagination paginationData={response} />
      <CardsInfoContainer {...componentData} />
    </div>
  );
}
