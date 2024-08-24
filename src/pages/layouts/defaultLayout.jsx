import Footer from 'components/footer/footer';
import Header from 'components/header/header';
import Banner from 'components/UI/banner/banner';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Banner />
      <Footer />
    </>
  );
}
