import MovieCardsContainer from 'components/UI/movieCardsContainer/movieCardsContainer';
import useAPI from 'utils/hooks/useAPI';

export default function Movies() {
  const data = useAPI({
    url: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
  });

  const componentData = {
    title: 'Most popolar movies',
  };

  return <MovieCardsContainer {...componentData} data />;
}
