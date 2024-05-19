import ForYou from 'components/forYou/forYou';
import { ButtonWithTextAndIcon } from 'components/UI/buttons/buttons';
import Heading from 'components/UI/heading/heading';
import MovieCard from 'components/UI/movieCard/movieCard';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {
  MdFormatListBulletedAdd,
  MdFileDownload,
  MdOutlineShare,
} from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';

export default function Details() {
  const forYouMoviesContainerWidth = useRef(null);

  const [
    customMovieCardStyleForDetailsPage,
    setCustomMovieCardStyleForDetailsPage,
  ] = useState({
    width: '207px',
    aspectRatio: '9/16',
  });

  useEffect(() => {
    setCustomMovieCardStyleForDetailsPage({
      ...customMovieCardStyleForDetailsPage,
      width: `${forYouMoviesContainerWidth / 2 - 16}px`,
    });
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const movieID = searchParams.get('movie_id');
  // console.log(movieID);
  const movieDetails = {
    title: 'Greenland',
    year: '2020',
    poster: '/images/movie_poster.jpg',
    movieID: uuid(),
  };

  function formatRunningTime(time) {
    // time is minutes
    const hours = Math.floor(time / 60);
    const minutes = time - hours * 60;
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
  }

  const genres = ['action', 'comedy', 'sf', 'horror'];

  return (
    <section className="grid grid-cols-12 gap-8 px-10 col-span-full">
      <section className="w-full h-full col-span-9 center-col">
        <div className="w-full h-[70%] relative">
          <img src={'/images/movie_poster_l.jpg'} alt="" />
        </div>
        <header className="h-[30%] center-col justify-start gap-10">
          <div className="justify-between w-full center">
            <div className="items-start center-col">
              <Heading title={'Movie Name'} />
              <div className="text-xl font-semibold center">
                <span>2018</span>
                <span>&#8226;</span>
                <span>{formatRunningTime(65)}</span>
              </div>
              <div className="text-white/50 center">
                {genres.map((genre) => {
                  return <span key={genre}>{genre}</span>;
                })}
              </div>
            </div>
            <div className="justify-start center">
              <ButtonWithTextAndIcon>
                <MdFormatListBulletedAdd className="text-2xl" />
                <span>Watchlist</span>
              </ButtonWithTextAndIcon>
              <ButtonWithTextAndIcon>
                <MdOutlineShare className="text-2xl" />
                <span>Share</span>
              </ButtonWithTextAndIcon>
              <ButtonWithTextAndIcon>
                <MdFileDownload className="text-2xl" />
                <span>Download</span>
              </ButtonWithTextAndIcon>
            </div>
          </div>
          <div>
            <h2 className="py-2 text-2xl font-semibold">Description</h2>
            <p className="text-white/50 text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
              reprehenderit fugiat eveniet aut vitae aspernatur. Sit facere
              reprehenderit fugiat dolorum exercitationem consequatur quam
              laborum error quod. Temporibus accusamus repudiandae error.
            </p>
          </div>
        </header>
      </section>
      <section className="h-full col-span-3 center-col">
        <Heading title={'Movies for you'} />
        <div
          className="grid grid-cols-2 gap-4"
          ref={forYouMoviesContainerWidth}
        >
          <MovieCard
            details={movieDetails}
            customStyle={customMovieCardStyleForDetailsPage}
          />
          <MovieCard
            details={movieDetails}
            customStyle={customMovieCardStyleForDetailsPage}
          />
          <MovieCard
            details={movieDetails}
            customStyle={customMovieCardStyleForDetailsPage}
          />
          <MovieCard
            details={movieDetails}
            customStyle={customMovieCardStyleForDetailsPage}
          />
          <MovieCard
            details={movieDetails}
            customStyle={customMovieCardStyleForDetailsPage}
          />
          <MovieCard
            details={movieDetails}
            customStyle={customMovieCardStyleForDetailsPage}
          />
        </div>
      </section>
      <ForYou />
    </section>
  );
}
