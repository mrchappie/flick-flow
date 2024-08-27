import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';
import { capitalize } from 'utils/utils';

export default function Recomandations({ contentID, contentType }) {
  // fetch recommendations based on movie id
  const [moviesRecDetails, setMoviesRecDetails] = useState([]);

  const { response } = useAPI({
    paths: {
      category: contentType,
      subCategory: [contentID, 'recommendations'],
    },
  });

  useEffect(() => {
    if (response && response.results) {
      setMoviesRecDetails(response.results.slice(0, 6));
    }
  }, [response]);

  const componentData = {
    title: `Similar ${capitalize(contentType)}s`,
    data: moviesRecDetails,
    customStyle: 'grid grid-cols-2 gap-4 max-lg:grid-cols-3',
    path: '/recommendations',
  };

  return <CardsInfoContainer {...componentData} />;
}
