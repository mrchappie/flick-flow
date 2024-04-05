import MovieCardsContainer from 'components/UI/movieCardsContainer/movieCardsContainer';

export default function TvShows() {
  const componentData = {
    title: 'Most popolar TV shows',
  };

  return <MovieCardsContainer {...componentData} />;
}
