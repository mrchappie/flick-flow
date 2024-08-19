import Footer from 'components/footer/footer';
import Header from 'components/header/header';
import Banner from 'components/UI/banner/banner';
import { Outlet } from 'react-router-dom';
import { motion as m } from 'framer-motion';

export default function DefaultLayout() {
  return (
    <>
      <m.div
        initial={{
          opacity: 0,
          x: '-100vw',
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: '100vw',
        }}
        transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
        className="col-span-full"
      >
        <Header />
        <Outlet />
        <Banner />
        <Footer />
      </m.div>
    </>
  );
}
