import { formatRunningTime } from 'pages/details/helpers';
import useAPI from 'utils/hooks/useAPI';

export default function GenreDurationDate({ itemDetails }) {
  const { response } = useAPI({
    paths: {
      category: 'movie',
      subCategory: [itemDetails.id],
      params: { language: 'en-US' },
    },
  });

  return (
    <div>
      {response &&
        response.genres.map((genre, index) => {
          if (index < response.genres.length - 1) {
            return <span key={genre.id}>{genre.name},&nbsp;</span>;
          }
          return <span key={genre.id}>{genre.name}</span>;
        })}
      <span>&nbsp;&#x2022;&nbsp;</span>
      <span>{response && formatRunningTime(response.runtime)}</span>
      <span>&nbsp;&#x2022;&nbsp;</span>
      <span>{response && response.release_date}</span>
    </div>
  );
}
