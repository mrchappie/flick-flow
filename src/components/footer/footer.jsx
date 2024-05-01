import { Link } from 'react-router-dom';
import { FaFacebook, FaSquareTwitter, FaTiktok } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="col-span-full center justify-evenly w-full min-h-[300px] border-t-white/10 border-t-2">
      <div className="divide-x">
        <Link to={'/feedback'} className="px-2 underline">
          Feedback
        </Link>
        <Link to={'/help'} className="px-2 underline">
          Help
        </Link>
        <Link to={'/faq'} className="px-2 underline">
          FAQ
        </Link>
      </div>
      <div className="gap-4 center-col">
        <div>LOGO</div>
        <div>
          <div className="text-center">
            <span>&copy;{new Date().getFullYear()}&nbsp;</span>All rights
            reserved
          </div>
          <div className="text-center">
            Designed by Figma Comunity and build by Alexandru BOSCU
          </div>
        </div>
      </div>
      <div className="gap-4 center">
        <div>Follow us on:</div>
        <ul className="divide-x center">
          <li>
            <Link to={'/'} className="block px-2 text-xl">
              <FaFacebook />
            </Link>
          </li>
          <li>
            <Link to={'/'} className="block px-2 text-xl">
              <FaSquareTwitter />
            </Link>
          </li>
          <li>
            <Link to={'/'} className="block px-2 text-xl">
              <FaTiktok />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
