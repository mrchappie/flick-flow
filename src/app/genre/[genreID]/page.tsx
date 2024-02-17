import MovieCardsContainer from '@components/UI/movieCardsContainer/movieCardsContainer';

export default function Genre({ params }: { params: { genreID: string } }) {
  const componentData = {
    title: `${params.genreID} movies`,
  };

  console.log(componentData);

  return <MovieCardsContainer {...componentData} />;
}
