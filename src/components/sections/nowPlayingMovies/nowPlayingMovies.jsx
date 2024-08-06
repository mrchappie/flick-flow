import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function NowPlayingMovies() {
  const [movieDetails, setMovieDetails] = useState([]);

  const { response } = useAPI({
    paths: { category: 'movie', subCategory: ['now_playing'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setMovieDetails(response.results.slice(0, 8));
    }
  }, [response]);

  const componentData = {
    title: 'Now Playing Movies',
    data: movieDetails,
    path: '/movies/now_playing',
  };
  return <CardsInfoContainer {...componentData} />;
}
