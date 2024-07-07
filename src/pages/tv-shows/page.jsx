import MovieCardsContainer from 'components/UI/movieCardsContainer/movieCardsContainer';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function TvShows() {
  const [tvShowsDetails, setTvShowsDetails] = useState([]);

  const { response, loading, error } = useAPI({
    paths: { category: 'tv', subCategory: ['on_the_air'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setTvShowsDetails(response.results);
    }
  }, [response]);

  const componentData = {
    title: 'Most popolar movies',
    data: tvShowsDetails,
  };

  return <MovieCardsContainer {...componentData} />;
}
