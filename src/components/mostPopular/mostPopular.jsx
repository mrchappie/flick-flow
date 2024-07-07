import MovieCardsContainer from 'components/UI/movieCardsContainer/movieCardsContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function MostPopular() {
  const [movieDetails, setMovieDetails] = useState([]);

  const { response, loading, error } = useAPI({
    paths: { category: 'movie', subCategory: ['popular'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setMovieDetails(response.results.slice(0, 8));
    }
  }, [response]);

  const componentData = {
    title: 'Most Popular',
    data: movieDetails,
  };
  return <MovieCardsContainer {...componentData} />;
}
