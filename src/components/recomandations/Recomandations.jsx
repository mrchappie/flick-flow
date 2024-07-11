import MovieCard from 'components/UI/movieCard/movieCard';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function Recomandations({ movieID }) {
  // fetch recommendations based on movie id
  const [moviesRecDetails, setMoviesRecDetails] = useState([]);

  const { response } = useAPI({
    paths: { category: 'movie', subCategory: [movieID, 'recommendations'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setMoviesRecDetails(response.results.slice(0, 6));
    }
  }, [response]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {moviesRecDetails.map((movie) => {
        return <MovieCard key={movie.id} details={movie} />;
      })}
    </div>
  );
}
