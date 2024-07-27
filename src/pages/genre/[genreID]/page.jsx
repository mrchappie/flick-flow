import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import Pagination from 'components/UI/pagination/pagination';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useAPI from 'utils/hooks/useAPI';
import { capitalize } from 'utils/utils';

export default function GenreCategory() {
  const { genreName } = useParams();
  const [searchParams] = useSearchParams();
  const genreID = searchParams.get('genre_id');
  const movieOrTV = searchParams.get('movie_or_tv');
  const [page] = useSearchParams();

  const [movieDetails, setMovieDetails] = useState([]);

  const { response } = useAPI({
    paths: {
      category: 'discover',
      subCategory: [movieOrTV],
      params: {
        with_genres: genreID,
        page: page.get('page') ?? 1,
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

  return (
    <div className="w-full col-span-full">
      <Pagination paginationData={response} />
      <CardsInfoContainer {...componentData} />
    </div>
  );
}
