'use client';
import { useState } from 'react';
import Slide from './slide';

export default function Carousel() {
  const slideDetails: SlideDetailsI[] = [
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

  const handleNextSlide = () => {
    if (activeSlide < slideDetails.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      setActiveSlide(0);
    }
  };
  const handlePrevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    } else {
      setActiveSlide(slideDetails.length - 1);
    }
  };

  return (
    <section className="w-full h-[70vh] col-span-full center">
      <div className="w-[30px] h-full center">
        <button
          onClick={handlePrevSlide}
          className="bg-white rounded-md p-4 text-black"
        >
          P
        </button>
      </div>
      <div className="w-full h-full center relative">
        {slideDetails.map((slide, index) => {
          const slideOffset = 2000 * (index - activeSlide);
          return (
            <div
              key={slide.movieID}
              className={`w-full h-full absolute top-0`}
              style={{ left: `${slideOffset}px` }}
            >
              <div className="absolute left-0 bottom-0 z-20 center-col">
                <h1>{slide.title}</h1>
                <div>
                  <span>{slide.genre!}</span> | <span>{slide.duration}</span> |{' '}
                  <span>{slide.year}</span>
                </div>
                <div>
                  <p>{slide.description}</p>
                </div>
                <div>
                  <button>Play Now</button>
                  <button>Add to WatchList</button>
                </div>
              </div>
              <div className="w-full h-full absolute top-0 left-0 bg-custom-bg-fade z-10 rotate-180"></div>
              <Slide {...slide}></Slide>
            </div>
          );
        })}
      </div>
      <div className="w-[30px] h-full center">
        <button
          onClick={handleNextSlide}
          className="bg-white rounded-md p-4 text-black"
        >
          N
        </button>
      </div>
    </section>
  );
}

export interface SlideDetailsI {
  poster: string;
  description: string;
  title: string;
  year: string;
  duration: string;
  movieID: string;
  genre?: string[];
}
