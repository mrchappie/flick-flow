import { HiChevronLeft } from 'react-icons/hi2';
import { HiChevronRight } from 'react-icons/hi2';
import { twMerge } from 'tailwind-merge';

export function ButtonTextBg({ handleClick, children, title, customStyle }) {
  return (
    <button
      onClick={handleClick}
      className={twMerge(
        `p-3 text-white rounded-sm bg-brand1 border-2 border-brand1 min-w-[100px] w-max ${
          customStyle ?? ''
        }`
      )}
    >
      {children ? children : title}
    </button>
  );
}

export function ButtonTextNoBg({ handleClick, children, title, customStyle }) {
  return (
    <button
      onClick={handleClick}
      className={twMerge(
        `p-3 bg-transparent rounded-sm text-brand1 min-w-[100px] w-max ${
          customStyle ?? ''
        }`
      )}
    >
      {children ? children : title}
    </button>
  );
}

export function ButtonTextNoBgWithBorder({
  handleClick,
  children,
  title,
  customStyle,
}) {
  return (
    <button
      onClick={handleClick}
      className={twMerge(
        `p-3 bg-transparent border-2 rounded-sm text-brand1 border-brand1 min-w-[100px] w-max ${
          customStyle ?? ''
        }`
      )}
    >
      {children ? children : title}
    </button>
  );
}

export function ButtonWithTextAndIcon({
  handleClick,
  children,
  title,
  customStyle,
}) {
  return (
    <button
      onClick={handleClick}
      className={twMerge(
        `p-3 bg-transparent rounded-sm center-col hover:text-brand4 min-w-[100px] w-max ${
          customStyle ?? ''
        }`
      )}
    >
      {children ? children : title}
    </button>
  );
}

export function CarouselArrowNext({ handleClick, customStyle }) {
  return (
    <button
      onClick={handleClick}
      className={twMerge(
        `bg-white text-brand1 w-9 h-[72px] text-3xl center font-extrabold rounded-s-[100px] ${
          customStyle ?? ''
        }`
      )}
    >
      <HiChevronRight />
    </button>
  );
}

export function CarouselArrowPrev({ handleClick, customStyle }) {
  return (
    <button
      onClick={handleClick}
      className={twMerge(
        `bg-white text-brand1 w-9 h-[72px] text-3xl center font-extrabold rounded-e-[100px] ${
          customStyle ?? ''
        }`
      )}
    >
      <HiChevronLeft />
    </button>
  );
}
