import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function MostPopularTV({ style }) {
  const [movieDetails, setMovieDetails] = useState([]);

  const { response } = useAPI({
    paths: { category: 'tv', subCategory: ['popular'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setMovieDetails(response.results.slice(0, 8));
    }
  }, [response]);

  const componentData = {
    title: 'Most Popular TV Shows',
    data: movieDetails,
    path: '/tv/popular',
    style: style,
  };
  return <CardsInfoContainer {...componentData} />;
}
