import Image from 'next/image';
import Link from 'next/link';

export default function MovieCard(props: MovieDetails) {
  return (
    <Link href={`/movies/${props.movieID}`}>
      <div className="w-[214px] h-[290px] overflow-hidden relative cursor-pointer hover:opacity-50 bg-black">
        <div className="bg-custom-bg-fade h-full w-full absolute rotate-180 z-10"></div>
        <div className="absolute bottom-2 left-4 text-md z-10">
          <h2>
            {props.title} - <span>{props.year}</span>
          </h2>
        </div>
        <Image
          src={props.poster}
          layout="fill"
          objectFit="cover"
          alt="Picture of the author"
          className="z-0"
        />
      </div>
    </Link>
  );
}

export interface MovieDetails {
  title: string;
  year: string;
  poster: string;
  movieID: string;
}
