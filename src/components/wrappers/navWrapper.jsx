import React from 'react';
import { HiMiniBars3, HiMiniXMark } from 'react-icons/hi2';
import { AnimatePresence, motion as m, useCycle } from 'framer-motion';

export default function NavWrapper({ children }) {
  const [isOpen, toggleOpen] = useCycle(false, true);
  function closeNav() {
    toggleOpen();
  }

  function openNav() {
    toggleOpen();
  }

  return (
    <AnimatePresence mode="wait">
      <div
        onClick={openNav}
        className="absolute w-[80px] h-[80px] text-2xl bg-black top-[-20px] left-[-20px] rounded-br-[50px] center cursor-pointer z-20 lg:hidden"
      >
        <HiMiniBars3 />
      </div>
      <m.nav
        variants={navVariants}
        initial={false}
        animate={isOpen ? 'open' : 'close'}
        className={`h-full z-50 lg:col-span-2 row-span-full bg-[#222] max-lg:absolute max-lg:shadow-2xl shadow-white`}
      >
        <div
          onClick={closeNav}
          className="absolute p-2 text-2xl rounded-full cursor-pointer right-2 top-2 hover:bg-white hover:text-black"
        >
          <HiMiniXMark />
        </div>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { closeNav })
        )}
      </m.nav>
      <m.div
        variants={backdropVariants}
        initial={false}
        animate={isOpen ? 'open' : 'close'}
        onClick={closeNav}
        className="absolute inset-0 z-20 w-full h-full bg-black cursor-pointer"
      ></m.div>
    </AnimatePresence>
  );
}

const navVariants = {
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  close: {
    x: -200,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

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
    transitionEnd: { display: 'none' },
  },
};
