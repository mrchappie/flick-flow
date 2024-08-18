import { Link } from 'react-router-dom';
import { FaFacebook, FaSquareTwitter, FaTiktok } from 'react-icons/fa6';
import { Heading2 } from 'components/UI/heading/heading';

export default function Footer() {
  return (
    <footer className="col-span-full center justify-evenly w-full min-h-[500px] border-t-white/10 border-t-2 flex-wrap">
      <div className="items-start center-col">
        <Heading2 title={'Support'} customStyle={'text-white'} />
        <Link to={'/feedback'} className="px-2 underline hover:text-brand4">
          Feedback
        </Link>
        <Link to={'/help'} className="px-2 underline hover:text-brand4">
          Help
        </Link>
        <Link to={'/faq'} className="px-2 underline hover:text-brand4">
          FAQ
        </Link>
      </div>
      <div className="gap-4 center-col">
        <Heading2 title={'Follow us on'} customStyle={'text-white'} />
        <ul className="items-start center-col">
          <li>
            <Link to={'/'} className="px-2 text-xl center hover:text-brand4">
              <FaFacebook /> Facebook
            </Link>
          </li>
          <li>
            <Link to={'/'} className="px-2 text-xl center hover:text-brand4">
              <FaSquareTwitter /> Twitter
            </Link>
          </li>
          <li>
            <Link to={'/'} className="px-2 text-xl center hover:text-brand4">
              <FaTiktok /> Tiktok
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full gap-4 center-col">
        <div>
          <Link to={'/'}>
            <div className="center">
              <img
                src="/icons/logo.svg"
                alt="Flick Flow logo"
                className="w-12"
              />
              <span className="text-2xl font-bold">Flick Flow</span>
            </div>
          </Link>
        </div>
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
    </footer>
  );
}
