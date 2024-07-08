import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';

export default function Genre() {
  const [genresList, setGenresList] = useState([]);

  const { response, loading, error } = useAPI({
    paths: { category: 'genre', subCategory: ['movie', 'list'] },
  });

  useEffect(() => {
    console.log(response);
    if (response) {
      setGenresList(response.genres);
    }
  }, [response]);

  return (
    <section className="w-full p-10 col-span-full">
      <ul className="flex-wrap w-full gap-5 center">
        {genresList.map((genre) => {
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
    </section>
  );
}
