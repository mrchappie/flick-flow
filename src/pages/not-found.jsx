import P from 'components/UI/typography/p/P';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="col-span-full center-col max-w-[1200px] m-auto">
      <P customStyle={'text-white text-2xl center-col'}>
        <span>
          It looks like the page you're searching for didn’t make the final cut.
          Maybe it’s lost in the editing room or trapped in a plot twist. Don’t
          worry—every great movie has its surprises.&nbsp;
        </span>
        <span>
          Why not head back to the&nbsp;
          <Link
            to={'/home'}
            className="font-extrabold underline hover:text-brand4"
          >
            homepage
          </Link>
          &nbsp;and enjoy the rest of the show? The adventure's just getting
          started!
        </span>
      </P>
      <h1 className="text-white text-[90px] font-extrabold">
        <Link to={'/home'} className="font-extrabold hover:text-brand4">
          404: Scene Not Found 🎬
        </Link>
      </h1>
    </div>
  );
}
