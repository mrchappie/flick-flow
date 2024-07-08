import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';
import Heading from 'components/UI/heading/heading';

export default function Genre() {
  const [moviesGenresList, setMoviesGenresList] = useState([]);
  const [tvGenresList, setTVGenresList] = useState([]);
  const [toggleGenres, setToggleGenres] = useState(true);

  const { response, loading, error } = useAPI({
    paths: { category: 'genre', subCategory: ['movie', 'list'] },
  });

  const {
    response: responseTV,
    loading: loadingTV,
    loading: errorTV,
  } = useAPI({
    paths: { category: 'genre', subCategory: ['tv', 'list'] },
  });

  useEffect(() => {
    if (response) {
      setMoviesGenresList(response.genres);
    }
    if (responseTV) {
      setTVGenresList(responseTV.genres);
    }
  }, [response, responseTV]);

  function toggleGenresFn() {
    setToggleGenres(!toggleGenres);
  }

  return (
    <section className="w-full col-span-6 col-start-4 p-10">
      <div className="center">
        <Heading
          title={'Movies Genres'}
          toggleGen={toggleGenresFn}
          customStyle={`cursor-pointer ${!toggleGenres ? 'opacity-50' : ''}`}
        />
        <Heading
          title={'TV Genres'}
          toggleGen={toggleGenresFn}
          customStyle={`cursor-pointer ${toggleGenres ? 'opacity-50' : ''}`}
        />
      </div>
      {toggleGenres && (
        <ul className="flex-wrap w-full gap-5 center">
          {moviesGenresList.map((genre) => {
            return (
              <Link
                to={`/genre/${genre.name.toLowerCase()}?genre_id=${genre.id}`}
                key={genre.id}
              >
                <li className="w-[200px] h-[200px] border-2 rounded-md center text-[25px] font-bold p-4 bg-black/70">
                  <span className="text-center">{genre.name}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
      {!toggleGenres && (
        <ul className="flex-wrap w-full gap-5 center">
          {tvGenresList.map((genre) => {
            return (
              <Link
                to={`/genre/${genre.name.toLowerCase()}?genre_id=${genre.id}`}
                key={genre.id}
              >
                <li className="w-[200px] h-[200px] border-2 rounded-md center text-[25px] font-bold p-4 bg-black/70">
                  <span className="text-center">{genre.name}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </section>
  );
}
