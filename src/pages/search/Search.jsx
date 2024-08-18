import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import Pagination from 'components/UI/pagination/pagination';
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

  const { response } = useAPI({
    paths: {
      category: 'search',
      subCategory: ['multi'],
      params: {
        query: searchQuery,
        language: 'en-US',
        include_adult: false,
        page: searchParams.get('page') ?? 1,
      },
    },
    shouldFetch,
  });

  useEffect(() => {
    if (response) {
      setSearchedData(response.results);
    }
  }, [response]);

  const componentData = {
    title: `Search results for "${searchQuery}"`,
    data: searchedData,
    style: 'max-w-[1200px] flex-wrap',
  };

  return (
    <div className="w-full col-span-full">
      {searchQuery && <Pagination paginationData={response} />}
      {searchQuery && <CardsInfoContainer {...componentData} />}
      {!searchQuery && (
        <section className="w-full col-span-full center-col">
          <h2 className="text-3xl">
            No search query provided, please search for something.
          </h2>
        </section>
      )}
    </div>
  );
}
