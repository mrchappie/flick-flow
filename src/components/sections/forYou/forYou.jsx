import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function ForYou() {
  const [movieDetails, setMovieDetails] = useState([]);

  const { response, loading, error } = useAPI({
    paths: { category: 'movie', subCategory: ['now_playing'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setMovieDetails(response.results.slice(0, 8));
    }
  }, [response]);

  const componentData = {
    title: 'For You',
    data: movieDetails,
    path: '/now_playing',
  };

  return <CardsInfoContainer {...componentData} />;
}
