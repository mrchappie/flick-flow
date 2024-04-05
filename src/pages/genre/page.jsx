import Link from 'next/link';
import { genres } from './data';

export default function Genre() {
  return (
    <section className="w-full col-span-full p-10">
      <ul className="center flex-wrap gap-5 w-full">
        {genres.map((genre) => {
          return (
            <Link key={genre.name} href={`/genre/${genre.name}`}>
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
