import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function Recomandations({ movieID }) {
  // fetch recommendations based on movie id
  const [moviesRecDetails, setMoviesRecDetails] = useState([]);

  const { response } = useAPI({
    paths: { category: 'movie', subCategory: [movieID, 'recommendations'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setMoviesRecDetails(response.results.slice(0, 6));
    }
  }, [response]);

  const componentData = {
    title: 'Similar Movies',
    data: moviesRecDetails,
    customStyle: 'grid grid-cols-2 gap-4',
  };

  return <CardsInfoContainer {...componentData} />;
}
