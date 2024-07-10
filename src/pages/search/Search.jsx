import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAPI from 'utils/hooks/useAPI';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query'));
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    setSearchQuery(searchParams.get('query'));
  }, [searchParams]);

  const shouldFetch = Boolean(searchQuery);

  const { response, error } = useAPI({
    paths: {
      category: 'search',
      subCategory: ['multi'],
      params: { query: searchQuery, language: 'en-US', include_adult: false },
    },
    shouldFetch,
  });

  useEffect(() => {
    if (response) {
      setSearchedData(response.results);
    }
  }, [response]);

  const componentData = {
    title: 'For You',
    data: searchedData,
    style: 'max-w-[1200px]',
  };

  return (
    <>
      {!error && <CardsInfoContainer {...componentData} />}
      {error && <h2>No search query provided, please search for something.</h2>}
    </>
  );
}
