import MovieCardsContainer from 'components/UI/movieCardsContainer/movieCardsContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function LatestMovies() {
  const [movieDetails, setMovieDetails] = useState([]);

  const { response, loading, error } = useAPI({
    paths: { category: 'movie', subCategory: ['top_rated'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setMovieDetails(response.results.slice(0, 8));
    }
  }, [response]);

  const componentData = {
    title: 'Cele Mai Căutate',
    data: movieDetails,
  };
  return <MovieCardsContainer {...componentData} />;
}
