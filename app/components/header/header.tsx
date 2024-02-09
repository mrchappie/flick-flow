import Navigation from '../navigation/navigation';

export default function Header() {
  return (
    <header className="center justify-evenly bg-custom-bg-fade">
      <div>Logo</div>
      <Navigation />
      <div>Sign In</div>
    </header>
  );
}
