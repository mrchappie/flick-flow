import {
  ButtonTextBg,
  ButtonTextNoBg,
  CarouselArrowNext,
  CarouselArrowPrev,
} from 'components/UI/buttons/buttons';
import { useCallback, useEffect, useState } from 'react';
import Slide from './slide';
import styles from './styles.module.css';

export default function Carousel() {
  const slideDetails = [
    {
      poster: '/images/movie_poster_l.jpg',
      description: 'lorem inpsum dolor blah blah blah',
      title: 'Greenland',
      duration: '120',
      year: '2023',
      genre: ['action, comedy, sf'],
      movieID: 'sae21ewd32ed3wd',
    },
    {
      poster: '/images/movie_poster_l_2.jpg',
      description: 'lorem inpsum dolor blah blah blah',
      title: 'Independence Day',
      duration: '120',
      year: '2023',
      genre: ['action, comedy, sf'],
      movieID: 'sae21ewd32edas3wd',
    },
    {
      poster: '/images/movie_poster_l_3.jpg',
      description: 'lorem inpsum dolor blah blah blah',
      title: 'Transformers',
      duration: '120',
      year: '2023',
      genre: ['action, comedy, sf'],
      movieID: 'sae21ewd32ed3saswd',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextSlide = useCallback(() => {
    if (activeSlide < slideDetails.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      setActiveSlide(0);
    }
  }, [activeSlide, slideDetails.length]);

  const handlePrevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    } else {
      setActiveSlide(slideDetails.length - 1);
    }
  };

  // useEffect(() => {
  //   const changeSlide = setTimeout(() => {
  //     handleNextSlide();
  //   }, 5000);

  //   return () => {
  //     clearTimeout(changeSlide);
  //   };
  // }, [activeSlide, handleNextSlide]);

  return (
    <section className="w-full h-[70vh] col-span-full center">
      <div className="w-[30px] h-full center">
        <CarouselArrowPrev handleClick={handlePrevSlide}></CarouselArrowPrev>
      </div>
      <div className="relative w-full h-full center">
        {slideDetails.map((slide, index) => {
          const slideOffset = 2000 * (index - activeSlide);
          return (
            <div
              key={slide.movieID}
              className={`absolute top-0 w-full h-full ${styles.customCarouselTransition}`}
              style={{
                left: `${slideOffset}px`,
              }}
            >
              <div className="absolute bottom-0 left-0 z-20 items-start p-4 center-col">
                <h1 className="text-[4  0px] font-bold">{slide.title}</h1>
                <div>
                  <span>{slide.genre}</span> | <span>{slide.duration}</span> |{' '}
                  <span>{slide.year}</span>
                </div>
                <div>
                  <p>{slide.description}</p>
                </div>
                <div className="gap-4 center">
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
      <div className="w-[30px] h-full center">
        <CarouselArrowNext handleClick={handleNextSlide}></CarouselArrowNext>
      </div>
    </section>
  );
}
