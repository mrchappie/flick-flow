import MovieCard from 'components/UI/movieCard/movieCard';
import { useEffect, useRef, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function Recomandations({ movieID }) {
  // fetch recommendations based on movie id
  const [moviesRecDetails, setMoviesRecDetails] = useState([]);

  console.log(movieID);

  const { response, loading, error } = useAPI({
    paths: { category: 'movie', subCategory: [movieID, 'recommendations'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setMoviesRecDetails(response.results.slice(0, 6));
    }
  }, [response]);

  // set for you recommendations cards width
  // const forYouMoviesContainerWidth = useRef(null);

  // const [
  //   customMovieCardStyleForDetailsPage,
  //   setCustomMovieCardStyleForDetailsPage,
  // ] = useState({
  //   width: '207px',
  //   aspectRatio: '9/16',
  // });

  // useEffect(() => {
  //   setCustomMovieCardStyleForDetailsPage({
  //     ...customMovieCardStyleForDetailsPage,
  //     width: `${forYouMoviesContainerWidth / 2 - 16}px`,
  //   });
  // }, []);

  return (
    // <div className="grid grid-cols-2 gap-4" ref={forYouMoviesContainerWidth}>
    <div className="grid grid-cols-2 gap-4">
      {moviesRecDetails.map((movie) => {
        return <MovieCard key={movie.id} details={movie} />;
      })}
    </div>
  );
}
