import React from 'react';
import RoutesContext from './routes/routes';
import Banner from 'components/UI/banner/banner';

function App() {
  return (
    <React.StrictMode>
      <RoutesContext>
        <Banner />
      </RoutesContext>
    </React.StrictMode>
  );
}

export default App;
