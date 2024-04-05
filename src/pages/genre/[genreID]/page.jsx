import MovieCardsContainer from 'components/UI/movieCardsContainer/movieCardsContainer';
import { useParams } from 'react-router-dom';

export default function GenreCategory() {
  const { genreID } = useParams();

  const componentData = {
    title: `${genreID} movies`,
  };

  console.log(componentData);

  return <MovieCardsContainer {...componentData} />;
}
