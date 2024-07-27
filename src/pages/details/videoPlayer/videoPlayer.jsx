import { useEffect, useState } from 'react';
import { HiMiniPlay } from 'react-icons/hi2';
import useAPI from 'utils/hooks/useAPI';
import { tmdbImagesOrigin } from 'utils/utils';

export default function VideoPlayer({ movieDetails }) {
  const [togglePlayButton, setTogglePlayButton] = useState(false);
  const [toggleShowTrailer, setToggleShowTrailer] = useState(false);

  const { response } = useAPI({
    paths: {
      category: 'movie',
      subCategory: [movieDetails.id, 'videos'],
      params: { language: 'en-US' },
    },
  });

  useEffect(() => {
    if (response && response.results) {
      console.log(
        response.results.filter((item) => item.name.includes('Trailer'))
      );
    }
  }, [response]);

  function togglePlayer() {
    setTogglePlayButton(!togglePlayButton);
  }

  function showTrailers() {
    setTogglePlayButton(!togglePlayButton);
    setToggleShowTrailer(!toggleShowTrailer);
  }

  return (
    <>
      <div
        onMouseEnter={togglePlayer}
        className="w-full h-[70%] relative overflow-hidden"
      >
        <img
          src={tmdbImagesOrigin + '/w1280' + movieDetails.backdrop_path}
          alt={movieDetails.title}
          className="object-cover w-full"
        />

        {togglePlayButton && (
          <div
            onMouseLeave={togglePlayer}
            className="absolute top-0 left-0 z-10 w-full h-full bg-black/50 center"
          >
            <div
              onClick={showTrailers}
              className="w-[80px] aspect-square center rounded-full text-4xl bg-brand1 cursor-pointer hover:scale-110"
            >
              <HiMiniPlay />
            </div>
          </div>
        )}
      </div>
      {toggleShowTrailer && (
        <div className="absolute top-0 left-0 z-50 grid w-full h-full grid-cols-2 grid-rows-2 gap-8 p-8 bg-black/90">
          <button onClick={showTrailers} className="absolute top-0 right-0">
            Close
          </button>
          {response.results &&
            response.results
              .filter((item) => item.name.includes('Trailer'))
              .map((video) => {
                return (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allowFullScreen
                  />
                );
              })}
        </div>
      )}
    </>
  );
}
