import React, { useState } from 'react';
import { HiMiniBars3, HiMiniXMark } from 'react-icons/hi2';
import { AnimatePresence, motion as m } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export default function NavWrapper({
  children,
  customStyle,
  togglePostion = 'top-left',
  navPostion = 'left',
}) {
  const [isOpen, toggleNav] = useState(false);
  function closeNav() {
    toggleNav(false);
  }

  function openNav() {
    toggleNav(true);
  }

  const vw = window.innerWidth;

  if (vw > 1023) {
    navPostion = undefined;
  }

  const xValue = getNavPosition(navPostion, vw);

  return (
    <AnimatePresence mode="wait">
      <div
        onClick={openNav}
        className={`absolute w-[80px] h-[80px] text-2xl bg-black center cursor-pointer z-20 lg:hidden ${getTogglePosition(
          togglePostion
        )}`}
      >
        <HiMiniBars3 />
      </div>
      <m.nav
        key={'nav'}
        variants={navVariants(xValue)}
        initial={false}
        animate={isOpen ? 'open' : 'close'}
        className={twMerge(
          `h-full z-50 bg-[#222] max-lg:absolute max-lg:shadow-2xl shadow-white left-0 ${customStyle}`
        )}
      >
        {isOpen && (
          <div
            onClick={closeNav}
            className="absolute p-2 text-2xl rounded-full cursor-pointer right-2 top-2 hover:bg-white hover:text-black"
          >
            <HiMiniXMark />
          </div>
        )}
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { closeNav })
        )}
      </m.nav>
      <m.div
        key={'backdrop'}
        variants={backdropVariants}
        initial={false}
        animate={isOpen ? 'open' : 'close'}
        onClick={closeNav}
        className={`absolute inset-0 z-20 w-full h-full bg-black ${
          isOpen ? 'cursor-pointer' : 'cursor-not-allowed'
        }`}
      ></m.div>
    </AnimatePresence>
  );
}

function getTogglePosition(togglePostion) {
  switch (togglePostion) {
    case 'top-left':
      return 'top-[-20px] left-[-20px] rounded-br-[50px]';
    case 'top-right':
      return 'top-[-20px] right-[-20px] rounded-bl-[50px]';
    case 'bottom-left':
      return 'bottom-[-20px] left-[-20px] rounded-tr-[50px]';
    case 'bottom-right':
      return 'bottom-[-20px] right-[-20px] rounded-tl-[50px]';
    default:
      return 'top-[-20px] left-[-20px] rounded-br-[50px]';
  }
}

function getNavPosition(navPostion, vw) {
  switch (navPostion) {
    case 'left':
      return { open: 0, close: -200 };
    case 'right':
      return { open: vw - 200, close: vw + 200 };
    default:
      return { open: 0, close: 0 };
  }
}

function navVariants(xValue) {
  return {
    open: {
      x: xValue.open,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    close: {
      x: xValue.close,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };
}

const backdropVariants = {
  open: {
    opacity: 0.5,
    display: 'block',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  close: {
    opacity: 0,
    transitionEnd: { display: 'none' },
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};
