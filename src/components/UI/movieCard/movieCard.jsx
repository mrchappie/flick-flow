import { Link } from 'react-router-dom';
import { HiBookmark, HiHeart } from 'react-icons/hi';
import ConnectDB from 'utils/services/crud/crud';

export default function MovieCard({ details, customStyle }) {
  const db = new ConnectDB();

  function handleAddToFavorites(movieID) {
    console.log(movieID);
    db.setFirestoreDoc(undefined, movieID);
  }

  function handleAddToWatchlist(movieID) {
    console.log('watchlist');
  }

  return (
    <div className="relative">
      <div className="absolute z-10 w-full h-full opacity-0 hover:bg-black/40 hover:opacity-100">
        <div className="relative z-10 flex justify-between p-2 cursor-pointer">
          <span
            onClick={() => {
              handleAddToFavorites(details.movieID);
            }}
          >
            <HiHeart className="text-[30px] hover:scale-125" />
          </span>
          <span
            onClick={() => {
              handleAddToWatchlist(details.movieID);
            }}
          >
            <HiBookmark className="text-[30px] hover:scale-125" />
          </span>
        </div>
        <Link
          to={`/details?movie_id=${details.movieID}`}
          className="absolute top-0 left-0 z-0 block w-full h-full"
        ></Link>
      </div>
      <div
        className="w-[214px] h-[290px] overflow-hidden relative cursor-pointer bg-black"
        style={customStyle}
      >
        <div className="absolute w-full h-full rotate-180 z-1 bg-custom-bg-fade"></div>
        <div className="absolute z-1 bottom-2 left-4 text-md">
          <h2>
            {details.title} - <span>{details.year}</span>
          </h2>
        </div>
        <img src={details.poster} alt="author" className="z-0" />
      </div>
    </div>
  );
}
