import ForYou from 'components/forYou/forYou';
import { ButtonWithTextAndIcon } from 'components/UI/buttons/buttons';
import Heading from 'components/UI/heading/heading';
import { useSearchParams } from 'react-router-dom';
import {
  MdFormatListBulletedAdd,
  MdFileDownload,
  MdOutlineShare,
} from 'react-icons/md';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';
import { formatRunningTime } from './helpers';
import Recomandations from 'components/recomandations/Recomandations';
import { extractReleaseYear } from 'components/UI/movieCard/helpers';
import VideoPlayer from './videoPlayer/videoPlayer';

export default function Details() {
  // fetch the desired movie data
  const [searchParams] = useSearchParams();
  const [movieID, setMovieID] = useState(searchParams.get('movie_id'));

  const [genres, setGenres] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    setMovieID(searchParams.get('movie_id'));
  }, [searchParams]);

  const { response } = useAPI({
    paths: {
      category: 'movie',
      subCategory: [movieID],
      params: { language: 'en-US' },
    },
  });

  useEffect(() => {
    if (response) {
      console.log(response);
      setMovieDetails(response);
      setGenres(response.genres);
    }
  }, [response]);

  return (
    <section className="grid grid-cols-12 gap-8 px-10 col-span-full">
      <section className="w-full h-full col-span-9 center-col">
        <VideoPlayer movieDetails={movieDetails} />
        <header className="h-[30%] center-col justify-start gap-10 w-full">
          <div className="justify-between w-full center">
            <div className="items-start center-col">
              <Heading title={movieDetails.title} />
              <div className="text-xl font-semibold center">
                <span>{extractReleaseYear(movieDetails)}</span>
                <span>&#8226;</span>
                <span>{formatRunningTime(movieDetails.runtime)}</span>
              </div>
              <div className="text-white/50 center">
                {genres.map((genre) => {
                  return <span key={genre.id}>{genre.name}</span>;
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
          <div className="items-start w-full">
            <h2 className="py-2 text-2xl font-semibold">Description</h2>
            <p className="text-white/50 text-md">{movieDetails.overview}</p>
          </div>
        </header>
      </section>
      <section className="justify-start h-full col-span-3 center-col">
        <Heading title={'Similar Movies'} />
        <Recomandations movieID={movieID} />
      </section>
      <ForYou />
    </section>
  );
}
