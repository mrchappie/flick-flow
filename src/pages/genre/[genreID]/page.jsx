import MovieCardsContainer from '@components/UI/movieCardsContainer/movieCardsContainer';

export default function Genre({ params }) {
  const componentData = {
    title: `${params.genreID} movies`,
  };

  console.log(componentData);

  return <MovieCardsContainer {...componentData} />;
}
