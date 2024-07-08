import { ButtonTextNoBgWithBorder } from 'components/UI/buttons/buttons';
import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import Filters from 'components/UI/filters/filters';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function TvShows() {
  const [tvShowsDetails, setTvShowsDetails] = useState([]);

  const { response, loading, error } = useAPI({
    paths: { category: 'tv', subCategory: ['on_the_air'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setTvShowsDetails(response.results);
    }
  }, [response]);

  const componentData = {
    title: '',
    data: tvShowsDetails,
    style: 'max-w-[1200px]',
  };

  const [showFilters, setShowFilters] = useState(false);

  function handleClick() {
    setShowFilters(!showFilters);
  }

  return (
    <div className="w-full col-span-full">
      <ButtonTextNoBgWithBorder title="Filters" handleClick={handleClick} />
      {showFilters && <Filters />}
      <CardsInfoContainer {...componentData} />
    </div>
  );
}
