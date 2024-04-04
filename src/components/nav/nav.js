import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul className="flex justify-evenly">
        <li>
          <Link to="/" className="p-4 inline-block">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="p-4 inline-block">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="p-4 inline-block">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/projects" className="p-4 inline-block">
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
