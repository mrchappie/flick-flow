import MovieCardsContainer from 'components/UI/movieCardsContainer/movieCardsContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function Movies() {
  const [movieDetails, setMovieDetails] = useState([]);

  const { response, loading, error } = useAPI({
    paths: { category: 'movie', subCategory: ['now_playing'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setMovieDetails(response.results);
    }
  }, [response]);

  const componentData = {
    title: 'Most popolar movies',
    data: movieDetails,
  };

  return <MovieCardsContainer {...componentData} />;
}
