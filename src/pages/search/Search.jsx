import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAPI from 'utils/hooks/useAPI';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('query') || ''
  );
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    setSearchQuery(searchParams.get('query'));
  }, [searchParams]);

  const { response, loading, error } = useAPI({
    paths: {
      category: 'search',
      subCategory: ['multi'],
      params: { query: searchQuery, language: 'en-US', include_adult: false },
    },
  });

  useEffect(() => {
    if (response) {
      console.log(response.results);
      setSearchedData(response.results);
    }
  }, [response]);

  const componentData = {
    title: 'For You',
    data: searchedData,
    style: 'max-w-[1200px]',
  };

  return <CardsInfoContainer {...componentData} />;
}
