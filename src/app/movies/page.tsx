import MovieCardsContainer from '@components/UI/movieCardsContainer/movieCardsContainer';

export default function Movies() {
  const componentData = {
    title: 'Most popolar movies',
  };

  return <MovieCardsContainer {...componentData} />;
}
