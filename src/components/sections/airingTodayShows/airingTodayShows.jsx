import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function AiringToday() {
  const [tvShowsDetails, setTvShowsDetails] = useState([]);

  const { response } = useAPI({
    paths: { category: 'tv', subCategory: ['airing_today'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setTvShowsDetails(response.results.slice(0, 8));
    }
  }, [response]);

  const componentData = {
    title: 'Tv Shows Playing Now',
    data: tvShowsDetails,
    path: '/tv/airing_today',
  };
  return <CardsInfoContainer {...componentData} />;
}
