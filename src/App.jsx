import Header from 'components/header/header';
import RoutesContext from './routes/routes';
import Banner from 'components/UI/banner/banner';
import Footer from 'components/footer/footer';

function App() {
  return (
    <RoutesContext>
      <Header />
      <Banner />
      <Footer />
    </RoutesContext>
  );
}

export default App;
