import { Link } from 'react-router-dom';
import {
  HiBookmark,
  HiHeart,
  HiOutlineBookmark,
  HiOutlineHeart,
} from 'react-icons/hi';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';
import { extractReleaseYear } from './helpers';
import { tmdbImagesOrigin } from 'utils/utils';

const DB = new ConnectDB();

export default function MovieCard({ details, customStyle, onHandleShowModal }) {
  const user = useStateStore((state) => state.user);
  const isLoggedIn = useStateStore((state) => state.isLoggedIn);

  function handleAddToList(itemDetails, defaultListName = 'favorites') {
    const favListID = user.lists.filter(
      (list) => list.listName === defaultListName
    );
    DB.updateFirestoreDocInArray(['lists', favListID[0].listID], itemDetails);
  }

  const updateShowModal = useStateStore((state) => state.updateShowModal);

  function openListsModal(itemDetails) {
    updateShowModal(true);
    onHandleShowModal(itemDetails);
  }

  return (
    <div className="relative">
      <div className="absolute z-10 w-full h-full opacity-0 hover:bg-black/40 hover:opacity-100">
        {isLoggedIn && (
          <div className="relative z-10 flex justify-between p-2 cursor-pointer">
            <span
              onClick={() => {
                handleAddToList(details);
              }}
            >
              {details.addedByUser === true ? (
                <HiOutlineHeart className="text-[30px] hover:scale-125 text-red-500" />
              ) : (
                <HiHeart className="text-[30px] hover:scale-125 text-red-500" />
              )}
            </span>
            <span
              onClick={() => {
                openListsModal(details);
              }}
            >
              {details.addedByUser === true ? (
                <HiOutlineBookmark className="text-[30px] hover:scale-125 text-yellow-500" />
              ) : (
                <HiBookmark className="text-[30px] hover:scale-125 text-yellow-500" />
              )}
            </span>
          </div>
        )}
        <Link
          to={`/details?movie_id=${details.id}`}
          className="absolute top-0 left-0 z-0 block w-full h-full"
        ></Link>
      </div>
      <div
        className="max-w-[214px] max-h-[290px] min-w-[200px] min-h-[270px] overflow-hidden relative cursor-pointer bg-black"
        style={customStyle}
      >
        <div className="absolute w-full h-full rotate-180 z-1 bg-custom-bg-fade"></div>
        <div className="absolute font-semibold text-md z-1 bottom-2 left-4">
          <h2 className="flex flex-wrap">
            <span>{details.title ? details.title : details.name}</span> -
            <span>{extractReleaseYear(details)}</span>
          </h2>
        </div>
        <img
          src={tmdbImagesOrigin + '/w342' + details.poster_path}
          alt="author"
          className="z-0"
        />
      </div>
    </div>
  );
}
