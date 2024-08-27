import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';
import { capitalize } from 'utils/utils';

export default function ForYou({ contentType }) {
  const [movieDetails, setMovieDetails] = useState([]);

  const { response } = useAPI({
    paths: {
      category: contentType,
      subCategory: [contentType === 'movie' ? 'now_playing' : 'on_the_air'],
    },
  });

  useEffect(() => {
    if (response && response.results) {
      setMovieDetails(response.results.slice(0, 8));
    }
  }, [response]);

  const componentData = {
    title: `Now Playing ${capitalize(contentType)}s`,
    data: movieDetails,
    path: '/movie/now_playing',
    style: 'max-lg:justify-start max-lg:mx-12 max-lg:overflow-x-scroll',
  };

  return <CardsInfoContainer {...componentData} />;
}
