import { HiChevronLeft } from 'react-icons/hi2';
import { HiChevronRight } from 'react-icons/hi2';
import { twMerge } from 'tailwind-merge';
import { motion as m } from 'framer-motion';

export function ButtonTextBg({
  handleClick,
  children,
  title,
  customStyle,
  disabled,
}) {
  return (
    <m.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      disabled={disabled}
      className={twMerge(
        `p-3 text-white rounded-sm bg-brand1 border-2 border-brand1 min-w-[100px] w-max ${
          customStyle ?? ''
        }`
      )}
    >
      {children ? children : title}
    </m.button>
  );
}

export function ButtonTextNoBg({ handleClick, children, title, customStyle }) {
  return (
    <m.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      className={twMerge(
        `p-3 bg-transparent rounded-sm text-brand1 min-w-[100px] w-max ${
          customStyle ?? ''
        }`
      )}
    >
      {children ? children : title}
    </m.button>
  );
}

export function ButtonTextNoBgWithBorder({
  handleClick,
  children,
  title,
  customStyle,
}) {
  return (
    <m.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      className={twMerge(
        `p-3 bg-transparent border-2 rounded-sm text-brand1 border-brand1 min-w-[100px] w-max ${
          customStyle ?? ''
        }`
      )}
    >
      {children ? children : title}
    </m.button>
  );
}

export function ButtonWithTextAndIcon({
  handleClick,
  children,
  title,
  customStyle,
}) {
  return (
    <m.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      className={twMerge(
        `p-3 bg-transparent rounded-sm center-col hover:text-brand4 min-w-[100px] w-max ${
          customStyle ?? ''
        }`
      )}
    >
      {children ? children : title}
    </m.button>
  );
}

export function CarouselArrowNext({ handleClick, customStyle }) {
  return (
    <m.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      className={twMerge(
        `bg-white text-brand1 w-9 h-[72px] text-3xl center font-extrabold rounded-s-[100px] ${
          customStyle ?? ''
        }`
      )}
    >
      <HiChevronRight />
    </m.button>
  );
}

export function CarouselArrowPrev({ handleClick, customStyle }) {
  return (
    <m.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      className={twMerge(
        `bg-white text-brand1 w-9 h-[72px] text-3xl center font-extrabold rounded-e-[100px] ${
          customStyle ?? ''
        }`
      )}
    >
      <HiChevronLeft />
    </m.button>
  );
}

const buttonVariants = {
  hover: {
    scale: 1.1,
    // backgroundColor: '#f8e112',
    // color: '#000',
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.95,
    rotate: -5,
    // backgroundColor: '#e67e22',
    // color: '#fff',
    transition: {
      duration: 0.2,
      repeatType: 'mirror',
      repeat: 5,
    },
  },
};
