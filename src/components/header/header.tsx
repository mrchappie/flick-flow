import Navigation from '../navigation/navigation';
import Search from '../search/search';

export default function Header() {
  return (
    <header className="center justify-evenly bg-custom-bg-fade">
      <div>Logo</div>
      <Navigation />
      <Search />
      <div>Sign In</div>
    </header>
  );
}
