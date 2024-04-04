import logo from './logo.svg';
import './App.css';
import Navigation from './components/nav/nav';
import RoutesContext from './routes/routes';

function App() {
  return (
    <RoutesContext>
      <div className="App">
        <Navigation />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="text-green-400 font-bold">
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </RoutesContext>
  );
}

export default App;
