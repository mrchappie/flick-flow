import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="center justify-evenly w-full min-h-[300px] border-t-white/50 border-t-2">
      <div className="gap-4 center">
        <Link to={'/'}>Feedback</Link>
        <Link to={'/'}>Help</Link>
        <Link to={'/'}>FAQ</Link>
      </div>
      <div className="gap-4 center-col">
        <div>LOGO</div>
        <div>
          <div>
            <span>&copy;{new Date().getFullYear()}&nbsp;</span>All rights
            reserved
          </div>
          <div>Designed by Figma Comunity and build by Alexandru BOSCU</div>
        </div>
      </div>
      <div className="gap-4 center">
        <div>Follow us on</div>
        <ul>
          <li>
            <Link to={'/'}>AAA</Link>
            <Link to={'/'}>AAA</Link>
            <Link to={'/'}>AAA</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
