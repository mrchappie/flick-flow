import { Link } from 'react-router-dom';

export default function MovieCard({ details, customStyle }) {
  return (
    <Link to={`/details?movie_id=${details.movieID}`}>
      <div
        className="w-[214px] h-[290px] overflow-hidden relative cursor-pointer hover:opacity-50 bg-black"
        style={customStyle}
      >
        <div className="absolute z-10 w-full h-full rotate-180 bg-custom-bg-fade"></div>
        <div className="absolute z-10 bottom-2 left-4 text-md">
          <h2>
            {details.title} - <span>{details.year}</span>
          </h2>
        </div>
        <img src={details.poster} alt="author" className="z-0" />
      </div>
    </Link>
  );
}
