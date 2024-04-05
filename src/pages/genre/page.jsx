import { Link } from 'react-router-dom';
import { genres } from './data';

export default function Genre() {
  return (
    <section className="w-full p-10 col-span-full">
      <ul className="flex-wrap w-full gap-5 center">
        {genres.map((genre) => {
          return (
            <Link to={`/genre/${genre.name}`} key={genre.name}>
              <li className="w-[200px] h-[200px] border-2 rounded-md center text-[25px] font-bold p-4 bg-black/70">
                <span className="text-center">{genre.placeholder}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
