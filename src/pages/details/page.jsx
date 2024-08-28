import ForYou from 'components/sections/forYou/forYou';
import { ButtonWithTextAndIcon } from 'components/UI/buttons/buttons';
import { Heading } from 'components/UI/heading/heading';
import { useSearchParams } from 'react-router-dom';
import {
  MdFormatListBulletedAdd,
  MdFileDownload,
  MdOutlineShare,
} from 'react-icons/md';
import { useEffect, useState } from 'react';
import useAPI from 'utils/hooks/useAPI';
import { formatRunningTime } from './helpers';
import Recomandations from 'components/sections/recomandations/Recomandations';
import { extractReleaseYear } from 'components/UI/movieCard/helpers';
import VideoPlayer from './videoPlayer/videoPlayer';

export default function Details() {
  // fetch the desired movie data
  const [searchParams] = useSearchParams();
  const [contentID, setContentID] = useState(searchParams.get('content_id'));
  const [contentType, setContentType] = useState(
    searchParams.get('content_type')
  );

  const [genres, setGenres] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);

  useEffect(() => {
    setContentID(searchParams.get('content_id'));
    setContentType(searchParams.get('content_type'));
  }, [searchParams]);

  const { response } = useAPI({
    paths: {
      category: contentType,
      subCategory: [contentID],
      params: { language: 'en-US' },
    },
  });

  console.log(itemDetails);

  useEffect(() => {
    if (response) {
      setItemDetails(response);
      setGenres(response.genres);
    }
  }, [response]);

  return (
    <section className="grid grid-cols-12 gap-8 px-10 col-span-full">
      <section className="w-full h-full col-span-9 max-lg:col-span-12 center-col">
        <VideoPlayer
          itemDetails={itemDetails}
          contentID={contentID}
          contentType={contentType}
        />
        <header className="justify-start w-full gap-10 center-col">
          <div className="justify-between w-full center max-md:center-col max-md:items-start">
            <div className="items-start center-col">
              <Heading title={itemDetails.title} />
              <div className="text-xl font-semibold center">
                <span>{extractReleaseYear(itemDetails)}</span>
                <span>&#8226;</span>
                <span>{formatRunningTime(itemDetails)}</span>
              </div>
              <div className="text-white/50 center">
                {genres.map((genre) => {
                  return <span key={genre.id}>{genre.name}</span>;
                })}
              </div>
            </div>
            <div className="justify-end w-full center max-md:justify-center">
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
            <p className="text-white/50 text-md">{itemDetails.overview}</p>
          </div>
        </header>
      </section>
      <section className="justify-start h-full col-span-3 max-lg:col-span-12 center-col">
        <Recomandations contentID={contentID} contentType={contentType} />
      </section>
      <ForYou contentType={contentType} />
    </section>
  );
}
