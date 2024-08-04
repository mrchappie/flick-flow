import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function OnTheAirShows() {
  const [tvShowsDetails, setTvShowsDetails] = useState([]);

  const { response, loading, error } = useAPI({
    paths: { category: 'tv', subCategory: ['on_the_air'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setTvShowsDetails(response.results.slice(0, 8));
    }
  }, [response]);

  const componentData = {
    title: 'Cele Mai Căutate',
    data: tvShowsDetails,
    path: '/on_the_air',
  };
  return <CardsInfoContainer {...componentData} />;
}
