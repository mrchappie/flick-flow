import {
  ButtonTextBg,
  ButtonTextNoBg,
  CarouselArrowNext,
  CarouselArrowPrev,
} from 'components/UI/buttons/buttons';
import { useCallback, useEffect, useState } from 'react';
import Slide from './slide';
import styles from './styles.module.css';
import useAPI from 'utils/hooks/useAPI';
import GenreDurationDate from './genreDurationDate';
import { trimText } from 'utils/utils';
import { Link } from 'react-router-dom';

export default function Carousel() {
  const [slideDetails, setSlideDetails] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const { response, loading, error } = useAPI({
    paths: { category: 'movie', subCategory: ['now_playing'] },
  });

  useEffect(() => {
    if (response && response.results) {
      setSlideDetails(response.results.slice(0, 5));
    }
  }, [response]);

  const handleNextSlide = useCallback(() => {
    setActiveSlide((prevActiveSlide) =>
      prevActiveSlide < slideDetails.length - 1 ? prevActiveSlide + 1 : 0
    );
  }, [slideDetails.length]);

  const handlePrevSlide = useCallback(() => {
    setActiveSlide((prevActiveSlide) =>
      prevActiveSlide > 0 ? prevActiveSlide - 1 : slideDetails.length - 1
    );
  }, [slideDetails.length]);

  // useEffect(() => {
  //   const changeSlide = setTimeout(() => {
  //     handleNextSlide();
  //   }, 5000);

  //   return () => {
  //     clearTimeout(changeSlide);
  //   };
  // }, [activeSlide, handleNextSlide]);

  return (
    <section className="w-full h-[75vh] col-span-full center">
      <div className="w-[30px] h-full center z-10">
        <CarouselArrowPrev handleClick={handlePrevSlide}></CarouselArrowPrev>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Loading...</div>}
      <div className="relative z-0 w-full h-full center">
        {slideDetails.map((slide, index) => {
          const slideOffset = 2000 * (index - activeSlide);
          return (
            <div
              key={slide.id}
              className={`absolute top-0 w-full h-full ${styles.customCarouselTransition}`}
              style={{
                left: `${slideOffset}px`,
              }}
            >
              <div className="absolute bottom-0 left-0 z-20 items-start px-8 py-[80px] center-col">
                <h1 className="text-[40px] font-semibold">{slide.title}</h1>
                <div>
                  <GenreDurationDate itemDetails={slide} />
                </div>
                <div>
                  <p className="max-w-[30rem] text-[1rem] text-black4">
                    {trimText(slide.overview, 200)}...&nbsp;
                    <Link
                      to={`/details?movie_id=${slide.id}`}
                      className="underline hover:text-brand4"
                    >
                      Read more
                    </Link>
                  </p>
                </div>
                <div className="gap-4 my-8 center">
                  <ButtonTextBg title="Play Now" />
                  <ButtonTextNoBg title="Add to WatchList" />
                </div>
              </div>
              <div className="absolute top-0 left-0 z-10 w-full h-full rotate-180 bg-custom-bg-fade"></div>
              <Slide {...slide}></Slide>
            </div>
          );
        })}
      </div>
      <div className="w-[30px] h-full center z-10">
        <CarouselArrowNext handleClick={handleNextSlide}></CarouselArrowNext>
      </div>
    </section>
  );
}
