import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="center justify-evenly w-full min-h-[300px] border-t-white/50 border-t-2">
      <div className="center gap-4">
        <Link href={'/'}>Feedback</Link>
        <Link href={'/'}>Help</Link>
        <Link href={'/'}>FAQ</Link>
      </div>
      <div className="center-col gap-4">
        <div>LOGO</div>
        <div>
          <div>
            <span>&copy;{new Date().getFullYear()}&nbsp;</span>All rights
            reserved
          </div>
          <div>Designed by Figma Comunity and build by Alexandru BOSCU</div>
        </div>
      </div>
      <div className="center gap-4">
        <div>Follow us on</div>
        <ul>
          <li>
            <Link href={'/'}>AAA</Link>
            <Link href={'/'}>AAA</Link>
            <Link href={'/'}>AAA</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
