import MovieCardsContainer from 'components/UI/movieCardsContainer/movieCardsContainer';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useAPI from 'utils/hooks/useAPI';
import { capitalize } from 'utils/utils';

export default function GenreCategory() {
  const { genreName } = useParams();
  const [searchParams] = useSearchParams();
  const genreID = searchParams.get('genre_id');

  const [movieDetails, setMovieDetails] = useState([]);

  const { response, loading, error } = useAPI({
    paths: {
      category: 'discover',
      subCategory: ['movie'],
      params: {
        with_genres: genreID,
      },
    },
  });

  useEffect(() => {
    if (response && response.results) {
      setMovieDetails(response.results);
    }
  }, [response]);

  const componentData = {
    title: `${capitalize(genreName)} movies`,
    data: movieDetails,
  };

  return <MovieCardsContainer {...componentData} />;
}
