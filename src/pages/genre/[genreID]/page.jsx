import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useAPI from 'utils/hooks/useAPI';
import { capitalize } from 'utils/utils';

export default function GenreCategory() {
  const { genreName } = useParams();
  const [searchParams] = useSearchParams();
  const genreID = searchParams.get('genre_id');
  const movieOrTV = searchParams.get('movie_or_tv');

  const [movieDetails, setMovieDetails] = useState([]);

  const { response, loading, error } = useAPI({
    paths: {
      category: 'discover',
      subCategory: [movieOrTV],
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
    title: `${capitalize(genreName)} ${
      movieOrTV === 'movie' ? 'movies' : 'tv-shows'
    }`,
    data: movieDetails,
    style: 'max-w-[1200px]',
  };

  return <CardsInfoContainer {...componentData} />;
}
