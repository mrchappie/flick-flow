import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function UpcomingMovies() {
  const [movieDetails, setMovieDetails] = useState([]);

  const { response } = useAPI({
    paths: { category: 'movie', subCategory: ['upcoming'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setMovieDetails(response.results.slice(0, 8));
    }
  }, [response]);

  const componentData = {
    title: 'Upcoming Movies',
    data: movieDetails,
    path: '/movies/upcoming',
  };
  return <CardsInfoContainer {...componentData} />;
}
